import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth } from "./firebase";
import axios from "axios";

import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";

import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import VolunteerForm from "./components/VolunteerForm";

import DonorSignUp from "./components/donor/SignUp";
import ReceiverSignUp from "./components/receiver/SignUp";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";

import DonorDonationCategory from "./components/donor/DonorDonationCategory";
import AddFood from "./components/donor/AddFood";
import AddUsedItem from "./components/donor/AddUsedItem";
import AddBlood from "./components/donor/AddBlood";
import MyDonations from "./components/donor/MyDonations";
import EditDonorProfile from "./components/donor/EditProfile";
import ReceiverRequests from "./components/donor/ReceiverRequests";
import ReceiversInterested from "./components/donor/ReceiversInterested";

import ReceiverDonationCategory from "./components/receiver/ReceiverDonationCategory";
import ReceiveFood from "./components/receiver/ReceiveFood";
import ReceiveUsedItem from "./components/receiver/ReceiveUsedItem";
import ReceiveBlood from "./components/receiver/ReceiveBlood";
import EditReceiverProfile from "./components/receiver/EditProfile";

import RequestDonation from "./components/request/RequestDonation";
import RequestFood from "./components/request/RequestFood";
import RequestUsedItem from "./components/request/RequestUsedItem";
import RequestBlood from "./components/request/RequestBlood";

import VolunteerPortal from "./components/volunteer/VolunteerPortal";
import DeliverDonations from "./components/volunteer/DeliverDonations";
import EditVolunteerProfile from "./components/volunteer/EditProfile";
import InProcessDeliveries from "./components/volunteer/InProcessDeliveries";
import CompletedDeliveries from "./components/volunteer/CompletedDeliveries";

import AdminPortal from "./components/admin/AdminPortal";
import ListedDonations from "./components/admin/ListedDonations";
import CurrentVolunteers from "./components/admin/CurrentVolunteers";
import UserMessages from "./components/admin/UserMessages";
import ReceivedDonations from "./components/admin/ReceivedDonations";
import ViewRequests from "./components/admin/ViewRequests";
import Progress from "./components/admin/Progress";

import Error404 from "./components/Error404";

import Chat from "./components/Chat";
import { AuthProvider } from "./contexts/AuthContext";

import { db } from "./firebase";

