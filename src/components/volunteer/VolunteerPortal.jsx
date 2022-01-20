import React from "react";
import { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { auth, db } from "../../firebase";
import firebase from "firebase";
import volunteer from "../images/volunteer.svg";

const VolunteerPortal = () => {
  const [count, setCount] = useState("");

  useEffect(async () => {
    db.collection("volunteer")
      .where(
        firebase.firestore.FieldPath.documentId(),
        "==",
        auth.currentUser.uid
      )
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          var deliveryCount = element.data().deliveryCount;
          setCount(deliveryCount);
        });
      });
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={7.5}>
        <img
          src={volunteer}
          alt=" "
          width="720"
          height="500"
          flex={1}
          flexDirection="column"
          style={{ paddingTop: "50px", paddingLeft: "50px" }}
        />
      </Grid>

      <Grid item xs={4}>
        <h2
          className="container"
          style={{ textAlign: "center", paddingTop: "50px" }}
        >
          Volunteer Portal
        </h2>

        <p id="count" style={{ paddingTop: "20px", marginLeft: "130px" }}>
          Delivery Count:
        </p>
        <div
          style={{
            padding: "20px",
            marginTop: "30px",
            borderStyle: "solid",
            borderWidth: "20px",
            borderColor: "#2BB8C1",
            borderRadius: "50rem",
            marginLeft: "115px",
            height: "160px",
            width: "160px",
          }}
        >
          <h1
            style={{
              fontSize: "60px",
              paddingLeft: "21px",
              paddingTop: "5px",
            }}
          >
            {count}
          </h1>
        </div>

        <Link to="/deliver-donations" style={{ textDecoration: "none" }}>
          <Button
            type="submit"
            style={{
              backgroundColor: "#2BB8C1",
              color: "black",
              borderRadius: "0.7rem",
              textTransform: "capitalize",
              marginTop: "40px",
              fontSize: "medium",
              marginLeft: "120px",
            }}
          >
            Deliver Donations
          </Button>
        </Link>

        <Grid item xs={10}>
          <Link to="/edit-volunteer-profile" style={{ textDecoration: "none" }}>
            <Button
              type="submit"
              style={{
                backgroundColor: "#2BB8C1",
                color: "black",
                borderRadius: "0.7rem",
                textTransform: "capitalize",
                marginTop: "30px",
                fontSize: "medium",
                marginLeft: "146px",
              }}
            >
              Edit Profile
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default VolunteerPortal;
