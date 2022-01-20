import React, { useState } from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import { db } from "../firebase";
import firebase from "firebase";
import map from "./images/map.png";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    var dt = firebase.firestore.Timestamp.now().toDate().toString();

    if (name && email && message) {
      db.collection("contactMessages")
        .add({
          name: name,
          email: email,
          subject: subject,
          message: message,
          date: dt,
        })
        .then(() => {
          alert("Message sent successfully!");
        })
        .catch((error) => {
          alert("Error in sending message");
        });

      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } else {
      alert("Please complete all fields");
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <h2 style={{ textAlign: "center", paddingTop: "40px" }}>Contact Us</h2>
      </Grid>
      <Grid item xs={7.3}>
        <img
          src={map}
          alt=" "
          width="750"
          height="600"
          flex={1}
          flexDirection="column"
        />
      </Grid>

      <Grid item xs={4.5}>
        <p
          style={{
            display: "flex",
            alignItems: "center",
            justify: "center",
            paddingTop: "20px",
          }}
        >
          How Can We Help?
        </p>
        <p style={{ fontSize: "small" }}>
          We are here to answer any question you might have. Fill in the form
          below and we will get back to you as soon as possible.
        </p>
        <form onSubmit={(e) => handleSubmit(e)}>
          <TextField
            style={{ backgroundColor: "#E5E5E5", marginBottom: "10px" }}
            label="Your name"
            fullWidth
            value={name}
            required="true"
            inputProps={{ minLength: 3, maxLength: 20 }}
            onChange={(e) => {
              var letters = /^[a-zA-Z\s]*$/;
              if (e.target.value === "" || letters.test(e.target.value)) {
                setName(e.target.value);
              }
            }}
          />
          <TextField
            style={{ backgroundColor: "#E5E5E5", marginBottom: "10px" }}
            label="Your email"
            fullWidth
            value={email}
            required="true"
            onChange={(e) => {
              var reg = /^[A-Za-z0-9\s/.@]*$/;
              if (e.target.value === "" || reg.test(e.target.value)) {
                setEmail(e.target.value);
              }
            }}
          />
          <TextField
            style={{ backgroundColor: "#E5E5E5", marginBottom: "10px" }}
            label="Subject"
            type="text"
            fullWidth
            value={subject}
            inputProps={{ maxLength: 30 }}
            onChange={(e) => {
              var letters = /^[a-zA-Z\s]*$/;
              if (e.target.value === "" || letters.test(e.target.value)) {
                setSubject(e.target.value);
              }
            }}
          />
          <TextField
            style={{ backgroundColor: "#E5E5E5", marginBottom: "10px" }}
            multiline={true}
            rows={6}
            label="Your message"
            type="text"
            fullWidth
            value={message}
            required="true"
            inputProps={{ minLength: 3, maxLength: 50 }}
            onChange={(e) => {
              var letters = /^[a-zA-Z\s.?]*$/;
              if (e.target.value === "" || letters.test(e.target.value)) {
                setMessage(e.target.value);
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
              }}
            >
              SUBMIT
            </Button>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default ContactUs;
