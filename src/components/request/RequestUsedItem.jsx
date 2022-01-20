import React, { useState, useEffect } from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import { db, auth } from "../../firebase";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import firebase from "firebase";
import img1 from "../images/hero1.PNG";

const RequestUsedItem = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState(false);

  const [active, setActive] = useState(null);

  const [attendantName, setAttendantName] = useState("");
  const [attendantContact, setAttendantContact] = useState("");
  const [pickDrop, setPickDrop] = useState("");

  const [description, setDescription] = useState("");

  const [size, setSize] = useState("");
  const [brand, setBrand] = useState("");

  const [author, setAuthor] = useState("");
  const [edition, setEdition] = useState("");

  const [otherCategory, setOtherCategory] = useState("");

  var dt = firebase.firestore.Timestamp.now().toDate().toString();

  useEffect(() => {
    async function getAttendant() {
      const UserRef = db.collection("receiver").doc(auth.currentUser.uid);
      const doc = await UserRef.get();
      if (!doc.exists) {
      } else {
        setAttendantName(doc.data().name);
        setAttendantContact(doc.data().contactNo);
      }
    }
    getAttendant();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    var receiverId = db.collection("receiver").doc(auth.currentUser.uid);

    if (category) {
      if (category === "furniture") {
        db.collection("usedItemRequest")
          .add({
            receiverId: receiverId,
            name: name,
            quantity: quantity,
            province: province,
            city: city,
            category: category,
            attendantName: attendantName,
            attendantContact: attendantContact,
            pickDrop: pickDrop,
            date: dt,
            description: description,
            status: "active",
          })
          .then(() => {
            alert("Request made successfully!");
          })
          .catch((error) => {
            alert("Error in making request");
          });
      } else if (category === "clothes") {
        db.collection("usedItemRequest")
          .add({
            receiverId: receiverId,
            name: name,
            quantity: quantity,
            province: province,
            city: city,
            category: category,
            size: size,
            date: dt,
            brand: brand,
            attendantName: attendantName,
            attendantContact: attendantContact,
            pickDrop: pickDrop,
            status: "active",
          })
          .then(() => {
            alert("Request made successfully!");
          })
          .catch((error) => {
            alert("Error in making request");
          });
      } else if (category === "books") {
        db.collection("usedItemRequest")
          .add({
            receiverId: receiverId,
            name: name,
            quantity: quantity,
            province: province,
            city: city,
            category: category,
            date: dt,
            author: author,
            edition: edition,
            attendantName: attendantName,
            attendantContact: attendantContact,
            pickDrop: pickDrop,
            status: "active",
          })
          .then(() => {
            alert("Request made successfully!");
          })
          .catch((error) => {
            alert("Error in making request");
          });
      } else if (category === "other") {
        db.collection("usedItemRequest")
          .add({
            receiverId: receiverId,
            name: name,
            quantity: quantity,
            province: province,
            city: city,
            category: category,
            attendantName: attendantName,
            attendantContact: attendantContact,
            pickDrop: pickDrop,
            date: dt,
            otherCategory: otherCategory,
            status: "active",
          })
          .then(() => {
            alert("Request made successfully!");
          })
          .catch((error) => {
            alert("Error in making request");
          });
      }
      setName("");
      setQuantity("");
      setProvince("");
      setCity("");
      setCategory("");
      setDescription("");
      setSize("");
      setBrand("");
      setAuthor("");
      setEdition("");
      setOtherCategory("");
      setActive("");
      setAttendantName("");
      setAttendantContact("");
      setPickDrop("");
    } else {
      alert("Please complete all fields");
    }
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <p
          style={{
            textAlign: "right",
            margin: "10px",
            marginRight: "48px",
            textDecoration: "underline",
          }}
        >
          Receiver
        </p>
        <h2
          className="container"
          style={{
            textAlign: "center",
            paddingTop: "40px",
            marginTop: "-40px",
          }}
        >
          Request Used Item
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
          <p>Used Item Information:</p>
          <TextField
            style={{ backgroundColor: "#E5E5E5", marginBottom: "10px" }}
            label="Product Name"
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
            inputProps={{ minLength: 1, maxLength: 50 }}
            onChange={(e) => {
              const re = /^[1-9\b]+$/;
              if (e.target.value === "" || re.test(e.target.value)) {
                setQuantity(e.target.value);
              }
            }}
          />
          <FormControl
            style={{
              backgroundColor: "#E5E5E5",
              marginBottom: "10px",
              minWidth: "455px",
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
          <p style={{ marginBottom: "2px" }}>Select product category:</p>
          <input
            type="radio"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            name="category"
            value="furniture"
            onClick={() => setActive("one")}
            checked={category === "furniture"}
          />
          Furniture
          <input
            type="radio"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            name="category"
            onClick={() => setActive("two")}
            value="clothes"
            checked={category === "clothes"}
          />
          Clothes
          <input
            type="radio"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            onClick={() => setActive("three")}
            name="category"
            value="books"
            checked={category === "books"}
          />
          Books
          <input
            type="radio"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            onClick={() => setActive("four")}
            name="category"
            value="other"
            checked={category === "other"}
          />
          Other
          <Grid>
            {active === "one" && (
              <TextField
                style={{
                  backgroundColor: "#E5E5E5",
                  marginBottom: "10px",
                  marginTop: "15px",
                }}
                fullWidth
                label="Description"
                value={description}
                inputProps={{ minLength: 3, maxLength: 30 }}
                onChange={(e) => {
                  var letters = /^[a-zA-Z\s]*$/;
                  if (e.target.value === "" || letters.test(e.target.value)) {
                    setDescription(e.target.value);
                  }
                }}
              />
            )}
            {active === "two" && (
              <TextField
                style={{
                  backgroundColor: "#E5E5E5",
                  marginBottom: "10px",
                  marginTop: "15px",
                }}
                fullWidth
                label="Size"
                value={size}
                required="true"
                inputProps={{ minLength: 1, maxLength: 10 }}
                onChange={(e) => {
                  var letters = /^[A-Za-z0-9\s]*$/;
                  if (e.target.value === "" || letters.test(e.target.value)) {
                    setSize(e.target.value);
                  }
                }}
              />
            )}{" "}
            {active === "two" && (
              <TextField
                style={{ backgroundColor: "#E5E5E5", marginBottom: "10px" }}
                fullWidth
                label="Brand"
                value={brand}
                inputProps={{ minLength: 3, maxLength: 15 }}
                onChange={(e) => {
                  var letters = /^[a-zA-Z\s]*$/;
                  if (e.target.value === "" || letters.test(e.target.value)) {
                    setBrand(e.target.value);
                  }
                }}
              />
            )}
            {active === "three" && (
              <TextField
                style={{ backgroundColor: "#E5E5E5", marginTop: "15px" }}
                fullWidth
                label="Author"
                value={author}
                required="true"
                inputProps={{ minLength: 3, maxLength: 15 }}
                onChange={(e) => {
                  var letters = /^[a-zA-Z\s]*$/;
                  if (e.target.value === "" || letters.test(e.target.value)) {
                    setAuthor(e.target.value);
                  }
                }}
              />
            )}
            {active === "three" && (
              <TextField
                style={{
                  backgroundColor: "#E5E5E5",
                  marginBottom: "10px",
                  marginTop: "10px",
                }}
                fullWidth
                label="Edition"
                value={edition}
                inputProps={{ minLength: 3, maxLength: 15 }}
                onChange={(e) => {
                  var letters = /^[A-Za-z0-9\s]*$/;
                  if (e.target.value === "" || letters.test(e.target.value)) {
                    setEdition(e.target.value);
                  }
                }}
              />
            )}
            {active === "four" && (
              <TextField
                style={{
                  backgroundColor: "#E5E5E5",
                  marginBottom: "10px",
                  marginTop: "15px",
                }}
                fullWidth
                label="Category"
                value={otherCategory}
                required="true"
                inputProps={{ minLength: 3, maxLength: 15 }}
                onChange={(e) => {
                  var letters = /^[a-zA-Z\s]*$/;
                  if (e.target.value === "" || letters.test(e.target.value)) {
                    setOtherCategory(e.target.value);
                  }
                }}
              />
            )}
          </Grid>
          <p style={{ paddingTop: "10px", paddingBottom: "5px" }}>
            Attendant Information:
          </p>
          <TextField
            style={{ backgroundColor: "#E5E5E5", marginBottom: "10px" }}
            label="Attendant Name"
            fullWidth
            value={attendantName}
            required="true"
            inputProps={{ minLength: 3, maxLength: 20 }}
            onChange={(e) => {
              var letters = /^[a-zA-Z\s]*$/;
              if (e.target.value === "" || letters.test(e.target.value)) {
                setAttendantName(e.target.value);
              }
            }}
          />
          <TextField
            style={{ backgroundColor: "#E5E5E5", marginBottom: "10px" }}
            label="Contact No."
            fullWidth
            value={attendantContact}
            required="true"
            inputProps={{ minLength: 11, maxLength: 11 }}
            onChange={(e) => {
              const re = /^[0-9\b]+$/;
              if (e.target.value === "" || re.test(e.target.value)) {
                setAttendantContact(e.target.value);
              }
            }}
          />
          <FormControl
            style={{
              backgroundColor: "#E5E5E5",
              marginBottom: "10px",
              minWidth: "455px",
            }}
          >
            <InputLabel fullWidth>Pick & Drop Available?</InputLabel>
            <Select
              value={pickDrop}
              required="true"
              onChange={(e) => {
                setPickDrop(e.target.value);
              }}
              name="pickDrop"
            >
              <MenuItem value="">
                <em>Choose</em>
              </MenuItem>
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </FormControl>
          <Grid item xs={9}>
            <Button
              type="submit"
              style={{
                backgroundColor: "#2BB8C1",
                color: "black",
                borderRadius: "0.7rem",
              }}
            >
              REQUEST
            </Button>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default RequestUsedItem;
