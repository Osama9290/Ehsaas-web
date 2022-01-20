import React, { useState, useEffect, useRef } from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import { db, auth, storage } from "../../firebase";
import { Avatar } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import firebase from "firebase";
import axios from "axios";

const AddFood = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState(false);

  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [img, setImg] = useState("");

  const [msg, setMsg] = useState(false);
  const [to, setTo] = useState([]);
  const [vol, setVol] = useState([]);
  const [name1, setName1] = useState("");
  const [contact1, setcontact1] = useState("");

  const ref = useRef();

  useEffect(() => {
    async function getEmail() {
      const UserRef = db.collection("donor").doc(auth.currentUser.uid);
      const doc = await UserRef.get();
      if (!doc.exists) {
      } else {
        setName1(doc.data().name);
        setcontact1(doc.data().contactNo);
      }
      db.collection("volunteer")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((element) => {
            var email = element.data().email;
            var name = element.data().name;
            setTo((arr) => [...arr, email]);
            setVol((arr) => [...arr, name]);
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
  const text = "Donor's";
  const text2 = "Receiver";

  const handleSubmit = async (e) => {
    e.preventDefault();

    var donorId = db.collection("donor").doc(auth.currentUser.uid);

    var dt = firebase.firestore.Timestamp.now().toDate().toString();

    var expiry = new Date(dt);
    expiry.setDate(expiry.getDate() + 3);

    if (category && image) {
      db.collection("food")
        .add({
          donorId: donorId,
          name: name,
          quantity: quantity,
          streetAddress: streetAddress,
          province: province,
          city: city,
          category: category,
          date: dt,
          expiry: expiry,
          img: url,
          status: "active",
        })
        .then(() => {
          alert("Item added successfully!");
        })
        .catch((error) => {
          alert("Error in adding item");
        });

      setName("");
      setQuantity("");
      setStreetAddress("");
      setProvince("");
      setCity("");
      setCategory("");
      setUrl("");
      setImage("");
      setImg("");
      ref.current.value = "";
    } else {
      alert("Please complete all fields");
    }

    await axios
      .post("http://localhost:2000/email/", {
        to,
        link,
        name1,
        contact1,
        name,
        city,
        quantity,
        province,
        text,
        text2,
        streetAddress,
        category,
      })
      .then((response) => setMsg(response.data.respMesg));
  };

  return (
    <Grid container spacing={4}>
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
          Donate Food
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
              Upload Image
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
          <TextField
            style={{ backgroundColor: "#E5E5E5", marginBottom: "10px" }}
            label="Food Name"
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
            label="Quantity"
            fullWidth
            value={quantity}
            required="true"
            inputProps={{ minLength: 1, maxLength: 10 }}
            onChange={(e) => {
              var letters = /^[A-Za-z0-9\s]*$/;
              if (e.target.value === "" || letters.test(e.target.value)) {
                setQuantity(e.target.value);
              }
            }}
          />
          <TextField
            style={{ backgroundColor: "#E5E5E5", marginBottom: "10px" }}
            label="Street Address"
            fullWidth
            value={streetAddress}
            required="true"
            inputProps={{ minLength: 5, maxLength: 30 }}
            onChange={(e) => {
              var letters = /^[A-Za-z0-9\s-]*$/;
              if (e.target.value === "" || letters.test(e.target.value)) {
                setStreetAddress(e.target.value);
              }
            }}
          />
          <FormControl
            style={{
              backgroundColor: "#E5E5E5",
              marginBottom: "10px",
              minWidth: "540px",
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
          <input
            type="radio"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            name="category"
            value="cooked"
            checked={category === "cooked"}
          />
          Cooked
          <input
            type="radio"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            name="category"
            value="uncooked"
            checked={category === "uncooked"}
          />
          Uncooked
          <Grid item xs={9}>
            <Button
              type="submit"
              style={{
                backgroundColor: "#2BB8C1",
                color: "black",
                borderRadius: "0.7rem",
                marginTop: "8px",
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

export default AddFood;