const App = () => {
  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState(false);
  const [foodInfo, setFoodInfo] = useState([]);
  const [itemInfo, setItemInfo] = useState([]);
  const [bloodInfo, setBloodInfo] = useState([]);
  const link2 = "http://localhost:3000/my-donations";
  var donation = [];
  var itemDonation = [];
  var bloodDonation = [];
  var donorName;
  var donorEmail;

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    var date = new Date();
    db.collection("food")
      .where("expiry", "<=", date)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.update({
            status: "inactive",
          });
        });
      });
    db.collection("usedItems")
      .where("expiry", "<=", date)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.update({
            status: "inactive",
          });
        });
      });
    db.collection("blood")
      .where("expiry", "<=", date)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.update({
            status: "inactive",
          });
        });
      });
  }, []);

  useEffect(async () => {
    async function sendEmail() {
      var todate = new Date();
      db.collection("food")
        .where("expiry", "<=", todate)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((element) => {
            var foodData = element.data();
            var foodName = element.data().name;

            //console.log("donation info",foodName);
            db.collection("donor")
              .where(
                firebase.firestore.FieldPath.documentId(),
                "==",
                element.data().donorId
              )
              .get()
              .then((querySnapshot1) => {
                querySnapshot1.forEach((element1) => {
                  var donorData = element1.data();
                  var donor1 = element1.data().name;
                  //console.log("donor name",donor1);
                  setFoodInfo((arr) => [...arr, { foodData, donorData }]);
                  donation = foodData.name;
                  donorName = donorData.name;
                  donorEmail = donorData.email;
                  console.log("donation Name", donation);
                  console.log("donor NAME", donorName);
                });
                console.log("donation Name below", donation);
                console.log("donor NAME below", donorName);
                axios
                  .post("http://localhost:2000/expiry-email/", {
                    link2,
                    donation,
                    donorName,
                    donorEmail,
                  })
                  .then((response) => setMsg(response.data.respMesg));
              });
          });
        });

      db.collection("usedItems")
        .where("expiry", "<=", todate)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((element) => {
            // donation=element.data().name;
            var itemData = element.data();
            //setDonationName((arr) => [...arr, donation]);
            console.log("donation info", donation);
            db.collection("donor")
              .where(
                firebase.firestore.FieldPath.documentId(),
                "==",
                element.data().donorId
              )
              .get()
              .then((querySnapshot1) => {
                querySnapshot1.forEach((element1) => {
                  var donorData = element1.data();

                  setItemInfo((arr) => [...arr, { itemData, donorData }]);
                  itemDonation = itemData.name;
                  donorName = donorData.name;
                  donorEmail = donorData.email;
                });
                console.log("gh", donorName);
                axios
                  .post("http://localhost:2000/used-expiry/", {
                    link2,
                    itemDonation,
                    donorName,
                    donorEmail,
                  })
                  .then((response) => setMsg(response.data.respMesg));
              });
          });
        });

      db.collection("blood")
        .where("expiry", "<=", todate)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((element) => {
            // donation=element.data().name;
            var bloodData = element.data();
            //setDonationName((arr) => [...arr, donation]);
            console.log("donation info", donation);
            db.collection("donor")
              .where(
                firebase.firestore.FieldPath.documentId(),
                "==",
                element.data().donorId
              )
              .get()
              .then((querySnapshot1) => {
                querySnapshot1.forEach((element1) => {
                  var donorData = element1.data();
                  setBloodInfo((arr) => [...arr, { bloodData, donorData }]);
                  bloodDonation = bloodData.name;
                  donorName = donorData.name;
                  donorEmail = donorData.email;
                });
                console.log("gh", donorName);
                axios
                  .post("http://localhost:2000/blood-expiry", {
                    link2,
                    bloodDonation,
                    donorName,
                    donorEmail,
                  })
                  .then((response) => setMsg(response.data.respMesg));
              });
          });
        });
    }
    sendEmail();
  }, []);

  return (
    <Router>
      <AuthProvider>
        <Navbar user={user} />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/about-us" exact component={AboutUs} />
          <Route path="/contact-us" exact component={ContactUs} />

          <Route path="/volunteer-form" exact component={VolunteerForm} />
          <Route path="/login" component={Login} />
          <Route path="/donor-sign-up" component={DonorSignUp} />
          <Route path="/receiver-sign-up" component={ReceiverSignUp} />
          <Route path="/forgot-password" component={ForgotPassword} />

          <Route
            path="/donor-donation-category"
            component={DonorDonationCategory}
          />
          <Route path="/add-food" component={AddFood} />
          <Route path="/add-used-item" component={AddUsedItem} />
          <Route path="/add-blood" component={AddBlood} />
          <Route path="/my-donations" component={MyDonations} />
          <Route path="/edit-donor-profile" component={EditDonorProfile} />
          <Route path="/receiver-requests" component={ReceiverRequests} />
          <Route path="/receivers-interested" component={ReceiversInterested} />

          <Route
            path="/receiver-donation-category"
            component={ReceiverDonationCategory}
          />
          <Route path="/receive-food" component={ReceiveFood} />
          <Route path="/receive-used-item" component={ReceiveUsedItem} />
          <Route path="/receive-blood" component={ReceiveBlood} />
          <Route
            path="/edit-receiver-profile"
            component={EditReceiverProfile}
          />

          <Route path="/request-donation" component={RequestDonation} />
          <Route path="/request-food" component={RequestFood} />
          <Route path="/request-used-item" component={RequestUsedItem} />
          <Route path="/request-blood" component={RequestBlood} />

          <Route path="/volunteer-portal" component={VolunteerPortal} />
          <Route path="/deliver-donations" component={DeliverDonations} />
          <Route
            path="/edit-volunteer-profile"
            component={EditVolunteerProfile}
          />
          <Route
            path="/in-process-deliveries"
            component={InProcessDeliveries}
          />
          <Route path="/completed-deliveries" component={CompletedDeliveries} />

          <Route path="/admin-portal" component={AdminPortal} />
          <Route path="/listed-donations" component={ListedDonations} />
          <Route path="/current-volunteers" component={CurrentVolunteers} />
          <Route path="/user-messages" component={UserMessages} />
          <Route path="/received-donations" component={ReceivedDonations} />
          <Route path="/view-requests" component={ViewRequests} />
          <Route path="/progress" component={Progress} />

          <Route path="/chat" component={Chat} />

          <Route path="/error" component={Error404} />
          <Route path="/not-found" component={Error404} />
        </Switch>
      </AuthProvider>
      <Footer />
    </Router>
  );
};

export default App;
