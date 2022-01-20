import React, { useState } from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import { auth, createVolunteerDocument } from "../firebase";
import { useHistory } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import $ from "jquery";
import img1 from "./images/hero1.PNG";

const VolunteerForm = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [age, setAge] = useState("");
  const [occupation, setOccupation] = useState("");
  const [institution, setInstitution] = useState("");

  const [status] = useState("");
  const [deliveryCount] = useState("");
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
      await createVolunteerDocument(user, {
        name,
        contactNo,
        province,
        city,
        age,
        occupation,
        institution,
        status,
        deliveryCount,
        createdAt,
      });
      alert("Registered successfully!");
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
  });

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <h2 style={{ textAlign: "center", paddingTop: "40px" }}>
          Volunteer Registration
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

      <Grid item xs={4.5}>
        <form onSubmit={(e) => handleSubmit(e)}>
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
            label="Password"
            type="password"
            fullWidth
            value={password}
            required="true"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <TextField
            style={{ backgroundColor: "#E5E5E5", marginBottom: "10px" }}
            label="City"
            type="text"
            fullWidth
            value={city}
            required="true"
            inputProps={{ minLength: 3, maxLength: 15 }}
            onChange={(e) => {
              var letters = /^[A-Za-z]+$/;
              if (e.target.value === "" || letters.test(e.target.value)) {
                setCity(e.target.value);
              }
            }}
          />
          <FormControl
            style={{
              backgroundColor: "#E5E5E5",
              marginBottom: "10px",
              minWidth: "460px",
            }}
          >
            <InputLabel htmlFor="province-simple" fullWidth>
              Province
            </InputLabel>
            <Select
              value={province}
              required="true"
              onChange={(e) => {
                setProvince(e.target.value);
              }}
              name="province"
            >
              <MenuItem value="">
                <em>Choose</em>
              </MenuItem>
              <MenuItem value="Punjab">Punjab</MenuItem>
              <MenuItem value="Balochistan">Balochistan</MenuItem>
              <MenuItem value="Sindh">Sindh</MenuItem>
              <MenuItem value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</MenuItem>
              <MenuItem value="Azad Kashmir">Azad Kashmir</MenuItem>
            </Select>
          </FormControl>
          <TextField
            style={{ backgroundColor: "#E5E5E5", marginBottom: "10px" }}
            label="Age"
            type="text"
            fullWidth
            value={age}
            required="true"
            inputProps={{ minLength: 2, maxLength: 2 }}
            onChange={(e) => {
              const re = /\b([1-9]|[1][5-9]|[23][0-9]|[45][0-9]|6[0-9])\b/;
              if (e.target.value === "" || re.test(e.target.value)) {
                setAge(e.target.value);
              }
            }}
          />
          <TextField
            style={{ backgroundColor: "#E5E5E5", marginBottom: "10px" }}
            label="Occupation"
            type="text"
            fullWidth
            value={occupation}
            required="true"
            inputProps={{ minLength: 3, maxLength: 20 }}
            onChange={(e) => {
              var letters = /^[a-zA-Z\s]*$/;
              if (e.target.value === "" || letters.test(e.target.value)) {
                setOccupation(e.target.value);
              }
            }}
          />
          <TextField
            style={{ backgroundColor: "#E5E5E5", marginBottom: "10px" }}
            label="Institution"
            type="text"
            fullWidth
            value={institution}
            required="true"
            inputProps={{ minLength: 3, maxLength: 20 }}
            onChange={(e) => {
              var letters = /^[a-zA-Z\s]*$/;
              if (e.target.value === "" || letters.test(e.target.value)) {
                setInstitution(e.target.value);
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
              REGISTER
            </Button>
          </Grid>
        </form>
        Already a volunteer?
        <Link to="/login" style={{ textDecoration: "none" }}>
          <Button
            style={{ color: "#2BB8C1", fontWeight: "bold", fontSize: "medium" }}
          >
            LOGIN
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
};

export default VolunteerForm;
