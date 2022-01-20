import React, { useState, useEffect, useRef } from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import { db, auth, storage } from "../../firebase";
import { FaStar } from "react-icons/fa";
import { Avatar } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import firebase from "firebase";
import axios from "axios";

const AddUsedItem = () => {
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

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const [active, setActive] = useState(null);
  const [img, setImg] = useState("");

  const [description, setDescription] = useState("");

  const [size, setSize] = useState("");
  const [brand, setBrand] = useState("");

  const [author, setAuthor] = useState("");
  const [edition, setEdition] = useState("");

  const [otherCategory, setOtherCategory] = useState("");

  const [msg, setMsg] = useState(false);
  const [to, setTo] = useState([]);
  const [vol, setVol] = useState([]);
  const [name1, setName1] = useState("");
  const [contact1, setcontact1] = useState("");

  var dt = firebase.firestore.Timestamp.now().toDate().toString();
  var expiry = new Date(dt);
  expiry.setDate(expiry.getDate() + 30);

  const ref = useRef();

  useEffect(() => {
    async function getEmail() {
      const UserRef = db.collection("donor").doc(auth.currentUser.uid);
      const doc = await UserRef.get();
      if (!doc.exists) {
        console.log("No such document!");
      } else {
        setName1(doc.data().name);
        setcontact1(doc.data().contactNo);
        console.log("Name:", doc.data());
        console.log("D", doc.data().name);
      }
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
  const text = "Donor's";
  const text2 = "Receiver";

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

    if (category && rating && image) {
      if (category === "furniture") {
        db.collection("usedItems")
          .add({
            donorId: donorId,
            name: name,
            quantity: quantity,
            streetAddress: streetAddress,
            province: province,
            city: city,
            category: category,
            rating: rating,
            img: url,
            date: dt,
            expiry: expiry,
            description: description,
            status: "active",
          })
          .then(() => {
            alert("Item added successfully!");
          })
          .catch((error) => {
            alert("Error in adding item");
          });
      } else if (category === "clothes") {
        db.collection("usedItems")
          .add({
            donorId: donorId,
            name: name,
            quantity: quantity,
            streetAddress: streetAddress,
            province: province,
            city: city,
            category: category,
            rating: rating,
            img: url,
            size: size,
            date: dt,
            expiry: expiry,
            brand: brand,
            status: "active",
          })
          .then(() => {
            alert("Item added successfully!");
          })
          .catch((error) => {
            alert("Error in adding item");
          });
      } else if (category === "books") {
        db.collection("usedItems")
          .add({
            donorId: donorId,
            name: name,
            quantity: quantity,
            streetAddress: streetAddress,
            province: province,
            city: city,
            category: category,
            rating: rating,
            img: url,
            date: dt,
            expiry: expiry,
            author: author,
            edition: edition,
            status: "active",
          })
          .then(() => {
            alert("Item added successfully!");
          })
          .catch((error) => {
            alert("Error in adding item");
          });
      } else if (category === "other") {
        db.collection("usedItems")
          .add({
            donorId: donorId,
            name: name,
            quantity: quantity,
            streetAddress: streetAddress,
            province: province,
            city: city,
            category: category,
            rating: rating,
            img: url,
            date: dt,
            expiry: expiry,
            otherCategory: otherCategory,
            status: "active",
          })
          .then(() => {
            alert("Item added successfully!");
          })
          .catch((error) => {
            alert("Error in adding item");
          });
      }
      setName("");
      setQuantity("");
      setStreetAddress("");
      setProvince("");
      setCity("");
      setCategory("");
      setRating("");
      setImg("");
      setDescription("");
      setSize("");
      setBrand("");
      setAuthor("");
      setEdition("");
      setOtherCategory("");
      setActive("");
      setUrl("");
      setImage("");
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
          Donate Used Item
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
            inputProps={{ minLength: 1, maxLength: 5 }}
            onChange={(e) => {
              const re = /^[1-9\b]+$/;
              if (e.target.value === "" || re.test(e.target.value)) {
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
          <div style={{ paddingBottom: "7px" }}>
            <p style={{ marginBottom: "2px" }}>Rate product quality:</p>
            {[...Array(5)].map((star, i) => {
              const ratingValue = i + 1;
              return (
                <label>
                  <input
                    type="radio"
                    className="radioClass"
                    name="rating"
                    value={ratingValue}
                    onClick={() => setRating(ratingValue)}
                  />
                  <FaStar
                    className="star"
                    color={
                      ratingValue <= (hover || rating) ? "#ffc107" : "#D0D0D0"
                    }
                    size={30}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(null)}
                  />
                </label>
              );
            })}
          </div>
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

export default AddUsedItem;
