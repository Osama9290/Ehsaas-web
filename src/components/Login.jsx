import React, { useState } from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { useHistory } from "react-router-dom";
import img1 from "./images/hero1.PNG";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      var userr = await auth
        .signInWithEmailAndPassword(email, password)
        .then(async () => {
          const donorRef = db.doc(`donor/${auth.currentUser.uid}`);
          const donorSnapshot = await donorRef.get();
          if (donorSnapshot.exists) {
            if (donorSnapshot.data().status == "inactive") {
              auth.signOut();
              alert("Sorry, this user is inactive");
            } else {
              alert("Logged in successfully!");
              history.push("/donor-donation-category");
            }
          }
          const receiverRef = db.doc(`receiver/${auth.currentUser.uid}`);
          const receiverSnapshot = await receiverRef.get();
          if (receiverSnapshot.exists) {
            if (receiverSnapshot.data().status == "inactive") {
              auth.signOut();
              alert("Sorry, this user is inactive");
            } else {
              alert("Logged in successfully!");
              history.push("/receiver-donation-category");
            }
          }
          const volunteerRef = db.doc(`volunteer/${auth.currentUser.uid}`);
          const volunteerSnapshot = await volunteerRef.get();
          if (volunteerSnapshot.exists) {
            if (volunteerSnapshot.data().status == "inactive") {
              auth.signOut();
              alert("Sorry, this user is inactive");
            } else {
              alert("Logged in successfully!");
              history.push("/volunteer-portal");
            }
          }
        })
        .catch((error) => {
          alert(error.message);
        });
      if (auth.currentUser.email === "ehsaas.adm@gmail.com") {
        alert("Logged in successfully!");
        history.push("/admin-portal");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <h2
          className="container"
          style={{ textAlign: "center", paddingTop: "40px" }}
        >
          Login
        </h2>
      </Grid>

      <Grid item xs={7.3}>
        <img
          style={{ paddingLeft: "30px" }}
          src={img1}
          alt=" "
          width="750"
          height="550"
          flex={1}
          flexDirection="column"
        />
      </Grid>

      <Grid item xs={4.3}>
        <form style={{ paddingTop: "5px" }} onSubmit={(e) => handleSubmit(e)}>
          <TextField
            style={{ backgroundColor: "#E5E5E5", marginBottom: "10px" }}
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <TextField
            style={{ backgroundColor: "#E5E5E5", marginBottom: "10px" }}
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <Link to="/forgot-password" style={{ textDecoration: "none" }}>
            <Button style={{ color: "black" }}>Forgot Password?</Button>
          </Link>
          <Grid item xs={9}>
            <Button
              type="submit"
              style={{
                backgroundColor: "#2BB8C1",
                color: "black",
                borderRadius: "0.7rem",
              }}
            >
              LOGIN
            </Button>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default Login;
