import React, { useState, useEffect } from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import { db, auth } from "../../firebase";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { Link } from "react-router-dom";
import img1 from "../images/edit.svg";

const EditProfile = () => {
  const [name1, setName1] = useState("");
  const [email1, setEmail1] = useState("");
  const [contactNo1, setContactNo1] = useState("");
  const [city1, setCity1] = useState("");
  const [province1, setProvince1] = useState("");
  const [age1, setAge1] = useState("");
  const [occupation1, setOccupation1] = useState("");
  const [institution1, setInstitution1] = useState("");

  useEffect(() => {
    async function getUser() {
      const userRef = db.collection("volunteer").doc(auth.currentUser.uid);
      const doc = await userRef.get();
      if (!doc.exists) {
        console.log("No such document!");
      } else {
        setName1(doc.data().name);
        setEmail1(doc.data().email);
        setContactNo1(doc.data().contactNo);
        setCity1(doc.data().city);
        setProvince1(doc.data().province);
        setAge1(doc.data().age);
        setOccupation1(doc.data().occupation);
        setInstitution1(doc.data().institution);
      }
    }
    getUser();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    db.collection("volunteer")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.update({
            name: name1,
            email: email1,
            age: age1,
            contactNo: contactNo1,
            occupation: occupation1,
            institution: institution1,
            province: province1,
            city: city1,
          });
        });
      });
    try {
      const usercred = await auth.currentUser.updateEmail(email1);
      alert("Profile updated successfully!");
    } catch (err) {
      alert("Error in updating profile");
    }
  };
  const deleteVolunteer = async () => {
    const userRef = db.doc(`volunteer/${auth.currentUser.uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
    } else {
      db.collection("volunteer")
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
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <p
            style={{
              textAlign: "right",
              margin: "10px",
              marginRight: "42px",
              textDecoration: "underline",
            }}
          >
            Volunteer
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
          <form
            style={{ paddingTop: "10px" }}
            onSubmit={(e) => handleSubmit(e)}
          >
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
            <TextField
              style={{ backgroundColor: "#E5E5E5", marginBottom: "10px" }}
              label="City"
              type="text"
              fullWidth
              value={city1}
              required="true"
              inputProps={{ minLength: 3, maxLength: 15 }}
              onChange={(e) => {
                var letters = /^[A-Za-z]+$/;
                if (e.target.value === "" || letters.test(e.target.value)) {
                  setCity1(e.target.value);
                }
              }}
            />
            <TextField
              style={{ backgroundColor: "#E5E5E5", marginBottom: "10px" }}
              label="Age"
              type="text"
              fullWidth
              value={age1}
              required="true"
              inputProps={{ minLength: 2, maxLength: 2 }}
              onChange={(e) => {
                const re = /\b([1-9]|[1][5-9]|[23][0-9]|[45][0-9]|6[0-9])\b/;
                if (e.target.value === "" || re.test(e.target.value)) {
                  setAge1(e.target.value);
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
                value={province1}
                required="true"
                onChange={(e) => {
                  setProvince1(e.target.value);
                }}
                name="province"
              >
                <MenuItem value="">
                  <em>Choose</em>
                </MenuItem>
                <MenuItem value="Punjab">Punjab</MenuItem>
                <MenuItem value="Balochistan">Balochistan</MenuItem>
                <MenuItem value="Sindh">Sindh</MenuItem>
                <MenuItem value="Khyber Pakhtunkhwa">
                  Khyber Pakhtunkhwa
                </MenuItem>
                <MenuItem value="Azad Kashmir">Azad Kashmir</MenuItem>
              </Select>
            </FormControl>

            <TextField
              style={{ backgroundColor: "#E5E5E5", marginBottom: "10px" }}
              label="Occupation"
              type="text"
              fullWidth
              value={occupation1}
              required="true"
              inputProps={{ minLength: 3, maxLength: 20 }}
              onChange={(e) => {
                var letters = /^[a-zA-Z\s]*$/;
                if (e.target.value === "" || letters.test(e.target.value)) {
                  setOccupation1(e.target.value);
                }
              }}
            />
            <TextField
              style={{ backgroundColor: "#E5E5E5", marginBottom: "10px" }}
              label="Institution"
              type="text"
              fullWidth
              value={institution1}
              required="true"
              inputProps={{ minLength: 3, maxLength: 20 }}
              onChange={(e) => {
                var letters = /^[a-zA-Z\s]*$/;
                if (e.target.value === "" || letters.test(e.target.value)) {
                  setInstitution1(e.target.value);
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
              <Link to="/volunteer-form" style={{ textDecoration: "none" }}>
                <Button
                  onClick={deleteVolunteer}
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
    </div>
  );
};

export default EditProfile;
