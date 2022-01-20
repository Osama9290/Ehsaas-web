import { auth, db } from "../../firebase";
import { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import firebase from "firebase";
import { Link } from "react-router-dom";
import axios from "axios";

const ReceiveUsedItem = () => {
  const [itemInfo, setItemInfo] = useState([]);
  const [active, setActive] = useState("");
  const [filterCategory, setFilterCategory] = useState(false);

  const dt = firebase.firestore.Timestamp.now().toDate().toString();

  useEffect(async () => {
    db.collection("usedItems")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          var itemData = element.data();
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
                setItemInfo((arr) => [...arr, { itemData, donorData }]);
              });
            });
        });
      });
  }, []);

  //LATEST TO OLD
  const latestToOld = async () => {
    db.collection("usedItems")
      .orderBy("date", "desc")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((element) => {
          setItemInfo([]);
          var itemData = element.data();
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
                setItemInfo((arr) => [...arr, { itemData, donorData }]);
              });
            });
        });
      });
  };

  //OLD TO LATEST
  const oldToLatest = async () => {
    db.collection("usedItems")
      .where("date", "<", "dt")
      .orderBy("date")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((element) => {
          setItemInfo([]);
          var itemData = element.data();
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
                setItemInfo((arr) => [...arr, { itemData, donorData }]);
              });
            });
        });
      });
  };

  //CLOTHES
  const clothes = async () => {
    db.collection("usedItems")
      .where("category", "==", "clothes")
      .get()
      .then((querySnapshot) => {
        setItemInfo([]);
        querySnapshot.forEach((element) => {
          var itemData = element.data();
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
                setItemInfo((arr) => [...arr, { itemData, donorData }]);
              });
            });
        });
      });
  };

  //FURNITURE
  const furniture = async () => {
    db.collection("usedItems")
      .where("category", "==", "furniture")
      .get()
      .then((querySnapshot) => {
        setItemInfo([]);
        querySnapshot.forEach((element) => {
          var itemData = element.data();
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
                setItemInfo((arr) => [...arr, { itemData, donorData }]);
              });
            });
        });
      });
  };

  //BOOKS
  const books = async () => {
    db.collection("usedItems")
      .where("category", "==", "books")
      .get()
      .then((querySnapshot) => {
        setItemInfo([]);
        querySnapshot.forEach((element) => {
          var itemData = element.data();
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
                setItemInfo((arr) => [...arr, { itemData, donorData }]);
              });
            });
        });
      });
  };

  //OTHER
  const other = async () => {
    db.collection("usedItems")
      .where("category", "==", "other")
      .get()
      .then((querySnapshot) => {
        setItemInfo([]);
        querySnapshot.forEach((element) => {
          var itemData = element.data();
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
                setItemInfo((arr) => [...arr, { itemData, donorData }]);
              });
            });
        });
      });
  };

  const punjab = async () => {
    db.collection("usedItems")
      .where("province", "==", "Punjab")
      .get()
      .then((querySnapshot) => {
        setItemInfo([]);
        querySnapshot.forEach((element) => {
          var itemData = element.data();
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
                setItemInfo((arr) => [...arr, { itemData, donorData }]);
              });
            });
        });
      });
  };

  //SINDH
  const sindh = async () => {
    db.collection("usedItems")
      .where("province", "==", "Sindh")
      .get()
      .then((querySnapshot) => {
        setItemInfo([]);
        querySnapshot.forEach((element) => {
          var itemData = element.data();
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
                setItemInfo((arr) => [...arr, { itemData, donorData }]);
              });
            });
        });
      });
  };

  //KHYBER PAKHTUNKHWA
  const kpk = async () => {
    db.collection("usedItems")
      .where("province", "==", "Khyber Pakhtunkhwa")
      .get()
      .then((querySnapshot) => {
        setItemInfo([]);
        querySnapshot.forEach((element) => {
          var itemData = element.data();
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
                setItemInfo((arr) => [...arr, { itemData, donorData }]);
              });
            });
        });
      });
  };

  //BALOCHISTAN
  const balochistan = async () => {
    db.collection("usedItems")
      .where("province", "==", "Balochistan")
      .get()
      .then((querySnapshot) => {
        setItemInfo([]);
        querySnapshot.forEach((element) => {
          var itemData = element.data();
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
                setItemInfo((arr) => [...arr, { itemData, donorData }]);
              });
            });
        });
      });
  };

  //AZAD KASHMIR
  const kashmir = async () => {
    db.collection("usedItems")
      .where("province", "==", "Azad Kashmir")
      .get()
      .then((querySnapshot) => {
        setItemInfo([]);
        querySnapshot.forEach((element) => {
          var itemData = element.data();
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
                setItemInfo((arr) => [...arr, { itemData, donorData }]);
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
          Used Item Donations
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
          {itemInfo.map((item) => (
            <Frame2
              name={item.itemData.name}
              quantity={item.itemData.quantity}
              streetAddress={item.itemData.streetAddress}
              province={item.itemData.province}
              city={item.itemData.city}
              category={item.itemData.category}
              date={item.itemData.date}
              img={item.itemData.img}
              rating={item.itemData.rating}
              description={item.itemData.description}
              size={item.itemData.size}
              brand={item.itemData.brand}
              author={item.itemData.author}
              edition={item.itemData.edition}
              otherCategory={item.itemData.otherCategory}
              donorId={item.itemData.donorId}
              status={item.itemData.status}
              donorName={item.donorData.name}
              donorContact={item.donorData.contactNo}
              donorEmail={item.donorData.email}
            />
          ))}
        </Grid>

        <Grid item xs={2}>
          <p>Filter by:</p>

          <p>Sub Category</p>
          <div style={{ flex: "1", flexDirection: "column" }}>
            <input
              type="checkbox"
              onChange={() => {
                setFilterCategory("clothes");
              }}
              onClick={() => {
                clothes();
                setActive("clothes");
              }}
              checked={filterCategory === "clothes"}
            />
            Clothes
          </div>
          <div style={{ flex: "1", flexDirection: "column" }}>
            <input
              type="checkbox"
              onChange={() => {
                setFilterCategory("furniture");
              }}
              onClick={() => {
                furniture();
                setActive("furniture");
              }}
              checked={filterCategory === "furniture"}
            />
            Furniture
          </div>
          <div style={{ flex: "1", flexDirection: "column" }}>
            <input
              type="checkbox"
              onChange={() => {
                setFilterCategory("books");
              }}
              onClick={() => {
                books();
                setActive("books");
              }}
              checked={filterCategory === "books"}
            />
            Books
          </div>
          <div style={{ flex: "1", flexDirection: "column" }}>
            <input
              type="checkbox"
              onChange={() => {
                setFilterCategory("other");
              }}
              onClick={() => {
                other();
                setActive("other");
              }}
              checked={filterCategory === "other"}
            />
            Other
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

              db.collection("usedItems")
                .where("name", "==", name)
                .where("streetAddress", "==", streetAddress)
                .get()
                .then(function (querySnapshot) {
                  querySnapshot.forEach(function (doc) {
                    var itemId = doc.id;
                    db.collection("interested").add({
                      donationId: itemId,
                      receiverId: db
                        .collection("receiver")
                        .doc(auth.currentUser.uid),
                      donorId: donorId,
                      via: "delivery",
                      donationCategory: "used item",
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

              db.collection("usedItems")
                .where("name", "==", name)
                .where("streetAddress", "==", streetAddress)
                .get()
                .then(function (querySnapshot) {
                  querySnapshot.forEach(function (doc) {
                    var itemId = doc.id;
                    db.collection("interested").add({
                      donationId: itemId,
                      receiverId: db
                        .collection("receiver")
                        .doc(auth.currentUser.uid),
                      donorId: donorId,
                      via: "pickup",
                      donationCategory: "used item",
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

export default ReceiveUsedItem;
