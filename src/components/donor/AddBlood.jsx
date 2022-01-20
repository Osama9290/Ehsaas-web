import React, { useState, useEffect, useRef } from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import { db, auth, storage } from "../../firebase";
import { Avatar } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import $ from "jquery";
import firebase from "firebase";
import axios from "axios";

const AddBlood = () => {
  const [bloodGroup, setBloodGroup] = useState(false);
  const [age, setAge] = useState("");
  const [lastDonated, setLastDonated] = useState("");
  const [illness, setIllness] = useState("");
  const [currentMedication, setCurrentMedication] = useState("");
  const [vaccination, setVaccination] = useState("");
  const [bloodTransfusion, setBloodTransfusion] = useState("");
  const [smoking, setSmoking] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");

  const [img, setImg] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  const [msg, setMsg] = useState(false);
  const [to, setTo] = useState([]);
  const [vol, setVol] = useState([]);

  var dt = firebase.firestore.Timestamp.now().toDate().toString();
  var expiry = new Date(dt);
  expiry.setDate(expiry.getDate() + 60);

  const ref = useRef();

  useEffect(() => {
    async function getEmail() {
      db.collection("volunteer")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((element) => {
            var email = element.data().email;
            var name = element.data().name;
            setTo((arr) => [...arr, email]);
            setVol((arr) => [...arr, name]);
            console.log("emails are", email);
            console.log("name are", name);
          });
        });
    }
    getEmail();
  }, []);
  const link = "http://localhost:3000/deliver-donations";

  const handChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file["type"];
      const validImageTypes = [
        "image/gif",
        "image/jpeg",
        "image/png",
        "image/jpg",
      ];
      if (validImageTypes.includes(fileType)) {
        setError("");
        setImage(file);
      } else {
        setError("You can only upload images!");
      }
    }
  };

  const handleUpdate = () => {
    if (image) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          setError(error);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              setUrl(url);
              setProgress(0);
            });
        }
      );
    } else {
      setError("Error please choose an image to upload");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    var donorId = db.collection("donor").doc(auth.currentUser.uid);

    if (bloodGroup && image) {
      db.collection("blood")
        .add({
          donorId: donorId,
          bloodGroup: bloodGroup,
          age: age,
          lastDonated: lastDonated,
          illness: illness,
          currentMedication: currentMedication,
          vaccination: vaccination,
          bloodTransfusion: bloodTransfusion,
          smoking: smoking,
          province: province,
          city: city,
          date: dt,
          expiry: expiry,
          img: url,
          status: "active",
        })
        .then(() => {
          alert("Blood added successfully!");
        })
        .catch((error) => {
          alert("Error in adding blood");
        });
      setBloodGroup("");
      setAge("");
      setLastDonated("");
      setIllness("");
      setCurrentMedication("");
      setVaccination("");
      setBloodTransfusion("");
      setSmoking("");
      setProvince("");
      setCity("");
      setImg("");
      setUrl("");
      setImage("");
      ref.current.value = "";
    } else {
      alert("Please complete all fields");
    }

    await axios
      .post("http://localhost:2000/email/", { to, vol, link })
      .then((response) => setMsg(response.data.respMesg));
  };

  $(function () {
    $("[id*=date]").on("keypress", function () {
      var number = $(this).val();
      if (number.length == 2) {
        $(this).val($(this).val() + "/");
      }
    });
  });

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
          className="container"
          style={{
            textAlign: "center",
            paddingTop: "40px",
            marginTop: "-40px",
          }}
        >
          Donate Blood
        </h2>
      </Grid>

      <Grid item xs={6.1}>
        <Grid xs={6} md={4}>
          <Avatar
            sx={{ backgroundColor: "#E5E5E5", width: "500px", height: "300px" }}
            style={{ marginBottom: "10px", marginLeft: "60px" }}
            variant="square"
          >
            <i class="fa fa-upload" />

            {url ? (
              <img
                src={url || "https://via.placeholder.com/550"}
                alt="preview "
                style={{
                  marginBottom: "10px",
                  width: "500px",
                  height: "300px",
                }}
                flex={1}
                flexDirection="column"
              />
            ) : (
              ""
            )}
          </Avatar>
          <Grid style={{ marginBottom: "10px", marginLeft: "60px" }}>
            <input
              type="file"
              ref={ref}
              style={{ marginBottom: "10px" }}
              name="image"
              placeholder="Upload image"
              onChange={handChange}
            />{" "}
            <button
              type="submit"
              onClick={handleUpdate}
              style={{
                backgroundColor: "#2BB8C1",
                color: "black",
                borderRadius: "0.5rem",
              }}
            >
              Upload Receipt
            </button>
            <Grid style={{ height: "50px" }}>
              {progress > 0 ? <progress value={progress} max="100" /> : ""}
              <p style={{ color: "red" }}>{error}</p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={5.3}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="radio"
            onChange={(e) => {
              setBloodGroup(e.target.value);
            }}
            name="bloodGroup"
            value="A+"
            checked={bloodGroup === "A+"}
          />
          A+
          <input
            type="radio"
            onChange={(e) => {
              setBloodGroup(e.target.value);
            }}
            name="bloodGroup"
            value="A-"
            checked={bloodGroup === "A-"}
          />
          A-
          <input
            type="radio"
            onChange={(e) => {
              setBloodGroup(e.target.value);
            }}
            name="bloodGroup"
            value="B+"
            checked={bloodGroup === "B+"}
          />
          B+
          <input
            type="radio"
            onChange={(e) => {
              setBloodGroup(e.target.value);
            }}
            name="bloodGroup"
            value="B-"
            checked={bloodGroup === "B-"}
          />
          B-
          <input
            type="radio"
            onChange={(e) => {
              setBloodGroup(e.target.value);
            }}
            name="bloodGroup"
            value="AB+"
            checked={bloodGroup === "AB+"}
          />
          AB+
          <input
            type="radio"
            onChange={(e) => {
              setBloodGroup(e.target.value);
            }}
            name="bloodGroup"
            value="AB-"
            checked={bloodGroup === "AB-"}
          />
          AB-
          <input
            type="radio"
            onChange={(e) => {
              setBloodGroup(e.target.value);
            }}
            name="bloodGroup"
            value="O+"
            checked={bloodGroup === "O+"}
          />
          O+
          <input
            type="radio"
            onChange={(e) => {
              setBloodGroup(e.target.value);
            }}
            name="bloodGroup"
            value="O-"
            checked={bloodGroup === "O-"}
          />
          O-
          <TextField
            style={{
              backgroundColor: "#E5E5E5",
              marginBottom: "10px",
              marginTop: "15px",
            }}
            label="Age (between 18 and 65 years)"
            fullWidth
            value={age}
            required="true"
            inputProps={{ minLength: 2, maxLength: 2 }}
            onChange={(e) => {
              const re = /\b([1-9]|[1][8-9]|[23][0-9]|[45][0-9]|6[0-5])\b/;
              if (e.target.value === "" || re.test(e.target.value)) {
                setAge(e.target.value);
              }
            }}
          />
          <TextField
            style={{ backgroundColor: "#E5E5E5", marginBottom: "10px" }}
            label="Last Donated (month/year)"
            fullWidth
            id="date"
            value={lastDonated}
            inputProps={{ maxLength: 5 }}
            onChange={(e) => {
              var letters = /^[0-9\b//]+$/;
              if (e.target.value === "" || letters.test(e.target.value)) {
                setLastDonated(e.target.value);
              }
            }}
          />
          <TextField
            style={{ backgroundColor: "#E5E5E5", marginBottom: "10px" }}
            label="Illness (if any)"
            fullWidth
            value={illness}
            inputProps={{ maxLength: 20 }}
            onChange={(e) => {
              var letters = /^[a-zA-Z\s]*$/;
              if (e.target.value === "" || letters.test(e.target.value)) {
                setIllness(e.target.value);
              }
            }}
          />
          <TextField
            style={{ backgroundColor: "#E5E5E5", marginBottom: "10px" }}
            label="Current Medication (if any)"
            fullWidth
            value={currentMedication}
            inputProps={{ maxLength: 20 }}
            onChange={(e) => {
              var letters = /^[A-Za-z0-9\s]*$/;
              if (e.target.value === "" || letters.test(e.target.value)) {
                setCurrentMedication(e.target.value);
              }
            }}
          />
          <TextField
            style={{ backgroundColor: "#E5E5E5", marginBottom: "10px" }}
            label="List your Vaccinations (if any)"
            fullWidth
            value={vaccination}
            inputProps={{ maxLength: 20 }}
            onChange={(e) => {
              var letters = /^[A-Za-z0-9\s]*$/;
              if (e.target.value === "" || letters.test(e.target.value)) {
                setVaccination(e.target.value);
              }
            }}
          />
          <FormControl
            style={{
              backgroundColor: "#E5E5E5",
              marginBottom: "10px",
              minWidth: "544px",
            }}
          >
            <InputLabel fullWidth>Have you ever received blood?</InputLabel>
            <Select
              value={bloodTransfusion}
              required="true"
              onChange={(e) => {
                setBloodTransfusion(e.target.value);
              }}
              name="bloodTransfusion"
            >
              <MenuItem value="">
                <em>Choose</em>
              </MenuItem>
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            style={{
              backgroundColor: "#E5E5E5",
              marginBottom: "10px",
              minWidth: "544px",
            }}
          >
            <InputLabel fullWidth>Do you smoke?</InputLabel>
            <Select
              value={smoking}
              required="true"
              onChange={(e) => {
                setSmoking(e.target.value);
              }}
              name="smoking"
            >
              <MenuItem value="">
                <em>Choose</em>
              </MenuItem>
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            style={{
              backgroundColor: "#E5E5E5",
              marginBottom: "10px",
              minWidth: "544px",
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
            label="City"
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
          <Grid item xs={9}>
            <Button
              type="submit"
              style={{
                backgroundColor: "#2BB8C1",
                color: "black",
                borderRadius: "0.7rem",
              }}
            >
              ADD
            </Button>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default AddBlood;
