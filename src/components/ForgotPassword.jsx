import React from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import { auth } from "../firebase";
import img1 from "./images/hero1.PNG";

const ForgotPassword = (props) => {
  const [email, setEmail] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (email) {
        auth.sendPasswordResetEmail(email).then(() => {
          alert(
            "An email has been sent to you. Please verify it to reset your password."
          );
        });
      } else {
        alert("Please enter email");
      }
    } catch (err) {
      alert("Error performing request");
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <h2
          className="container"
          style={{ textAlign: "center", paddingTop: "40px" }}
        >
          Forgot Password
        </h2>
      </Grid>

      <Grid item xs={7.3}>
        <img
          style={{ paddingLeft: "30px" }}
          src={img1}
          alt=" "
          width="750"
          height="600"
          flex={1}
          flexDirection="column"
        />
      </Grid>

      <Grid item xs={4.3}>
        <p>
          Please enter your email address below and we will send you information
          to recover your account.
        </p>
        <form onSubmit={(e) => handleSubmit(e)}>
          <TextField
            style={{ backgroundColor: "#E5E5E5", marginBottom: "10px" }}
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
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
              RESET PASSWORD
            </Button>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;
