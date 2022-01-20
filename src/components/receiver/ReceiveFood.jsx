import { db, auth } from "../../firebase";
import { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import firebase from "firebase";
import { Link } from "react-router-dom";
import axios from "axios";

const ReceiveFood = () => {
  const [foodInfo, setFoodInfo] = useState([]);

  const [active, setActive] = useState("");
  const [filterCategory, setFilterCategory] = useState(false);

  const dt = firebase.firestore.Timestamp.now().toDate().toString();

  useEffect(async () => {
    db.collection("food")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          var foodData = element.data();
          db.collection("donor")
            .where(
              firebase.firestore.FieldPath.documentId(),
              "==",
              element.data().donorId
            )
            .get()
            .then((querySnapshot1) => {
              querySnapshot1.forEach((element1) => {
                var donorData = element1.data();
                setFoodInfo((arr) => [...arr, { foodData, donorData }]);
              });
            });
        });
      });
  }, []);

  //LATEST TO OLD
  const latestToOld = async () => {
    db.collection("food")
      .orderBy("date", "desc")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((element) => {
          setFoodInfo([]);
          var foodData = element.data();
          db.collection("donor")
            .where(
              firebase.firestore.FieldPath.documentId(),
              "==",
              element.data().donorId
            )
            .get()
            .then((querySnapshot1) => {
              querySnapshot1.forEach((element1) => {
                var donorData = element1.data();
                setFoodInfo((arr) => [...arr, { foodData, donorData }]);
              });
            });
        });
      });
  };

  //OLD TO LATEST
  const oldToLatest = async () => {
    db.collection("food")
      .where("date", "<", "dt")
      .orderBy("date")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((element) => {
          setFoodInfo([]);
          var foodData = element.data();
          db.collection("donor")
            .where(
              firebase.firestore.FieldPath.documentId(),
              "==",
              element.data().donorId
            )
            .get()
            .then((querySnapshot1) => {
              querySnapshot1.forEach((element1) => {
                var donorData = element1.data();
                setFoodInfo((arr) => [...arr, { foodData, donorData }]);
              });
            });
        });
      });
  };

  const cooked = async () => {
    db.collection("food")
      .where("category", "==", "cooked")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((element) => {
          setFoodInfo([]);
          var foodData = element.data();
          db.collection("donor")
            .where(
              firebase.firestore.FieldPath.documentId(),
              "==",
              element.data().donorId
            )
            .get()
            .then((querySnapshot1) => {
              querySnapshot1.forEach((element1) => {
                var donorData = element1.data();
                setFoodInfo((arr) => [...arr, { foodData, donorData }]);
              });
            });
        });
      });
  };

  //uncooked
  const unCooked = async () => {
    db.collection("food")
      .where("category", "==", "uncooked")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((element) => {
          setFoodInfo([]);
          var foodData = element.data();
          db.collection("donor")
            .where(
              firebase.firestore.FieldPath.documentId(),
              "==",
              element.data().donorId
            )
            .get()
            .then((querySnapshot1) => {
              querySnapshot1.forEach((element1) => {
                var donorData = element1.data();
                setFoodInfo((arr) => [...arr, { foodData, donorData }]);
              });
            });
        });
      });
  };

  //PUNJAB
  const punjab = async () => {
    db.collection("food")
      .where("province", "==", "Punjab")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          setFoodInfo([]);
          var foodData = element.data();
          db.collection("donor")
            .where(
              firebase.firestore.FieldPath.documentId(),
              "==",
              element.data().donorId
            )
            .get()
            .then((querySnapshot1) => {
              querySnapshot1.forEach((element1) => {
                var donorData = element1.data();
                setFoodInfo((arr) => [...arr, { foodData, donorData }]);
              });
            });
        });
      });
  };

  //SINDH
  const sindh = async () => {
    db.collection("food")
      .where("province", "==", "Sindh")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          setFoodInfo([]);
          var foodData = element.data();
          db.collection("donor")
            .where(
              firebase.firestore.FieldPath.documentId(),
              "==",
              element.data().donorId
            )
            .get()
            .then((querySnapshot1) => {
              querySnapshot1.forEach((element1) => {
                var donorData = element1.data();
                setFoodInfo((arr) => [...arr, { foodData, donorData }]);
              });
            });
        });
      });
  };

  //KHYBER PAKHTUNKHWA
  const kpk = async () => {
    db.collection("food")
      .where("province", "==", "Khyber Pakhtunkhwa")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          setFoodInfo([]);
          var foodData = element.data();
          db.collection("donor")
            .where(
              firebase.firestore.FieldPath.documentId(),
              "==",
              element.data().donorId
            )
            .get()
            .then((querySnapshot1) => {
              querySnapshot1.forEach((element1) => {
                var donorData = element1.data();
                setFoodInfo((arr) => [...arr, { foodData, donorData }]);
              });
            });
        });
      });
  };

  //BALOCHISTAN
  const balochistan = async () => {
    db.collection("food")
      .where("province", "==", "Balochistan")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          setFoodInfo([]);
          var foodData = element.data();
          db.collection("donor")
            .where(
              firebase.firestore.FieldPath.documentId(),
              "==",
              element.data().donorId
            )
            .get()
            .then((querySnapshot1) => {
              querySnapshot1.forEach((element1) => {
                var donorData = element1.data();
                setFoodInfo((arr) => [...arr, { foodData, donorData }]);
              });
            });
        });
      });
  };

  //AZAD KASHMIR
  const kashmir = async () => {
    db.collection("food")
      .where("province", "==", "Azad Kashmir")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          setFoodInfo([]);
          var foodData = element.data();
          db.collection("donor")
            .where(
              firebase.firestore.FieldPath.documentId(),
              "==",
              element.data().donorId
            )
            .get()
            .then((querySnapshot1) => {
              querySnapshot1.forEach((element1) => {
                var donorData = element1.data();
                setFoodInfo((arr) => [...arr, { foodData, donorData }]);
              });
            });
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
            paddingBottom: "20px",
          }}
        >
          Food Donations
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
          {foodInfo.map((item) => (
            <Frame1
              name={item.foodData.name}
              quantity={item.foodData.quantity}
              streetAddress={item.foodData.streetAddress}
              province={item.foodData.province}
              city={item.foodData.city}
              category={item.foodData.category}
              date={item.foodData.date}
              img={item.foodData.img}
              donorId={item.foodData.donorId}
              status={item.foodData.status}
              donorName={item.donorData.name}
              donorContact={item.donorData.contactNo}
              donorEmail={item.donorData.email}
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
                setFilterCategory("cooked");
              }}
              onClick={() => {
                cooked();
                setActive("cooked");
              }}
              checked={filterCategory === "cooked"}
            />
            Cooked
          </div>
          <div style={{ flex: "1", flexDirection: "column" }}>
            <input
              type="checkbox"
              onChange={() => {
                setFilterCategory("uncooked");
              }}
              onClick={() => {
                unCooked();
                setActive("uncooked");
              }}
              checked={filterCategory === "uncooked"}
            />
            Uncooked
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
  donorName,
  donorContact,
  donorEmail,
}) => {
  var receiverName;
  var receiverContact;

  const link = "http://localhost:3000/chat";

  const fetch = async () => {
    const receiverRef = db.doc(`receiver/${auth.currentUser.uid}`);
    const receiverReff = await receiverRef.get();
    receiverName = receiverReff.data().name;
    receiverContact = receiverReff.data().contactNo;

    await axios.post("http://localhost:2000/donor-donation-email/", {
      t: donorEmail,
      l: link,
      r: receiverName,
      rc: receiverContact,
      n: name,
      q: quantity,
      st: streetAddress,
      cg: category,
      p: province,
      c: city,
      d: donorName,
    });
  };

  if (status == "active") {
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

        <p style={{ textDecoration: "underline" }}>Donation Information</p>
        <p style={{ marginTop: "-10px" }}>Name: {name}</p>
        <p style={{ marginTop: "-10px" }}>Quantity: {quantity}</p>
        <p style={{ marginTop: "-10px" }}>Street Address: {streetAddress}</p>
        <p style={{ marginTop: "-10px" }}>Province: {province}</p>
        <p style={{ marginTop: "-10px" }}>City: {city}</p>
        <p style={{ marginTop: "-10px" }}>Category: {category}</p>
        <p style={{ marginTop: "-10px" }}>
          Date: {new Date(date).toDateString()}
        </p>
        <p style={{ marginTop: "-10px", textDecoration: "underline" }}>
          Donor Information
        </p>
        <p style={{ marginTop: "-10px" }}>Name: {donorName}</p>
        <p style={{ marginTop: "-10px" }}>Contact No: {donorContact}</p>
        <Link to="/chat" style={{ textDecoration: "none" }}>
          <Button
            onClick={async () => {
              alert(
                "The donor has been notified of your interest. You will receive an email and message if he/she accepts your request."
              );

              db.collection("food")
                .where("name", "==", name)
                .where("streetAddress", "==", streetAddress)
                .get()
                .then(function (querySnapshot) {
                  querySnapshot.forEach(function (doc) {
                    var foodId = doc.id;
                    db.collection("interested").add({
                      donationId: foodId,
                      receiverId: db
                        .collection("receiver")
                        .doc(auth.currentUser.uid),
                      donorId: donorId,
                      via: "delivery",
                      donationCategory: "food",
                      status: "in progress",
                      date: firebase.firestore.Timestamp.now()
                        .toDate()
                        .toString(),
                    });
                  });
                });

              fetch(
                donorEmail,
                link,
                name,
                quantity,
                streetAddress,
                category,
                province,
                city,
                donorName
              );
            }}
            type="submit"
            style={{
              backgroundColor: "#2BB8C1",
              color: "black",
              borderRadius: "0.7rem",
              textTransform: "capitalize",
              marginLeft: "65px",
            }}
          >
            DELIVERY
          </Button>
          <Button
            type="submit"
            style={{
              backgroundColor: "#2BB8C1",
              color: "black",
              borderRadius: "0.7rem",
              textTransform: "capitalize",
              marginLeft: "10px",
            }}
            onClick={() => {
              alert(
                "The donor has been notified of your interest. You will receive an email and message if he/she accepts your request."
              );

              db.collection("food")
                .where("name", "==", name)
                .where("streetAddress", "==", streetAddress)
                .get()
                .then(function (querySnapshot) {
                  querySnapshot.forEach(function (doc) {
                    var foodId = doc.id;
                    db.collection("interested").add({
                      donationId: foodId,
                      receiverId: db
                        .collection("receiver")
                        .doc(auth.currentUser.uid),
                      donorId: donorId,
                      via: "pickup",
                      donationCategory: "food",
                      status: "in progress",
                      date: firebase.firestore.Timestamp.now()
                        .toDate()
                        .toString(),
                    });
                  });
                });

              fetch(
                donorEmail,
                link,
                name,
                quantity,
                streetAddress,
                category,
                province,
                city,
                donorName
              );
            }}
          >
            PICKUP
          </Button>
        </Link>
      </div>
    );
  } else {
    return null;
  }
};

export default ReceiveFood;
