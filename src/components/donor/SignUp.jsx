import React, { useState } from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import { auth, createDonorDocument } from "../../firebase";
import { useHistory } from "react-router-dom";
import $ from "jquery";
import img1 from "../images/hero1.PNG";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [password, setPassword] = useState("");
  const [cnic, setCnic] = useState("");

  const [status] = useState("");
  const [createdAt] = useState("");

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { user } = await auth
        .createUserWithEmailAndPassword(email, password)
        .catch((error) => {
          alert(error.message);
        });
      auth.signOut();
      await createDonorDocument(user, {
        name,
        contactNo,
        status,
        cnic,
        createdAt,
      });
      alert("Signed up successfully!");
      history.push("/login");
    } catch (err) {
      console.log(err);
    }
  };

  $(function () {
    $("[id*=number]").on("keypress", function () {
      var number = $(this).val();
      if (number.length == 4) {
        $(this).val($(this).val() + "-");
      }
    });

    $("[id*=cnic]").on("keypress", function () {
      var number = $(this).val();
      if (number.length == 5) {
        $(this).val($(this).val() + "-");
      } else if (number.length == 13) {
        $(this).val($(this).val() + "-");
      }
    });
  });

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <h2
          className="container"
          style={{ textAlign: "center", paddingTop: "40px" }}
        >
          Sign Up
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

      <Grid item xs={4.5}>
        <form style={{ paddingTop: "5px" }} onSubmit={(e) => handleSubmit(e)}>
          <TextField
            style={{ backgroundColor: "#E5E5E5", marginBottom: "10px" }}
            label="Name"
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
            label="Email"
            fullWidth
            value={email}
            required="true"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            style={{ backgroundColor: "#E5E5E5", marginBottom: "10px" }}
            label="Contact No."
            fullWidth
            id="number"
            inputProps={{ minLength: 12, maxLength: 12 }}
            value={contactNo}
            required="true"
            onChange={(e) => {
              const re = /^[0-9\b-]+$/;
              if (e.target.value === "" || re.test(e.target.value)) {
                setContactNo(e.target.value);
              }
            }}
          />
          <TextField
            style={{ backgroundColor: "#E5E5E5", marginBottom: "10px" }}
            label="CNIC"
            fullWidth
            id="cnic"
            inputProps={{ minLength: 15, maxLength: 15 }}
            value={cnic}
            required="true"
            onChange={(e) => {
              const re = /^[0-9\b-]+$/;
              if (e.target.value === "" || re.test(e.target.value)) {
                setCnic(e.target.value);
              }
            }}
          />
          <TextField
            style={{ backgroundColor: "#E5E5E5", marginBottom: "10px" }}
            label="Password"
            type="password"
            fullWidth
            value={password}
            required="true"
            onChange={(e) => {
              setPassword(e.target.value);
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
              SIGN UP
            </Button>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default SignUp;
