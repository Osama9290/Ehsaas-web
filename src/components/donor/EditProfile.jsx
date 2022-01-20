import React, { useState, useEffect } from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import { db, auth } from "../../firebase";
import { Link } from "react-router-dom";
import img1 from "../images/edit.svg";

const EditProfile = () => {
  const [name1, setName1] = useState("");
  const [email1, setEmail1] = useState("");
  const [contactNo1, setContactNo1] = useState("");

  useEffect(() => {
    async function getUser() {
      const userRef = db.collection("donor").doc(auth.currentUser.uid);
      const doc = await userRef.get();
      if (!doc.exists) {
        alert("No such document!");
      } else {
        setName1(doc.data().name);
        setEmail1(doc.data().email);
        setContactNo1(doc.data().contactNo);
      }
    }
    getUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    db.collection("donor")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.update({
            name: name1,
            email: email1,
            contactNo: contactNo1,
          });
        });
      });
    try {
      const usercred = await auth.currentUser.updateEmail(email1);
      alert("Profile updated successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteDonor = async () => {
    const userRef = db.doc(`donor/${auth.currentUser.uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
    } else {
      db.collection("donor")
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            doc.ref.update({
              status: "inactive",
            });
          });
        });
      try {
        const userDel = await auth.currentUser.delete();
        alert("Account deleted successfully!");
      } catch (err) {
        alert("Error in deleting account");
      }
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <p
          style={{
            textAlign: "right",
            margin: "10px",
            marginRight: "55px",
            textDecoration: "underline",
          }}
        >
          Donor
        </p>
        <h2
          style={{
            textAlign: "center",
            paddingTop: "40px",
            marginTop: "-40px",
          }}
        >
          Edit Profile
        </h2>
      </Grid>
      <Grid item xs={7.2}>
        <img
          src={img1}
          alt=" "
          width="750"
          height="520"
          flex={1}
          flexDirection="column"
        />
      </Grid>

      <Grid item xs={4.5}>
        <form style={{ paddingTop: "10px" }} onSubmit={(e) => handleSubmit(e)}>
          <TextField
            style={{ backgroundColor: "#E5E5E5", marginBottom: "10px" }}
            label="Name"
            fullWidth
            value={name1}
            required="true"
            onChange={(e) => {
              setName1(e.target.value);
            }}
          />
          <TextField
            style={{ backgroundColor: "#E5E5E5", marginBottom: "10px" }}
            label="Email"
            fullWidth
            value={email1}
            required="true"
            onChange={(e) => {
              setEmail1(e.target.value);
            }}
          />
          <TextField
            style={{ backgroundColor: "#E5E5E5", marginBottom: "10px" }}
            label="Contact No."
            fullWidth
            value={contactNo1}
            required="true"
            inputProps={{ minLength: 11, maxLength: 11 }}
            onChange={(e) => {
              const re = /^[0-9\b]+$/;
              if (e.target.value === "" || re.test(e.target.value)) {
                setContactNo1(e.target.value);
              }
            }}
          />
          <Grid item xs={9}>
            <Button
              type="submit"
              style={{
                backgroundColor: "#2BB8C1",
                color: "black",
                borderRadius: "0.7rem",
                marginTop: "8px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Update
            </Button>
            <Link to="/donor-sign-up" style={{ textDecoration: "none" }}>
              <Button
                onClick={deleteDonor}
                style={{
                  backgroundColor: "red",
                  color: "black",
                  borderRadius: "0.7rem",
                  marginTop: "8px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Delete Account
              </Button>
            </Link>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default EditProfile;
