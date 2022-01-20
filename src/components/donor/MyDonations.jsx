import { auth, db } from "../../firebase";
import { useState, useEffect } from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import firebase from "firebase";
import { Modal } from "react-bootstrap";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { FaStar } from "react-icons/fa";

const MyDonations = () => {
  const [foodInfo, setFoodInfo] = useState([]);
  const [itemInfo, setItemInfo] = useState([]);
  const [bloodInfo, setBloodInfo] = useState([]);

  const [active, setActive] = useState("");
  const [filterCategory, setFilterCategory] = useState(false);

  const dt = firebase.firestore.Timestamp.now().toDate().toString();

  useEffect(async () => {
    const userRef = db.doc(`donor/${auth.currentUser.uid}`);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
    } else {
      db.collection("food")
        .where("donorId", "==", userRef)
        .onSnapshot((querySnapshot) => {
          var foodData = [];
          querySnapshot.forEach((element) => {
            foodData.push(element.data());
          });
          setFoodInfo(foodData);
        });
      db.collection("usedItems")
        .where("donorId", "==", userRef)
        .onSnapshot((querySnapshot) => {
          var itemData = [];
          querySnapshot.forEach((element) => {
            itemData.push(element.data());
          });
          setItemInfo(itemData);
        });
      db.collection("blood")
        .where("donorId", "==", userRef)
        .onSnapshot((querySnapshot) => {
          var bloodData = [];
          querySnapshot.forEach((element) => {
            bloodData.push(element.data());
          });
          setBloodInfo(bloodData);
        });
    }
  }, []);

  const fetchFoodData = async () => {
    const userRef = db.doc(`donor/${auth.currentUser.uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
    } else {
      db.collection("food")
        .where("donorId", "==", userRef)
        .get()
        .then((querySnapshot) => {
          setFoodInfo([]);
          setItemInfo([]);
          setBloodInfo([]);
          querySnapshot.forEach((element) => {
            var foodData = element.data();
            setFoodInfo((arr) => [...arr, foodData]);
          });
        });
    }
  };

  const fetchItemData = async () => {
    const userRef = db.doc(`donor/${auth.currentUser.uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
    } else {
      db.collection("usedItems")
        .where("donorId", "==", userRef)
        .get()
        .then((querySnapshot) => {
          setFoodInfo([]);
          setItemInfo([]);
          setBloodInfo([]);
          querySnapshot.forEach((element) => {
            var itemData = element.data();
            setItemInfo((arr) => [...arr, itemData]);
          });
        });
    }
  };

  const fetchBloodData = async () => {
    const userRef = db.doc(`donor/${auth.currentUser.uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
    } else {
      db.collection("blood")
        .where("donorId", "==", userRef)
        .get()
        .then((querySnapshot) => {
          setFoodInfo([]);
          setItemInfo([]);
          setBloodInfo([]);
          querySnapshot.forEach((element) => {
            var bloodData = element.data();
            setBloodInfo((arr) => [...arr, bloodData]);
          });
        });
    }
  };

  //LATEST TO OLD
  const latestToOld = async () => {
    const userRef = db.doc(`donor/${auth.currentUser.uid}`);
    db
      .collection("food")
      .where("donorId", "==", userRef)
      .orderBy("date", "desc")
      .onSnapshot((querySnapshot) => {
        setFoodInfo([]);
        querySnapshot.forEach((element) => {
          var foodData = element.data();
          setFoodInfo((arr) => [...arr, foodData]);
        });
      }) &&
      db
        .collection("usedItems")
        .where("donorId", "==", userRef)
        .orderBy("date", "desc")
        .onSnapshot((querySnapshot) => {
          setItemInfo([]);
          querySnapshot.forEach((element) => {
            var itemData = element.data();
            setItemInfo((arr) => [...arr, itemData]);
          });
        }) &&
      db
        .collection("blood")
        .where("donorId", "==", userRef)
        .orderBy("date", "desc")
        .onSnapshot((querySnapshot) => {
          setBloodInfo([]);
          querySnapshot.forEach((element) => {
            var bloodData = element.data();
            setBloodInfo((arr) => [...arr, bloodData]);
          });
        });
  };

  //OLD TO LATEST
  const oldToLatest = async () => {
    const userRef = db.doc(`donor/${auth.currentUser.uid}`);
    db
      .collection("food")
      .where("donorId", "==", userRef)
      .where("date", "<", "dt")
      .orderBy("date")
      .onSnapshot((querySnapshot) => {
        setFoodInfo([]);
        querySnapshot.forEach((element) => {
          var foodData = element.data();
          setFoodInfo((arr) => [...arr, foodData]);
        });
      }) &&
      db
        .collection("usedItems")
        .where("donorId", "==", userRef)
        .where("date", "<", "dt")
        .orderBy("date")
        .onSnapshot((querySnapshot) => {
          setItemInfo([]);
          querySnapshot.forEach((element) => {
            var itemData = element.data();
            setItemInfo((arr) => [...arr, itemData]);
          });
        }) &&
      db
        .collection("blood")
        .where("donorId", "==", userRef)
        .where("date", "<", "dt")
        .orderBy("date")
        .onSnapshot((querySnapshot) => {
          setBloodInfo([]);
          querySnapshot.forEach((element) => {
            var bloodData = element.data();
            setBloodInfo((arr) => [...arr, bloodData]);
          });
        });
  };

  //PUNJAB
  const punjab = async () => {
    const userRef = db.doc(`donor/${auth.currentUser.uid}`);
    db
      .collection("food")
      .where("donorId", "==", userRef)
      .where("province", "==", "Punjab")
      .get()
      .then((querySnapshot) => {
        setFoodInfo([]);
        querySnapshot.forEach((element) => {
          var foodData = element.data();
          setFoodInfo((arr) => [...arr, foodData]);
        });
      }) &&
      db
        .collection("usedItems")
        .where("donorId", "==", userRef)
        .where("province", "==", "Punjab")
        .get()
        .then((querySnapshot) => {
          setItemInfo([]);
          querySnapshot.forEach((element) => {
            var itemData = element.data();
            setItemInfo((arr) => [...arr, itemData]);
          });
        }) &&
      db
        .collection("blood")
        .where("donorId", "==", userRef)
        .where("province", "==", "Punjab")
        .get()
        .then((querySnapshot) => {
          setBloodInfo([]);
          querySnapshot.forEach((element) => {
            var bloodData = element.data();
            setBloodInfo((arr) => [...arr, bloodData]);
          });
        });
  };

  //SINDH
  const sindh = async () => {
    const userRef = db.doc(`donor/${auth.currentUser.uid}`);
    db
      .collection("food")
      .where("donorId", "==", userRef)
      .where("province", "==", "Sindh")
      .get()
      .then((querySnapshot) => {
        setFoodInfo([]);
        querySnapshot.forEach((element) => {
          var foodData = element.data();
          setFoodInfo((arr) => [...arr, foodData]);
        });
      }) &&
      db
        .collection("usedItems")
        .where("province", "==", "Sindh")
        .get()
        .then((querySnapshot) => {
          setItemInfo([]);
          querySnapshot.forEach((element) => {
            var itemData = element.data();
            setItemInfo((arr) => [...arr, itemData]);
          });
        }) &&
      db
        .collection("blood")
        .where("province", "==", "Sindh")
        .get()
        .then((querySnapshot) => {
          setBloodInfo([]);
          querySnapshot.forEach((element) => {
            var bloodData = element.data();
            setBloodInfo((arr) => [...arr, bloodData]);
          });
        });
  };

  //KHYBER PAKHTUNKHWA
  const kpk = async () => {
    const userRef = db.doc(`donor/${auth.currentUser.uid}`);
    db
      .collection("food")
      .where("donorId", "==", userRef)
      .where("province", "==", "Khyber Pakhtunkhwa")
      .get()
      .then((querySnapshot) => {
        setFoodInfo([]);
        querySnapshot.forEach((element) => {
          var foodData = element.data();
          setFoodInfo((arr) => [...arr, foodData]);
        });
      }) &&
      db
        .collection("usedItems")
        .where("donorId", "==", userRef)
        .where("province", "==", "Khyber Pakhtunkhwa")
        .get()
        .then((querySnapshot) => {
          setItemInfo([]);
          querySnapshot.forEach((element) => {
            var itemData = element.data();
            setItemInfo((arr) => [...arr, itemData]);
          });
        }) &&
      db
        .collection("blood")
        .where("donorId", "==", userRef)
        .where("province", "==", "Khyber Pakhtunkhwa")
        .get()
        .then((querySnapshot) => {
          setBloodInfo([]);
          querySnapshot.forEach((element) => {
            var bloodData = element.data();
            setBloodInfo((arr) => [...arr, bloodData]);
          });
        });
  };

  //BALOCHISTAN
  const balochistan = async () => {
    const userRef = db.doc(`donor/${auth.currentUser.uid}`);
    db
      .collection("food")
      .where("donorId", "==", userRef)
      .where("province", "==", "Balochistan")
      .get()
      .then((querySnapshot) => {
        setFoodInfo([]);
        querySnapshot.forEach((element) => {
          var foodData = element.data();
          setFoodInfo((arr) => [...arr, foodData]);
        });
      }) &&
      db
        .collection("usedItems")
        .where("donorId", "==", userRef)
        .where("province", "==", "Balochistan")
        .get()
        .then((querySnapshot) => {
          setItemInfo([]);
          querySnapshot.forEach((element) => {
            var itemData = element.data();
            setItemInfo((arr) => [...arr, itemData]);
          });
        }) &&
      db
        .collection("blood")
        .where("donorId", "==", userRef)
        .where("province", "==", "Balochistan")
        .get()
        .then((querySnapshot) => {
          setBloodInfo([]);
          querySnapshot.forEach((element) => {
            var bloodData = element.data();
            setBloodInfo((arr) => [...arr, bloodData]);
          });
        });
  };

  //AZAD KASHMIR
  const kashmir = async () => {
    const userRef = db.doc(`donor/${auth.currentUser.uid}`);
    db
      .collection("food")
      .where("donorId", "==", userRef)
      .where("province", "==", "Azad Kashmir")
      .get()
      .then((querySnapshot) => {
        setFoodInfo([]);
        querySnapshot.forEach((element) => {
          var foodData = element.data();
          setFoodInfo((arr) => [...arr, foodData]);
        });
      }) &&
      db
        .collection("usedItems")
        .where("donorId", "==", userRef)
        .where("province", "==", "Azad Kashmir")
        .get()
        .then((querySnapshot) => {
          setItemInfo([]);
          querySnapshot.forEach((element) => {
            var itemData = element.data();
            setItemInfo((arr) => [...arr, itemData]);
          });
        }) &&
      db
        .collection("blood")
        .where("donorId", "==", userRef)
        .where("province", "==", "Azad Kashmir")
        .get()
        .then((querySnapshot) => {
          setBloodInfo([]);
          querySnapshot.forEach((element) => {
            var bloodData = element.data();
            setBloodInfo((arr) => [...arr, bloodData]);
          });
        });
  };

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
            paddingBottom: "20px",
          }}
        >
          My Donations
        </h2>
      </Grid>

      <Grid container spacing={-5}>
        <p style={{ marginLeft: "100px", marginRight: "20px" }}>Sort by:</p>

        <Button
          type="submit"
          onClick={() => {
            latestToOld();
            setActive("one");
          }}
          style={{
            backgroundColor: "#2BB8C1",
            color: "black",
            borderRadius: "0.7rem",
            textTransform: "capitalize",
            marginRight: "10px",
          }}
        >
          Latest to old
        </Button>

        <Button
          type="submit"
          onClick={() => {
            oldToLatest();
            setActive("two");
          }}
          style={{
            backgroundColor: "#2BB8C1",
            color: "black",
            borderRadius: "0.7rem",
            textTransform: "capitalize",
            marginRight: "10px",
          }}
        >
          Old to latest
        </Button>
      </Grid>

      <Grid container spacing={2} direction="row">
        <Grid
          container
          xs={10}
          direction="row"
          paddingTop="30px"
          paddingLeft="40px"
        >
          {foodInfo.map((foodData) => (
            <Frame1
              name={foodData.name}
              quantity={foodData.quantity}
              streetAddress={foodData.streetAddress}
              province={foodData.province}
              city={foodData.city}
              category={foodData.category}
              date={foodData.date}
              img={foodData.img}
              status={foodData.status}
              donorId={foodData.donorId}
            />
          ))}
          {itemInfo.map((itemData) => (
            <Frame2
              name={itemData.name}
              quantity={itemData.quantity}
              streetAddress={itemData.streetAddress}
              province={itemData.province}
              city={itemData.city}
              category={itemData.category}
              date={itemData.date}
              img={itemData.img}
              rating={itemData.rating}
              description={itemData.description}
              size={itemData.size}
              brand={itemData.brand}
              author={itemData.author}
              edition={itemData.edition}
              otherCategory={itemData.otherCategory}
              status={itemData.status}
              donorId={itemData.donorId}
            />
          ))}
          {bloodInfo.map((bloodData) => (
            <Frame3
              bloodGroup={bloodData.bloodGroup}
              age={bloodData.age}
              lastDonated={bloodData.lastDonated}
              illness={bloodData.illness}
              currentMedication={bloodData.currentMedication}
              vaccination={bloodData.vaccination}
              bloodTransfusion={bloodData.bloodTransfusion}
              smoking={bloodData.smoking}
              province={bloodData.province}
              city={bloodData.city}
              date={bloodData.date}
              img={bloodData.img}
              status={bloodData.status}
              donorId={bloodData.donorId}
            />
          ))}
        </Grid>

        <Grid item xs={2}>
          <p>Filter by:</p>
          <p>Category</p>
          <div style={{ flex: "1", flexDirection: "column" }}>
            <input
              type="checkbox"
              onChange={() => {
                setFilterCategory("food");
              }}
              onClick={() => {
                fetchFoodData();
                setActive("food");
              }}
              checked={filterCategory === "food"}
            />
            Food
          </div>
          <div style={{ flex: "1", flexDirection: "column" }}>
            <input
              type="checkbox"
              onChange={() => {
                setFilterCategory("usedItems");
              }}
              onClick={() => {
                fetchItemData();
                setActive("item");
              }}
              checked={filterCategory === "usedItems"}
            />
            Used Items
          </div>
          <div style={{ flex: "1", flexDirection: "column" }}>
            <input
              type="checkbox"
              onChange={() => {
                setFilterCategory("blood");
              }}
              onClick={() => {
                fetchBloodData();
                setActive("blood");
              }}
              checked={filterCategory === "blood"}
            />
            Blood
          </div>

          <p style={{ paddingTop: "20px" }}>Province</p>

          <div style={{ flex: "1", flexDirection: "column" }}>
            <input
              type="checkbox"
              onChange={() => {
                setFilterCategory("punjab");
              }}
              onClick={() => {
                punjab();
                setActive("punjab");
              }}
              checked={filterCategory === "punjab"}
            />
            Punjab
          </div>
          <div style={{ flex: "1", flexDirection: "column" }}>
            <input
              type="checkbox"
              onChange={() => {
                setFilterCategory("sindh");
              }}
              onClick={() => {
                sindh();
                setActive("sindh");
              }}
              checked={filterCategory === "sindh"}
            />
            Sindh
          </div>
          <div style={{ flex: "1", flexDirection: "column" }}>
            <input
              type="checkbox"
              onChange={() => {
                setFilterCategory("kpk");
              }}
              onClick={() => {
                kpk();
                setActive("kpk");
              }}
              checked={filterCategory === "kpk"}
            />
            Khyber Pakhtunkhwa
          </div>
          <div style={{ flex: "1", flexDirection: "column" }}>
            <input
              type="checkbox"
              onChange={() => {
                setFilterCategory("balochistan");
              }}
              onClick={() => {
                balochistan();
                setActive("balochistan");
              }}
              checked={filterCategory === "balochistan"}
            />
            Balochistan
          </div>
          <div style={{ flex: "1", flexDirection: "column" }}>
            <input
              type="checkbox"
              onChange={() => {
                setFilterCategory("kashmir");
              }}
              onClick={() => {
                kashmir();
                setActive("kashmir");
              }}
              checked={filterCategory === "kashmir"}
            />
            Azad Kashmir
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

const Frame1 = ({
  name,
  quantity,
  streetAddress,
  province,
  city,
  category,
  date,
  img,
  status,
  donorId,
}) => {
  const [show, setShow] = useState(false);
  const [foodName, setFoodName] = useState(name);
  const [foodQuantity, setFoodQuantity] = useState(quantity);
  const [foodStreetAddress, setFoodStreetAddress] = useState(streetAddress);
  const [foodProvince, setFoodProvince] = useState(province);
  const [foodCity, setFoodCity] = useState(city);
  const [foodCategory, setFoodCategory] = useState(category);

  const [donationId, setDonationId] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    db.collection("food")
      .where("name", "==", name)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.update({
            name: foodName,
            quantity: foodQuantity,
            streetAddress: foodStreetAddress,
            province: foodProvince,
            city: foodCity,
            category: foodCategory,
          });
          handleClose();
          alert("Donation updated successfully!");
        });
      });
  };

  db.collection("food")
    .where("name", "==", name)
    .where("streetAddress", "==", streetAddress)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        setDonationId(doc.id);
      });
    });

  return (
    <div style={{ paddingLeft: "30px" }}>
      {img ? (
        <img
          src={img || "https://via.placeholder.com/550"}
          alt="preview "
          style={{
            marginTop: "30px",
            marginBottom: "20px",
            width: "300px",
            height: "200px",
          }}
        />
      ) : (
        ""
      )}

      <p>Name: {name}</p>
      <p style={{ marginTop: "-10px" }}>Quantity: {quantity}</p>
      <p style={{ marginTop: "-10px" }}>Street Address: {streetAddress}</p>
      <p style={{ marginTop: "-10px" }}>Province: {province}</p>
      <p style={{ marginTop: "-10px" }}>City: {city}</p>
      <p style={{ marginTop: "-10px" }}>Category: {category}</p>
      <p style={{ marginTop: "-10px" }}>Status: {status}</p>
      <p style={{ marginTop: "-10px" }}>
        Date: {new Date(date).toDateString()}
      </p>

      {status == "active" ? (
        <>
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ height: "100vh" }}
          ></div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Donation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={(e) => handleSubmit(e)}>
                <TextField
                  style={{ backgroundColor: "#E5E5E5", marginBottom: "10px" }}
                  label="Food Name"
                  fullWidth
                  value={foodName}
                  inputProps={{ minLength: 3, maxLength: 20 }}
                  onChange={(e) => {
                    var letters = /^[a-zA-Z\s]*$/;
                    if (e.target.value === "" || letters.test(e.target.value)) {
                      setFoodName(e.target.value);
                    }
                  }}
                />
                <TextField
                  style={{ backgroundColor: "#E5E5E5", marginBottom: "10px" }}
                  label="Quantity"
                  fullWidth
                  value={foodQuantity}
                  inputProps={{ minLength: 1, maxLength: 50 }}
                  onChange={(e) => {
                    var letters = /^[A-Za-z0-9\s]*$/;
                    if (e.target.value === "" || letters.test(e.target.value)) {
                      setFoodQuantity(e.target.value);
                    }
                  }}
                />
                <TextField
                  style={{ backgroundColor: "#E5E5E5", marginBottom: "10px" }}
                  label="Street Address"
                  fullWidth
                  value={foodStreetAddress}
                  inputProps={{ minLength: 5, maxLength: 30 }}
                  onChange={(e) => {
                    var letters = /^[A-Za-z0-9\s]*$/;
                    if (e.target.value === "" || letters.test(e.target.value)) {
                      setFoodStreetAddress(e.target.value);
                    }
                  }}
                />
                <FormControl
                  style={{
                    backgroundColor: "#E5E5E5",
                    marginBottom: "10px",
                    minWidth: "466px",
                  }}
                >
                  <InputLabel htmlFor="province-simple" fullWidth>
                    Province
                  </InputLabel>
                  <Select
                    value={foodProvince}
                    onChange={(e) => {
                      setFoodProvince(e.target.value);
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
                  label="City"
                  fullWidth
                  value={foodCity}
                  inputProps={{ minLength: 3, maxLength: 15 }}
                  onChange={(e) => {
                    var letters = /^[A-Za-z]+$/;
                    if (e.target.value === "" || letters.test(e.target.value)) {
                      setFoodCity(e.target.value);
                    }
                  }}
                />
                <input
                  type="radio"
                  onChange={(e) => {
                    setFoodCategory(e.target.value);
                  }}
                  name="category"
                  value="cooked"
                  checked={foodCategory === "cooked"}
                />
                Cooked
                <input
                  type="radio"
                  onChange={(e) => {
                    setFoodCategory(e.target.value);
                  }}
                  name="category"
                  value="uncooked"
                  checked={foodCategory === "uncooked"}
                />
                Uncooked
                <Button
                  type="submit"
                  style={{
                    backgroundColor: "#2BB8C1",
                    color: "black",
                    borderRadius: "0.7rem",
                    marginTop: "8px",
                    marginLeft: "220px",
                  }}
                >
                  Update
                </Button>
              </form>
            </Modal.Body>
          </Modal>
          <Button
            type="submit"
            onClick={handleShow}
            style={{
              backgroundColor: "#2BB8C1",
              color: "black",
              borderRadius: "0.7rem",
              marginLeft: "60px",
              marginTop: "-1200px",
              paddingTop: "2px",
              paddingBottom: "2px",
              paddingLeft: "20px",
              paddingRight: "20px",
            }}
          >
            EDIT
          </Button>
        </>
      ) : (
        <></>
      )}

      {status == "active" ? (
        <Button
          type="submit"
          onClick={() => {
            db.collection("food")
              .where("name", "==", name)
              .where("streetAddress", "==", streetAddress)
              .get()
              .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                  doc.ref.update({
                    status: "inactive",
                  });
                  alert("Donation removed successfully!");
                });
              });
          }}
          style={{
            backgroundColor: "#2BB8C1",
            color: "black",
            borderRadius: "0.7rem",
            marginLeft: "10px",
            marginTop: "-1200px",
            paddingTop: "2px",
            paddingBottom: "2px",
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        >
          REMOVE
        </Button>
      ) : (
        <></>
      )}
      {status == "active" ? (
        <Button
          type="submit"
          onClick={() => {
            alert("Thank you for donating!");

            db.collection("receivedDonations").add({
              donorId: donorId,
              donationId: donationId,
              donationCategory: "food",
              date: firebase.firestore.Timestamp.now().toDate().toString(),
            });
            db.collection("food")
              .where("name", "==", name)
              .where("streetAddress", "==", streetAddress)
              .get()
              .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                  doc.ref.update({
                    status: "donated",
                  });
                });
              });
          }}
          style={{
            backgroundColor: "#2BB8C1",
            color: "black",
            borderRadius: "0.7rem",
            marginLeft: "-180px",
            marginTop: "-1120px",
            paddingTop: "2px",
            paddingBottom: "2px",
            paddingLeft: "60px",
            paddingRight: "55px",
          }}
        >
          DONATED
        </Button>
      ) : (
        <></>
      )}

      {status == "donated" ? (
        <Button
          onClick={() => {
            alert("We are glad you made a difference!");
          }}
          type="submit"
          style={{
            backgroundColor: "#2BB8C1",
            color: "black",
            borderRadius: "0.7rem",
            marginLeft: "90px",
          }}
        >
          THANK YOU!
        </Button>
      ) : (
        <></>
      )}

      {status == "inactive" ? (
        <Button
          type="submit"
          onClick={() => {
            var newDt = firebase.firestore.Timestamp.now().toDate().toString();
            var newExpiry = new Date(newDt);
            newExpiry.setDate(newExpiry.getDate() + 3);

            db.collection("food")
              .where("name", "==", name)
              .where("streetAddress", "==", streetAddress)
              .get()
              .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                  doc.ref.update({
                    status: "active",
                    expiry: newExpiry,
                  });
                  alert("Donation activated successfully!");
                });
              });
          }}
          style={{
            backgroundColor: "#2BB8C1",
            color: "black",
            borderRadius: "0.7rem",
            marginLeft: "90px",
          }}
        >
          ACTIVATE
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
};

const Frame2 = ({
  name,
  quantity,
  streetAddress,
  province,
  city,
  category,
  date,
  img,
  rating,
  description,
  size,
  brand,
  author,
  edition,
  otherCategory,
  status,
  donorId,
}) => {
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(null);
  const [hover, setHover] = useState(0);
  const [itemName, setItemName] = useState(name);
  const [itemQuantity, setItemQuantity] = useState(quantity);
  const [itemStreetAddress, setItemStreetAddress] = useState(streetAddress);
  const [itemProvince, setItemProvince] = useState(province);
  const [itemCity, setItemCity] = useState(city);
  const [itemCategory, setItemCategory] = useState(category);
  const [itemRating, setItemRating] = useState(rating);
  const [itemDescription, setItemDescription] = useState(description);
  const [itemSize, setItemSize] = useState(size);
  const [itemBrand, setItemBrand] = useState(brand);
  const [itemAuthor, setItemAuthor] = useState(author);
  const [itemEdition, setItemEdition] = useState(edition);
  const [itemOtherCategory, setItemOtherCategory] = useState(otherCategory);

  const [donationId, setDonationId] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (category === "furniture") {
      db.collection("usedItems")
        .where("name", "==", name)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            doc.ref.update({
              name: itemName,
              quantity: itemQuantity,
              streetAddress: itemStreetAddress,
              province: itemProvince,
              city: itemCity,
              category: itemCategory,
              rating: itemRating,
              description: itemDescription,
            });
            handleClose();
            alert("Donation updated successfully!");
          });
        });
    } else if (category === "clothes") {
      db.collection("usedItems")
        .where("name", "==", name)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            doc.ref.update({
              name: itemName,
              quantity: itemQuantity,
              streetAddress: itemStreetAddress,
              province: itemProvince,
              city: itemCity,
              category: itemCategory,
              rating: itemRating,
              size: itemSize,
              brand: itemBrand,
            });
            handleClose();
            alert("Donation updated successfully!");
          });
        });
    } else if (category === "books") {
      db.collection("usedItems")
        .where("name", "==", name)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            doc.ref.update({
              name: itemName,
              quantity: itemQuantity,
              streetAddress: itemStreetAddress,
              province: itemProvince,
              city: itemCity,
              category: itemCategory,
              rating: itemRating,
              author: itemAuthor,
              edition: itemEdition,
            });
            handleClose();
            alert("Donation updated successfully!");
          });
        });
    } else if (category === "other") {
      db.collection("usedItems")
        .where("name", "==", name)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            doc.ref.update({
              name: itemName,
              quantity: itemQuantity,
              streetAddress: itemStreetAddress,
              province: itemProvince,
              city: itemCity,
              category: itemCategory,
              rating: itemRating,
              otherCategory: itemOtherCategory,
            });
            handleClose();
            alert("Donation updated successfully!");
          });
        });
    }
  };

  db.collection("usedItems")
    .where("name", "==", name)
    .where("streetAddress", "==", streetAddress)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        setDonationId(doc.id);
      });
    });

  return (
    <div style={{ paddingLeft: "20px" }}>
      {img ? (
        <img
          src={img || "https://via.placeholder.com/550"}
          alt="preview "
          style={{
            marginTop: "30px",
            marginBottom: "20px",
            width: "300px",
            height: "200px",
          }}
        />
      ) : (
        ""
      )}

      <p>Name: {name}</p>
      <p style={{ marginTop: "-10px" }}>Quantity: {quantity}</p>
      <p style={{ marginTop: "-10px" }}>Street Address: {streetAddress}</p>
      <p style={{ marginTop: "-10px" }}>Province: {province}</p>
      <p style={{ marginTop: "-10px" }}>City: {city}</p>
      <p style={{ marginTop: "-10px" }}>Category: {category}</p>
      <p style={{ marginTop: "-10px" }}>Rating: {rating}</p>
      {category === "furniture" ? (
        <p style={{ marginTop: "-10px" }}>Description: {description}</p>
      ) : (
        <></>
      )}
      {category === "clothes" ? (
        <>
          <p style={{ marginTop: "-10px" }}>Size: {size}</p>
          <p style={{ marginTop: "-10px" }}>Brand: {brand}</p>
        </>
      ) : (
        <></>
      )}
      {category === "books" ? (
        <>
          <p style={{ marginTop: "-10px" }}>Author: {author}</p>
          <p style={{ marginTop: "-10px" }}>Edition: {edition}</p>
        </>
      ) : (
        <></>
      )}
      {category === "other" ? (
        <p style={{ marginTop: "-10px" }}>Other Category: {otherCategory}</p>
      ) : (
        <></>
      )}
      <p style={{ marginTop: "-10px" }}>Status: {status}</p>
      <p style={{ marginTop: "-10px" }}>
        Date: {new Date(date).toDateString()}
      </p>

      {status == "active" ? (
        <>
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ height: "100vh" }}
          ></div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Donation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={(e) => handleSubmit(e)}>
                <TextField
                  style={{ backgroundColor: "#E5E5E5", marginBottom: "10px" }}
                  label="Product Name"
                  fullWidth
                  value={itemName}
                  inputProps={{ minLength: 3, maxLength: 20 }}
                  onChange={(e) => {
                    var letters = /^[a-zA-Z\s]*$/;
                    if (e.target.value === "" || letters.test(e.target.value)) {
                      setItemName(e.target.value);
                    }
                  }}
                />
                <TextField
                  style={{ backgroundColor: "#E5E5E5", marginBottom: "10px" }}
                  label="Quantity"
                  fullWidth
                  value={itemQuantity}
                  inputProps={{ minLength: 1, maxLength: 50 }}
                  onChange={(e) => {
                    var letters = /^[A-Za-z0-9\s]*$/;
                    if (e.target.value === "" || letters.test(e.target.value)) {
                      setItemQuantity(e.target.value);
                    }
                  }}
                />
                <TextField
                  style={{ backgroundColor: "#E5E5E5", marginBottom: "10px" }}
                  label="Street Address"
                  fullWidth
                  value={itemStreetAddress}
                  inputProps={{ minLength: 5, maxLength: 30 }}
                  onChange={(e) => {
                    var letters = /^[A-Za-z0-9\s]*$/;
                    if (e.target.value === "" || letters.test(e.target.value)) {
                      setItemStreetAddress(e.target.value);
                    }
                  }}
                />
                <FormControl
                  style={{
                    backgroundColor: "#E5E5E5",
                    marginBottom: "10px",
                    minWidth: "466px",
                  }}
                >
                  <InputLabel htmlFor="province-simple" fullWidth>
                    Province
                  </InputLabel>
                  <Select
                    value={itemProvince}
                    onChange={(e) => {
                      setItemProvince(e.target.value);
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
                  label="City"
                  fullWidth
                  value={itemCity}
                  inputProps={{ minLength: 3, maxLength: 15 }}
                  onChange={(e) => {
                    var letters = /^[A-Za-z]+$/;
                    if (e.target.value === "" || letters.test(e.target.value)) {
                      setItemCity(e.target.value);
                    }
                  }}
                />
                <div style={{ paddingBottom: "7px" }}>
                  <p style={{ marginBottom: "2px" }}>Update product quality:</p>
                  {[...Array(5)].map((star, i) => {
                    const ratingValue = i + 1;
                    return (
                      <label>
                        <input
                          type="radio"
                          className="radioClass"
                          name="rating"
                          value={ratingValue}
                          onClick={() => setItemRating(ratingValue)}
                        />
                        <FaStar
                          className="star"
                          color={
                            ratingValue <= (hover || itemRating)
                              ? "#ffc107"
                              : "#D0D0D0"
                          }
                          size={30}
                          onMouseEnter={() => setHover(ratingValue)}
                          onMouseLeave={() => setHover(null)}
                        />
                      </label>
                    );
                  })}
                </div>
                <p style={{ marginBottom: "2px" }}>Update product category:</p>
                <input
                  type="radio"
                  onChange={(e) => {
                    setItemCategory(e.target.value);
                  }}
                  name="category"
                  value="furniture"
                  onClick={() => setActive("one")}
                  checked={itemCategory === "furniture"}
                />
                Furniture
                <input
                  type="radio"
                  onChange={(e) => {
                    setItemCategory(e.target.value);
                  }}
                  name="category"
                  onClick={() => setActive("two")}
                  value="clothes"
                  checked={itemCategory === "clothes"}
                />
                Clothes
                <input
                  type="radio"
                  onChange={(e) => {
                    setItemCategory(e.target.value);
                  }}
                  onClick={() => setActive("three")}
                  name="category"
                  value="books"
                  checked={itemCategory === "books"}
                />
                Books
                <input
                  type="radio"
                  onChange={(e) => {
                    setItemCategory(e.target.value);
                  }}
                  onClick={() => setActive("four")}
                  name="category"
                  value="other"
                  checked={itemCategory === "other"}
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
                      value={itemDescription}
                      inputProps={{ minLength: 3, maxLength: 30 }}
                      onChange={(e) => {
                        var letters = /^[a-zA-Z\s]*$/;
                        if (
                          e.target.value === "" ||
                          letters.test(e.target.value)
                        ) {
                          setItemDescription(e.target.value);
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
                      value={itemSize}
                      inputProps={{ minLength: 1, maxLength: 10 }}
                      onChange={(e) => {
                        var letters = /^[A-Za-z0-9\s]*$/;
                        if (
                          e.target.value === "" ||
                          letters.test(e.target.value)
                        ) {
                          setItemSize(e.target.value);
                        }
                      }}
                    />
                  )}{" "}
                  {active === "two" && (
                    <TextField
                      style={{
                        backgroundColor: "#E5E5E5",
                        marginBottom: "10px",
                      }}
                      fullWidth
                      label="Brand"
                      value={itemBrand}
                      inputProps={{ minLength: 3, maxLength: 15 }}
                      onChange={(e) => {
                        var letters = /^[a-zA-Z\s]*$/;
                        if (
                          e.target.value === "" ||
                          letters.test(e.target.value)
                        ) {
                          setItemBrand(e.target.value);
                        }
                      }}
                    />
                  )}
                  {active === "three" && (
                    <TextField
                      style={{ backgroundColor: "#E5E5E5", marginTop: "15px" }}
                      fullWidth
                      label="Author"
                      value={itemAuthor}
                      inputProps={{ minLength: 3, maxLength: 15 }}
                      onChange={(e) => {
                        var letters = /^[a-zA-Z\s]*$/;
                        if (
                          e.target.value === "" ||
                          letters.test(e.target.value)
                        ) {
                          setItemAuthor(e.target.value);
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
                      value={itemEdition}
                      inputProps={{ minLength: 3, maxLength: 15 }}
                      onChange={(e) => {
                        var letters = /^[A-Za-z0-9\s]*$/;
                        if (
                          e.target.value === "" ||
                          letters.test(e.target.value)
                        ) {
                          setItemEdition(e.target.value);
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
                      value={itemOtherCategory}
                      inputProps={{ minLength: 3, maxLength: 15 }}
                      onChange={(e) => {
                        var letters = /^[a-zA-Z\s]*$/;
                        if (
                          e.target.value === "" ||
                          letters.test(e.target.value)
                        ) {
                          setItemOtherCategory(e.target.value);
                        }
                      }}
                    />
                  )}
                </Grid>
                <Button
                  type="submit"
                  style={{
                    backgroundColor: "#2BB8C1",
                    color: "black",
                    borderRadius: "0.7rem",
                    marginTop: "8px",
                    marginLeft: "395px",
                  }}
                >
                  Update
                </Button>
              </form>
            </Modal.Body>
          </Modal>
          <Button
            type="submit"
            onClick={handleShow}
            style={{
              backgroundColor: "#2BB8C1",
              color: "black",
              borderRadius: "0.7rem",
              marginLeft: "60px",
              marginTop: "-1200px",
              paddingTop: "2px",
              paddingBottom: "2px",
              paddingLeft: "20px",
              paddingRight: "20px",
            }}
          >
            EDIT
          </Button>
        </>
      ) : (
        <></>
      )}

      {status == "active" ? (
        <Button
          type="submit"
          onClick={() => {
            db.collection("usedItems")
              .where("name", "==", name)
              .where("streetAddress", "==", streetAddress)
              .get()
              .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                  doc.ref.update({
                    status: "inactive",
                  });
                  alert("Donation removed successfully!");
                });
              });
          }}
          style={{
            backgroundColor: "#2BB8C1",
            color: "black",
            borderRadius: "0.7rem",
            marginLeft: "10px",
            marginTop: "-1200px",
            paddingTop: "2px",
            paddingBottom: "2px",
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        >
          REMOVE
        </Button>
      ) : (
        <></>
      )}
      {status == "active" ? (
        <Button
          type="submit"
          onClick={() => {
            db.collection("receivedDonations").add({
              donorId: donorId,
              donationId: donationId,
              donationCategory: "used item",
              date: firebase.firestore.Timestamp.now().toDate().toString(),
            });
            db.collection("usedItems")
              .where("name", "==", name)
              .where("streetAddress", "==", streetAddress)
              .get()
              .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                  doc.ref.update({
                    status: "donated",
                  });
                  alert("Thank you for donating!");
                });
              });
          }}
          style={{
            backgroundColor: "#2BB8C1",
            color: "black",
            borderRadius: "0.7rem",
            marginLeft: "-180px",
            marginTop: "-1120px",
            paddingTop: "2px",
            paddingBottom: "2px",
            paddingLeft: "60px",
            paddingRight: "55px",
          }}
        >
          DONATED
        </Button>
      ) : (
        <></>
      )}

      {status == "donated" ? (
        <Button
          onClick={() => {
            alert("We are glad you made a difference!");
          }}
          type="submit"
          style={{
            backgroundColor: "#2BB8C1",
            color: "black",
            borderRadius: "0.7rem",
            marginLeft: "90px",
          }}
        >
          THANK YOU!
        </Button>
      ) : (
        <></>
      )}

      {status == "inactive" ? (
        <Button
          type="submit"
          onClick={() => {
            var newDt = firebase.firestore.Timestamp.now().toDate().toString();
            var newExpiry = new Date(newDt);
            newExpiry.setDate(newExpiry.getDate() + 30);

            db.collection("usedItems")
              .where("name", "==", name)
              .where("streetAddress", "==", streetAddress)
              .get()
              .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                  doc.ref.update({
                    status: "active",
                    expiry: newExpiry,
                  });
                  alert("Donation activated successfully!");
                });
              });
          }}
          style={{
            backgroundColor: "#2BB8C1",
            color: "black",
            borderRadius: "0.7rem",
            marginLeft: "90px",
          }}
        >
          ACTIVATE
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
};
const Frame3 = ({
  bloodGroup,
  age,
  lastDonated,
  illness,
  currentMedication,
  vaccination,
  bloodTransfusion,
  smoking,
  province,
  city,
  date,
  img,
  status,
  donorId,
}) => {
  const [show, setShow] = useState(false);
  const [bloodBloodGroup, setBloodBloodGroup] = useState(bloodGroup);
  const [bloodAge, setBloodAge] = useState(age);
  const [bloodLastDonated, setBloodLastDonated] = useState(lastDonated);
  const [bloodIllness, setBloodIllness] = useState(illness);
  const [bloodCurrentMedication, setBloodCurrentMedication] =
    useState(currentMedication);
  const [bloodVaccination, setBloodVaccination] = useState(vaccination);
  const [bloodBloodTransfusion, setBloodBloodTransfusion] =
    useState(bloodTransfusion);
  const [bloodSmoking, setBloodSmoking] = useState(smoking);
  const [bloodProvince, setBloodProvince] = useState(province);
  const [bloodCity, setBloodCity] = useState(city);

  const [donationId, setDonationId] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    db.collection("blood")
      .where("bloodGroup", "==", bloodGroup)
      .where("age", "==", age)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.update({
            bloodGroup: bloodBloodGroup,
            age: bloodAge,
            lastDonated: bloodLastDonated,
            illness: bloodIllness,
            currentMedication: bloodCurrentMedication,
            vaccination: bloodVaccination,
            bloodTransfusion: bloodBloodTransfusion,
            smoking: bloodSmoking,
            province: bloodProvince,
            city: bloodCity,
          });
          handleClose();
          alert("Donation updated successfully!");
        });
      });
  };

  db.collection("blood")
    .where("bloodGroup", "==", bloodGroup)
    .where("age", "==", age)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        setDonationId(doc.id);
      });
    });

  return (
    <div style={{ paddingLeft: "20px" }}>
      {img ? (
        <img
          src={img || "https://via.placeholder.com/550"}
          alt="preview "
          style={{
            marginTop: "30px",
            marginBottom: "20px",
            width: "300px",
            height: "200px",
          }}
        />
      ) : (
        ""
      )}

      <p>Blood Group: {bloodGroup}</p>
      <p style={{ marginTop: "-10px" }}>Age: {age}</p>
      <p style={{ marginTop: "-10px" }}>Last Donated: {lastDonated}</p>
      <p style={{ marginTop: "-10px" }}>Illness: {illness}</p>
      <p style={{ marginTop: "-10px" }}>
        Current Medication: {currentMedication}
      </p>
      <p style={{ marginTop: "-10px" }}>Vaccination: {vaccination}</p>
      <p style={{ marginTop: "-10px" }}>
        Blood Transfusion: {bloodTransfusion}
      </p>
      <p style={{ marginTop: "-10px" }}>Smoking: {smoking}</p>
      <p style={{ marginTop: "-10px" }}>Province: {province}</p>
      <p style={{ marginTop: "-10px" }}>City: {city}</p>
      <p style={{ marginTop: "-10px" }}>Status: {status}</p>
      <p style={{ marginTop: "-10px" }}>
        Date: {new Date(date).toDateString()}
      </p>

      {status == "active" ? (
        <>
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ height: "100vh" }}
          ></div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Donation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={(e) => handleSubmit(e)}>
                <input
                  type="radio"
                  onChange={(e) => {
                    setBloodBloodGroup(e.target.value);
                  }}
                  name="bloodGroup"
                  value="A+"
                  checked={bloodBloodGroup === "A+"}
                />
                A+
                <input
                  type="radio"
                  onChange={(e) => {
                    setBloodBloodGroup(e.target.value);
                  }}
                  name="bloodGroup"
                  value="A-"
                  checked={bloodBloodGroup === "A-"}
                />
                A-
                <input
                  type="radio"
                  onChange={(e) => {
                    setBloodBloodGroup(e.target.value);
                  }}
                  name="bloodGroup"
                  value="B+"
                  checked={bloodBloodGroup === "B+"}
                />
                B+
                <input
                  type="radio"
                  onChange={(e) => {
                    setBloodBloodGroup(e.target.value);
                  }}
                  name="bloodGroup"
                  value="B-"
                  checked={bloodBloodGroup === "B-"}
                />
                B-
                <input
                  type="radio"
                  onChange={(e) => {
                    setBloodBloodGroup(e.target.value);
                  }}
                  name="bloodGroup"
                  value="AB+"
                  checked={bloodBloodGroup === "AB+"}
                />
                AB+
                <input
                  type="radio"
                  onChange={(e) => {
                    setBloodBloodGroup(e.target.value);
                  }}
                  name="bloodGroup"
                  value="AB-"
                  checked={bloodBloodGroup === "AB-"}
                />
                AB-
                <input
                  type="radio"
                  onChange={(e) => {
                    setBloodBloodGroup(e.target.value);
                  }}
                  name="bloodGroup"
                  value="O+"
                  checked={bloodBloodGroup === "O+"}
                />
                O+
                <input
                  type="radio"
                  onChange={(e) => {
                    setBloodBloodGroup(e.target.value);
                  }}
                  name="bloodGroup"
                  value="O-"
                  checked={bloodBloodGroup === "O-"}
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
                  value={bloodAge}
                  inputProps={{ minLength: 2, maxLength: 2 }}
                  onChange={(e) => {
                    const re =
                      /\b([1-9]|[1][8-9]|[23][0-9]|[45][0-9]|6[0-5])\b/;
                    if (e.target.value === "" || re.test(e.target.value)) {
                      setBloodAge(e.target.value);
                    }
                  }}
                />
                <TextField
                  style={{ backgroundColor: "#E5E5E5", marginBottom: "10px" }}
                  label="Last Donated (month/year)"
                  fullWidth
                  value={bloodLastDonated}
                  inputProps={{ maxLength: 9 }}
                  onChange={(e) => {
                    var letters = /^[0-9\b/]+$/;
                    if (e.target.value === "" || letters.test(e.target.value)) {
                      setBloodLastDonated(e.target.value);
                    }
                  }}
                />
                <TextField
                  style={{ backgroundColor: "#E5E5E5", marginBottom: "10px" }}
                  label="Illness (if any)"
                  fullWidth
                  value={bloodIllness}
                  inputProps={{ maxLength: 20 }}
                  onChange={(e) => {
                    var letters = /^[a-zA-Z\s]*$/;
                    if (e.target.value === "" || letters.test(e.target.value)) {
                      setBloodIllness(e.target.value);
                    }
                  }}
                />
                <TextField
                  style={{ backgroundColor: "#E5E5E5", marginBottom: "10px" }}
                  label="Current Medication (if any)"
                  fullWidth
                  value={bloodCurrentMedication}
                  inputProps={{ maxLength: 20 }}
                  onChange={(e) => {
                    var letters = /^[A-Za-z0-9\s]*$/;
                    if (e.target.value === "" || letters.test(e.target.value)) {
                      setBloodCurrentMedication(e.target.value);
                    }
                  }}
                />
                <TextField
                  style={{ backgroundColor: "#E5E5E5", marginBottom: "10px" }}
                  label="List your Vaccinations (if any)"
                  fullWidth
                  value={bloodVaccination}
                  inputProps={{ maxLength: 20 }}
                  onChange={(e) => {
                    var letters = /^[A-Za-z0-9\s]*$/;
                    if (e.target.value === "" || letters.test(e.target.value)) {
                      setBloodVaccination(e.target.value);
                    }
                  }}
                />
                <FormControl
                  style={{
                    backgroundColor: "#E5E5E5",
                    marginBottom: "10px",
                    minWidth: "466px",
                  }}
                >
                  <InputLabel fullWidth>
                    Have you ever received blood?
                  </InputLabel>
                  <Select
                    value={bloodBloodTransfusion}
                    onChange={(e) => {
                      setBloodBloodTransfusion(e.target.value);
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
                    minWidth: "466px",
                  }}
                >
                  <InputLabel fullWidth>Do you smoke?</InputLabel>
                  <Select
                    value={bloodSmoking}
                    onChange={(e) => {
                      setBloodSmoking(e.target.value);
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
                    minWidth: "466px",
                  }}
                >
                  <InputLabel htmlFor="province-simple" fullWidth>
                    Province
                  </InputLabel>
                  <Select
                    value={bloodProvince}
                    onChange={(e) => {
                      setBloodProvince(e.target.value);
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
                  label="City"
                  fullWidth
                  value={bloodCity}
                  inputProps={{ minLength: 3, maxLength: 15 }}
                  onChange={(e) => {
                    var letters = /^[A-Za-z]+$/;
                    if (e.target.value === "" || letters.test(e.target.value)) {
                      setBloodCity(e.target.value);
                    }
                  }}
                />
                <Button
                  type="submit"
                  style={{
                    backgroundColor: "#2BB8C1",
                    color: "black",
                    borderRadius: "0.7rem",
                    marginTop: "8px",
                    marginLeft: "395px",
                  }}
                >
                  Update
                </Button>
              </form>
            </Modal.Body>
          </Modal>
          <Button
            type="submit"
            onClick={handleShow}
            style={{
              backgroundColor: "#2BB8C1",
              color: "black",
              borderRadius: "0.7rem",
              marginLeft: "60px",
              marginTop: "-1200px",
              paddingTop: "2px",
              paddingBottom: "2px",
              paddingLeft: "20px",
              paddingRight: "20px",
            }}
          >
            EDIT
          </Button>
        </>
      ) : (
        <></>
      )}

      {status == "active" ? (
        <Button
          type="submit"
          onClick={() => {
            db.collection("blood")
              .where("bloodGroup", "==", bloodGroup)
              .where("age", "==", age)
              .get()
              .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                  doc.ref.update({
                    status: "inactive",
                  });
                  alert("Donation removed successfully!");
                });
              });
          }}
          style={{
            backgroundColor: "#2BB8C1",
            color: "black",
            borderRadius: "0.7rem",
            marginLeft: "10px",
            marginTop: "-1200px",
            paddingTop: "2px",
            paddingBottom: "2px",
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        >
          REMOVE
        </Button>
      ) : (
        <></>
      )}
      {status == "active" ? (
        <Button
          type="submit"
          onClick={() => {
            db.collection("receivedDonations").add({
              donorId: donorId,
              donationId: donationId,
              donationCategory: "blood",
              date: firebase.firestore.Timestamp.now().toDate().toString(),
            });
            db.collection("blood")
              .where("bloodGroup", "==", bloodGroup)
              .where("age", "==", age)
              .get()
              .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                  doc.ref.update({
                    status: "donated",
                  });
                  alert("Thank you for donating!");
                });
              });
          }}
          style={{
            backgroundColor: "#2BB8C1",
            color: "black",
            borderRadius: "0.7rem",
            marginLeft: "-180px",
            marginTop: "-1120px",
            paddingTop: "2px",
            paddingBottom: "2px",
            paddingLeft: "60px",
            paddingRight: "55px",
          }}
        >
          DONATED
        </Button>
      ) : (
        <></>
      )}

      {status == "donated" ? (
        <Button
          onClick={() => {
            alert("We are glad you made a difference!");
          }}
          type="submit"
          style={{
            backgroundColor: "#2BB8C1",
            color: "black",
            borderRadius: "0.7rem",
            marginLeft: "90px",
          }}
        >
          THANK YOU!
        </Button>
      ) : (
        <></>
      )}

      {status == "inactive" ? (
        <Button
          type="submit"
          onClick={() => {
            var newDt = firebase.firestore.Timestamp.now().toDate().toString();
            var newExpiry = new Date(newDt);
            newExpiry.setDate(newExpiry.getDate() + 60);

            db.collection("blood")
              .where("bloodGroup", "==", bloodGroup)
              .where("age", "==", age)
              .get()
              .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                  doc.ref.update({
                    status: "active",
                    expiry: newExpiry,
                  });
                  alert("Donation activated successfully!");
                });
              });
          }}
          style={{
            backgroundColor: "#2BB8C1",
            color: "black",
            borderRadius: "0.7rem",
            marginLeft: "90px",
          }}
        >
          ACTIVATE
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MyDonations;
