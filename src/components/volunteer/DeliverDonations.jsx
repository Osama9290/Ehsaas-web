import { db, auth } from "../../firebase";
import { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import firebase from "firebase";

const DeliverDonations = () => {
  const [foodInfo, setFoodInfo] = useState([]);
  const [itemInfo, setItemInfo] = useState([]);

  const [active, setActive] = useState("");
  const [filterCategory, setFilterCategory] = useState(false);

  const volRef = db.doc(`volunteer/${auth.currentUser.uid}`);

  useEffect(async () => {
    const volSnapshot = await volRef.get();
    const volProvince = volSnapshot.data().province;

    db.collection("interested")
      .where("via", "==", "delivery")
      .where("status", "==", "accepted")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          var donationData = element.data();

          db.collection("receiver")
            .where(
              firebase.firestore.FieldPath.documentId(),
              "==",
              element.data().receiverId
            )
            .get()
            .then((querySnapshot1) => {
              querySnapshot1.forEach((element1) => {
                var receiverData = element1.data();

                db.collection("food")
                  .where("province", "==", volProvince)
                  .where(
                    firebase.firestore.FieldPath.documentId(),
                    "==",
                    element.data().donationId
                  )
                  .get()
                  .then((querySnapshot2) => {
                    querySnapshot2.forEach((element2) => {
                      var foodData = element2.data();

                      db.collection("donor")
                        .where(
                          firebase.firestore.FieldPath.documentId(),
                          "==",
                          element.data().donorId
                        )
                        .get()
                        .then((querySnapshot3) => {
                          querySnapshot3.forEach((element3) => {
                            var donorData = element3.data();

                            setFoodInfo((arr) => [
                              ...arr,
                              {
                                donationData,
                                receiverData,
                                foodData,
                                donorData,
                              },
                            ]);
                          });
                        });
                    });
                  });
              });
            });

          db.collection("receiver")
            .where(
              firebase.firestore.FieldPath.documentId(),
              "==",
              element.data().receiverId
            )
            .get()
            .then((querySnapshot1) => {
              querySnapshot1.forEach((element1) => {
                var receiverData = element1.data();

                db.collection("usedItems")
                  .where("province", "==", volProvince)
                  .where(
                    firebase.firestore.FieldPath.documentId(),
                    "==",
                    element.data().donationId
                  )
                  .get()
                  .then((querySnapshot2) => {
                    querySnapshot2.forEach((element2) => {
                      var itemData = element2.data();

                      db.collection("donor")
                        .where(
                          firebase.firestore.FieldPath.documentId(),
                          "==",
                          element.data().donorId
                        )
                        .get()
                        .then((querySnapshot3) => {
                          querySnapshot3.forEach((element3) => {
                            var donorData = element3.data();

                            setItemInfo((arr) => [
                              ...arr,
                              {
                                donationData,
                                receiverData,
                                itemData,
                                donorData,
                              },
                            ]);
                          });
                        });
                    });
                  });
              });
            });
        });
      });
  }, []);

  const fetchFoodData = async () => {
    const volSnapshot = await volRef.get();
    const volProvince = volSnapshot.data().province;

    db.collection("interested")
      .where("via", "==", "delivery")
      .where("status", "==", "accepted")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          setFoodInfo([]);
          setItemInfo([]);
          var donationData = element.data();

          db.collection("receiver")
            .where(
              firebase.firestore.FieldPath.documentId(),
              "==",
              element.data().receiverId
            )
            .get()
            .then((querySnapshot1) => {
              querySnapshot1.forEach((element1) => {
                var receiverData = element1.data();

                db.collection("food")
                  .where("province", "==", volProvince)
                  .where(
                    firebase.firestore.FieldPath.documentId(),
                    "==",
                    element.data().donationId
                  )
                  .get()
                  .then((querySnapshot2) => {
                    querySnapshot2.forEach((element2) => {
                      var foodData = element2.data();

                      db.collection("donor")
                        .where(
                          firebase.firestore.FieldPath.documentId(),
                          "==",
                          element.data().donorId
                        )
                        .get()
                        .then((querySnapshot3) => {
                          querySnapshot3.forEach((element3) => {
                            var donorData = element3.data();

                            setFoodInfo((arr) => [
                              ...arr,
                              {
                                donationData,
                                receiverData,
                                foodData,
                                donorData,
                              },
                            ]);
                          });
                        });
                    });
                  });
              });
            });
        });
      });
  };

  const fetchItemData = async () => {
    const volSnapshot = await volRef.get();
    const volProvince = volSnapshot.data().province;

    db.collection("interested")
      .where("via", "==", "delivery")
      .where("status", "==", "accepted")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          setFoodInfo([]);
          setItemInfo([]);
          var donationData = element.data();

          db.collection("receiver")
            .where(
              firebase.firestore.FieldPath.documentId(),
              "==",
              element.data().receiverId
            )
            .get()
            .then((querySnapshot1) => {
              querySnapshot1.forEach((element1) => {
                var receiverData = element1.data();

                db.collection("usedItems")
                  .where("province", "==", volProvince)
                  .where(
                    firebase.firestore.FieldPath.documentId(),
                    "==",
                    element.data().donationId
                  )
                  .get()
                  .then((querySnapshot2) => {
                    querySnapshot2.forEach((element2) => {
                      var itemData = element2.data();

                      db.collection("donor")
                        .where(
                          firebase.firestore.FieldPath.documentId(),
                          "==",
                          element.data().donorId
                        )
                        .get()
                        .then((querySnapshot3) => {
                          querySnapshot3.forEach((element3) => {
                            var donorData = element3.data();

                            setItemInfo((arr) => [
                              ...arr,
                              {
                                donationData,
                                receiverData,
                                itemData,
                                donorData,
                              },
                            ]);
                          });
                        });
                    });
                  });
              });
            });
        });
      });
  };

  //LATEST TO OLD
  const latestToOld = async () => {
    const volSnapshot = await volRef.get();
    const volProvince = volSnapshot.data().province;

    db.collection("interested")
      .where("via", "==", "delivery")
      .where("status", "==", "accepted")
      .orderBy("date", "desc")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((element) => {
          setFoodInfo([]);
          setItemInfo([]);

          var donationData = element.data();

          db.collection("receiver")
            .where(
              firebase.firestore.FieldPath.documentId(),
              "==",
              element.data().receiverId
            )
            .get()
            .then((querySnapshot1) => {
              querySnapshot1.forEach((element1) => {
                var receiverData = element1.data();

                db.collection("food")
                  .where("province", "==", volProvince)
                  .where(
                    firebase.firestore.FieldPath.documentId(),
                    "==",
                    element.data().donationId
                  )
                  .get()
                  .then((querySnapshot2) => {
                    querySnapshot2.forEach((element2) => {
                      var foodData = element2.data();

                      db.collection("donor")
                        .where(
                          firebase.firestore.FieldPath.documentId(),
                          "==",
                          element.data().donorId
                        )
                        .get()
                        .then((querySnapshot3) => {
                          querySnapshot3.forEach((element3) => {
                            var donorData = element3.data();

                            setFoodInfo((arr) => [
                              ...arr,
                              {
                                donationData,
                                receiverData,
                                foodData,
                                donorData,
                              },
                            ]);
                          });
                        });
                    });
                  });
              });
            });

          db.collection("receiver")
            .where(
              firebase.firestore.FieldPath.documentId(),
              "==",
              element.data().receiverId
            )
            .get()
            .then((querySnapshot1) => {
              querySnapshot1.forEach((element1) => {
                var receiverData = element1.data();

                db.collection("usedItems")
                  .where("province", "==", volProvince)
                  .where(
                    firebase.firestore.FieldPath.documentId(),
                    "==",
                    element.data().donationId
                  )
                  .get()
                  .then((querySnapshot2) => {
                    querySnapshot2.forEach((element2) => {
                      var itemData = element2.data();

                      db.collection("donor")
                        .where(
                          firebase.firestore.FieldPath.documentId(),
                          "==",
                          element.data().donorId
                        )
                        .get()
                        .then((querySnapshot3) => {
                          querySnapshot3.forEach((element3) => {
                            var donorData = element3.data();

                            setItemInfo((arr) => [
                              ...arr,
                              {
                                donationData,
                                receiverData,
                                itemData,
                                donorData,
                              },
                            ]);
                          });
                        });
                    });
                  });
              });
            });
        });
      });
  };

  //OLD TO LATEST
  const oldToLatest = async () => {
    const volSnapshot = await volRef.get();
    const volProvince = volSnapshot.data().province;

    db.collection("interested")
      .where("via", "==", "delivery")
      .where("status", "==", "accepted")
      .where("date", "<", "dt")
      .orderBy("date")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((element) => {
          setFoodInfo([]);
          setItemInfo([]);

          var donationData = element.data();

          db.collection("receiver")
            .where("province", "==", volProvince)
            .where(
              firebase.firestore.FieldPath.documentId(),
              "==",
              element.data().receiverId
            )
            .get()
            .then((querySnapshot1) => {
              querySnapshot1.forEach((element1) => {
                var receiverData = element1.data();

                db.collection("food")
                  .where(
                    firebase.firestore.FieldPath.documentId(),
                    "==",
                    element.data().donationId
                  )
                  .get()
                  .then((querySnapshot2) => {
                    querySnapshot2.forEach((element2) => {
                      var foodData = element2.data();

                      db.collection("donor")
                        .where(
                          firebase.firestore.FieldPath.documentId(),
                          "==",
                          element.data().donorId
                        )
                        .get()
                        .then((querySnapshot3) => {
                          querySnapshot3.forEach((element3) => {
                            var donorData = element3.data();

                            setFoodInfo((arr) => [
                              ...arr,
                              {
                                donationData,
                                receiverData,
                                foodData,
                                donorData,
                              },
                            ]);
                          });
                        });
                    });
                  });
              });
            });

          db.collection("receiver")
            .where(
              firebase.firestore.FieldPath.documentId(),
              "==",
              element.data().receiverId
            )
            .get()
            .then((querySnapshot1) => {
              querySnapshot1.forEach((element1) => {
                var receiverData = element1.data();

                db.collection("usedItems")
                  .where("province", "==", volProvince)
                  .where(
                    firebase.firestore.FieldPath.documentId(),
                    "==",
                    element.data().donationId
                  )
                  .get()
                  .then((querySnapshot2) => {
                    querySnapshot2.forEach((element2) => {
                      var itemData = element2.data();

                      db.collection("donor")
                        .where(
                          firebase.firestore.FieldPath.documentId(),
                          "==",
                          element.data().donorId
                        )
                        .get()
                        .then((querySnapshot3) => {
                          querySnapshot3.forEach((element3) => {
                            var donorData = element3.data();

                            setItemInfo((arr) => [
                              ...arr,
                              {
                                donationData,
                                receiverData,
                                itemData,
                                donorData,
                              },
                            ]);
                          });
                        });
                    });
                  });
              });
            });
        });
      });
  };

  return (
    <Grid container spacing={2}>
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
          className="container"
          style={{
            textAlign: "center",
            paddingTop: "40px",
            paddingBottom: "20px",
            marginTop: "-40px",
          }}
        >
          Donations To Be Delivered
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
          {foodInfo.map((item) => (
            <Frame1
              name={item.foodData.name}
              quantity={item.foodData.quantity}
              streetAddress={item.foodData.streetAddress}
              province={item.foodData.province}
              city={item.foodData.city}
              category={item.foodData.category}
              img={item.foodData.img}
              donorId={item.foodData.donorId}
              receiverName={item.receiverData.name}
              receiverContact={item.receiverData.contactNo}
              donorName={item.donorData.name}
              donorContact={item.donorData.contactNo}
              receiverId={item.donationData.receiverId}
              date={item.donationData.date}
            />
          ))}

          {itemInfo.map((item) => (
            <Frame2
              name={item.itemData.name}
              quantity={item.itemData.quantity}
              streetAddress={item.itemData.streetAddress}
              province={item.itemData.province}
              city={item.itemData.city}
              category={item.itemData.category}
              img={item.itemData.img}
              donorId={item.itemData.donorId}
              rating={item.itemData.rating}
              description={item.itemData.description}
              size={item.itemData.size}
              brand={item.itemData.brand}
              author={item.itemData.author}
              edition={item.itemData.edition}
              otherCategory={item.itemData.otherCategory}
              receiverName={item.receiverData.name}
              receiverContact={item.receiverData.contactNo}
              donorName={item.donorData.name}
              donorContact={item.donorData.contactNo}
              receiverId={item.donationData.receiverId}
              date={item.donationData.date}
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
  img,
  donorName,
  donorContact,
  receiverName,
  receiverContact,
  receiverId,
  donorId,
  date,
}) => {
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
      <p style={{ textDecoration: "underline" }}>Receiver Information</p>
      <p style={{ marginTop: "-10px" }}>Name: {receiverName}</p>
      <p style={{ marginTop: "-10px" }}>Contact No: {receiverContact}</p>
      <p style={{ marginTop: "-10px" }}>
        Request Made: {new Date(date).toDateString()}
      </p>

      <p style={{ marginTop: "-10px", textDecoration: "underline" }}>
        Donation Information
      </p>
      <p style={{ marginTop: "-10px" }}>Name: {name}</p>
      <p style={{ marginTop: "-10px" }}>Quantity: {quantity}</p>
      <p style={{ marginTop: "-10px" }}>Street Address: {streetAddress}</p>
      <p style={{ marginTop: "-10px" }}>Province: {province}</p>
      <p style={{ marginTop: "-10px" }}>City: {city}</p>
      <p style={{ marginTop: "-10px" }}>Category: {category}</p>

      <p style={{ marginTop: "-10px", textDecoration: "underline" }}>
        Donor Information
      </p>
      <p style={{ marginTop: "-10px" }}>Name: {donorName}</p>
      <p style={{ marginTop: "-10px" }}>Contact No: {donorContact}</p>

      <Link to="/chat" style={{ textDecoration: "none" }}>
        <Button
          onClick={() => {
            alert("Kindly chat with the donor to coordinate.");

            db.collection("food")
              .where("name", "==", name)
              .where("streetAddress", "==", streetAddress)
              .get()
              .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                  var foodId = doc.id;
                  db.collection("delivery").add({
                    donationId: foodId,
                    volunteerId: db
                      .collection("volunteer")
                      .doc(auth.currentUser.uid),
                    donorId: donorId,
                    receiverId: receiverId,
                    donationCategory: "food",
                    status: "in progress",
                    date: firebase.firestore.Timestamp.now()
                      .toDate()
                      .toString(),
                  });
                });
              });
          }}
          type="submit"
          style={{
            backgroundColor: "#2BB8C1",
            color: "black",
            borderRadius: "0.7rem",
            textTransform: "capitalize",
            marginLeft: "100px",
          }}
        >
          DELIVER
        </Button>
      </Link>
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
  img,
  donorName,
  donorContact,
  receiverName,
  receiverContact,
  receiverId,
  donorId,
  date,
}) => {
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

      <p style={{ textDecoration: "underline" }}>Receiver Information</p>
      <p style={{ marginTop: "-10px" }}>Name: {receiverName}</p>
      <p style={{ marginTop: "-10px" }}>Contact No: {receiverContact}</p>
      <p style={{ marginTop: "-10px" }}>
        Request Made: {new Date(date).toDateString()}
      </p>

      <p style={{ marginTop: "-10px", textDecoration: "underline" }}>
        Donation Information
      </p>
      <p style={{ marginTop: "-10px" }}>Name: {name}</p>
      <p style={{ marginTop: "-10px" }}>Quantity: {quantity}</p>
      <p style={{ marginTop: "-10px" }}>Street Address: {streetAddress}</p>
      <p style={{ marginTop: "-10px" }}>Province: {province}</p>
      <p style={{ marginTop: "-10px" }}>City: {city}</p>
      <p style={{ marginTop: "-10px" }}>Category: {category}</p>

      <p style={{ marginTop: "-10px", textDecoration: "underline" }}>
        Donor Information
      </p>
      <p style={{ marginTop: "-10px" }}>Name: {donorName}</p>
      <p style={{ marginTop: "-10px" }}>Contact No: {donorContact}</p>

      <Link to="/chat" style={{ textDecoration: "none" }}>
        <Button
          onClick={() => {
            alert("Kindly chat with the donor to coordinate.");

            db.collection("usedItems")
              .where("name", "==", name)
              .where("streetAddress", "==", streetAddress)
              .get()
              .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                  var itemId = doc.id;
                  db.collection("delivery").add({
                    donationId: itemId,
                    volunteerId: db
                      .collection("volunteer")
                      .doc(auth.currentUser.uid),
                    donorId: donorId,
                    receiverId: receiverId,
                    donationCategory: "used item",
                    status: "in progress",
                    date: firebase.firestore.Timestamp.now()
                      .toDate()
                      .toString(),
                  });
                });
              });
          }}
          type="submit"
          style={{
            backgroundColor: "#2BB8C1",
            color: "black",
            borderRadius: "0.7rem",
            marginLeft: "100px",
          }}
        >
          DELIVER
        </Button>
      </Link>
    </div>
  );
};

export default DeliverDonations;
