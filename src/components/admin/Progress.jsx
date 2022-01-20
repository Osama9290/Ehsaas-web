import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { db } from "../../firebase";
import { useState, useEffect } from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import firebase from "firebase";
import { Pie } from "react-chartjs-2";

const Progress = () => {
  const [foodCount, setFoodCount] = useState("");
  const [itemCount, setItemCount] = useState("");
  const [bloodCount, setBloodCount] = useState("");

  const [donorCount, setDonorCount] = useState("");
  const [receiverCount, setReceiverCount] = useState("");
  const [volunteerCount, setVolunteerCount] = useState("");

  const [foodDeliveryCount, setFoodDeliveryCount] = useState("");
  const [itemDeliveryCount, setItemDeliveryCount] = useState("");

  useEffect(async () => {
    db.collection("receivedDonations")
      .where("donationCategory", "==", "food")
      .onSnapshot((querySnapshot) => {
        setFoodCount(querySnapshot.size);
      });
    db.collection("receivedDonations")
      .where("donationCategory", "==", "used items")
      .onSnapshot((querySnapshot) => {
        console.log(querySnapshot.size);
        setItemCount(querySnapshot.size);
      });
    db.collection("receivedDonations")
      .where("donationCategory", "==", "blood")
      .onSnapshot((querySnapshot) => {
        setBloodCount(querySnapshot.size);
      });

    db.collection("donor").onSnapshot((querySnapshot) => {
      setDonorCount(querySnapshot.size);
    });
    db.collection("receiver").onSnapshot((querySnapshot) => {
      setReceiverCount(querySnapshot.size);
    });
    db.collection("volunteer").onSnapshot((querySnapshot) => {
      setVolunteerCount(querySnapshot.size);
    });

    db.collection("delivery")
      .where("donationCategory", "==", "food")
      .where("status", "==", "completed")
      .onSnapshot((querySnapshot) => {
        setFoodDeliveryCount(querySnapshot.size);
      });
    db.collection("delivery")
      .where("donationCategory", "==", "used items")
      .where("status", "==", "completed")
      .onSnapshot((querySnapshot) => {
        setItemDeliveryCount(querySnapshot.size);
      });
  }, []);

  const receivedDonationsBar = {
    labels: ["Food", "Used Items", "Blood"],
    datasets: [
      {
        label: "Received Donations",
        backgroundColor: "#2BB8C1",
        borderColor: "#1C848B",
        borderWidth: 2,
        data: [foodCount, itemCount, bloodCount],
      },
    ],
  };

  const deliveriesBar = {
    labels: ["Food", "Used Items"],
    datasets: [
      {
        label: "Deliveries Made",
        backgroundColor: "#2BB8C1",
        borderColor: "#1C848B",
        borderWidth: 2,
        data: [foodDeliveryCount, itemDeliveryCount],
      },
    ],
  };

  const pieChart = {
    labels: ["Donors", "Receivers", "Volunteers"],
    datasets: [
      {
        label: "Users",
        backgroundColor: ["#2BB8C1", "#BB8FCE", "#58D68D"],
        hoverBackgroundColor: ["#1C848B", "#6C3483", "#1D8348"],
        data: [donorCount, receiverCount, volunteerCount],
      },
    ],
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <p
          style={{
            textAlign: "right",
            margin: "10px",
            marginRight: "50px",
            textDecoration: "underline",
          }}
        >
          Admin
        </p>
        <h2
          className="container"
          style={{
            textAlign: "center",
            paddingTop: "40px",
            marginTop: "-40px",
          }}
        >
          Progress Report
        </h2>
      </Grid>

      <div class="container" style={{ paddingTop: "40px" }}>
        <div class="row">
          <div class="col-4">
            <Bar
              data={receivedDonationsBar}
              options={{
                scale: {
                  ticks: {
                    precision: 0,
                  },
                },
                title: {
                  display: true,
                  text: "Total number of each donation type",
                  fontSize: 20,
                },
                legend: {
                  display: true,
                  position: "bottom",
                },
              }}
            />
          </div>
          <div class="col-4">
            <Pie
              data={pieChart}
              options={{
                title: {
                  display: true,
                  text: "Number of different users",
                  fontSize: 20,
                },
                legend: {
                  display: true,
                  position: "right",
                },
              }}
            />
          </div>
          <div class="col-4">
            <Bar
              data={deliveriesBar}
              options={{
                scale: {
                  ticks: {
                    precision: 0,
                  },
                },
                title: {
                  display: true,
                  text: "Total number of deliveries",
                  fontSize: 20,
                },
                legend: {
                  display: true,
                  position: "bottom",
                },
              }}
            />
          </div>
        </div>
      </div>
    </Grid>
  );
};

export default Progress;
