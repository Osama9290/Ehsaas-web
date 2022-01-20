import { db } from "../../firebase";
import { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import firebase from "firebase";

const ReceivedDonations = () => {
  const [foodInfo, setFoodInfo] = useState([]);
  const [itemInfo, setItemInfo] = useState([]);
  const [bloodInfo, setBloodInfo] = useState([]);

  const [active, setActive] = useState("");
  const [filterCategory, setFilterCategory] = useState(false);

  const dt = firebase.firestore.Timestamp.now().toDate().toString();

  useEffect(async () => {
    var receiverData;
    db.collection("receivedDonations")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          var donationData = element.data();

          db.collection("interested")
            .where("status", "==", "accepted")
            .where("donationCategory", "==", "food")
            .where("donationId", "==", element.data().donationId)
            .get()
            .then((querySnapshot1) => {
              querySnapshot1.forEach((element1) => {
                db.collection("receiver")
                  .where(
                    firebase.firestore.FieldPath.documentId(),
                    "==",
                    element1.data().receiverId
                  )
                  .get()
                  .then((querySnapshot2) => {
                    querySnapshot2.forEach((element2) => {
                      receiverData = element2.data();
                    });
                  });

                db.collection("food")
                  .where(
                    firebase.firestore.FieldPath.documentId(),
                    "==",
                    element1.data().donationId
                  )
                  .get()
                  .then((querySnapshot3) => {
                    querySnapshot3.forEach((element3) => {
                      var foodData = element3.data();

                      setFoodInfo((arr) => [
                        ...arr,
                        { donationData, receiverData, foodData },
                      ]);
                    });
                  });
              });
            });

          db.collection("interested")
            .where("status", "==", "accepted")
            .where("donationCategory", "==", "used item")
            .where("donationId", "==", element.data().donationId)
            .get()
            .then((querySnapshot1) => {
              querySnapshot1.forEach((element1) => {
                db.collection("receiver")
                  .where(
                    firebase.firestore.FieldPath.documentId(),
                    "==",
                    element1.data().receiverId
                  )
                  .get()
                  .then((querySnapshot2) => {
                    querySnapshot2.forEach((element2) => {
                      receiverData = element2.data();
                    });
                  });

                db.collection("usedItems")
                  .where(
                    firebase.firestore.FieldPath.documentId(),
                    "==",
                    element1.data().donationId
                  )
                  .get()
                  .then((querySnapshot3) => {
                    querySnapshot3.forEach((element3) => {
                      var itemData = element3.data();

                      setItemInfo((arr) => [
                        ...arr,
                        { donationData, receiverData, itemData },
                      ]);
                    });
                  });
              });
            });

          db.collection("interested")
            .where("status", "==", "accepted")
            .where("donationCategory", "==", "blood")
            .where("donationId", "==", element.data().donationId)
            .get()
            .then((querySnapshot1) => {
              querySnapshot1.forEach((element1) => {
                db.collection("receiver")
                  .where(
                    firebase.firestore.FieldPath.documentId(),
                    "==",
                    element1.data().receiverId
                  )
                  .get()
                  .then((querySnapshot2) => {
                    querySnapshot2.forEach((element2) => {
                      receiverData = element2.data();
                    });
                  });

                db.collection("blood")
                  .where(
                    firebase.firestore.FieldPath.documentId(),
                    "==",
                    element1.data().donationId
                  )
                  .get()
                  .then((querySnapshot3) => {
                    querySnapshot3.forEach((element3) => {
                      var bloodData = element3.data();

                      setBloodInfo((arr) => [
                        ...arr,
                        { donationData, receiverData, bloodData },
                      ]);
                    });
                  });
              });
            });
        });
      });
  }, []);

  const fetchFoodData = async () => {
    var receiverData;
    db.collection("receivedDonations")
      .get()
      .then((querySnapshot) => {
        setFoodInfo([]);
        setItemInfo([]);
        setBloodInfo([]);
        querySnapshot.forEach((element) => {
          var donationData = element.data();

          db.collection("interested")
            .where("status", "==", "accepted")
            .where("donationCategory", "==", "food")
            .where("donationId", "==", element.data().donationId)
            .get()
            .then((querySnapshot1) => {
              querySnapshot1.forEach((element1) => {
                db.collection("receiver")
                  .where(
                    firebase.firestore.FieldPath.documentId(),
                    "==",
                    element1.data().receiverId
                  )
                  .get()
                  .then((querySnapshot2) => {
                    querySnapshot2.forEach((element2) => {
                      receiverData = element2.data();
                    });
                  });

                db.collection("food")
                  .where(
                    firebase.firestore.FieldPath.documentId(),
                    "==",
                    element1.data().donationId
                  )
                  .get()
                  .then((querySnapshot3) => {
                    querySnapshot3.forEach((element3) => {
                      var foodData = element3.data();

                      setFoodInfo((arr) => [
                        ...arr,
                        { donationData, receiverData, foodData },
                      ]);
                    });
                  });
              });
            });
        });
      });
  };

  const fetchItemData = async () => {
    var receiverData;
    db.collection("receivedDonations")
      .get()
      .then((querySnapshot) => {
        setFoodInfo([]);
        setItemInfo([]);
        setBloodInfo([]);
        querySnapshot.forEach((element) => {
          var donationData = element.data();

          db.collection("interested")
            .where("status", "==", "accepted")
            .where("donationCategory", "==", "used item")
            .where("donationId", "==", element.data().donationId)
            .get()
            .then((querySnapshot1) => {
              querySnapshot1.forEach((element1) => {
                db.collection("receiver")
                  .where(
                    firebase.firestore.FieldPath.documentId(),
                    "==",
                    element1.data().receiverId
                  )
                  .get()
                  .then((querySnapshot2) => {
                    querySnapshot2.forEach((element2) => {
                      receiverData = element2.data();
                    });
                  });

                db.collection("usedItems")
                  .where(
                    firebase.firestore.FieldPath.documentId(),
                    "==",
                    element1.data().donationId
                  )
                  .get()
                  .then((querySnapshot3) => {
                    querySnapshot3.forEach((element3) => {
                      var itemData = element3.data();

                      setItemInfo((arr) => [
                        ...arr,
                        { donationData, receiverData, itemData },
                      ]);
                    });
                  });
              });
            });
        });
      });
  };

  const fetchBloodData = async () => {
    var receiverData;
    db.collection("receivedDonations")
      .get()
      .then((querySnapshot) => {
        setFoodInfo([]);
        setItemInfo([]);
        setBloodInfo([]);
        querySnapshot.forEach((element) => {
          var donationData = element.data();

          db.collection("interested")
            .where("status", "==", "accepted")
            .where("donationCategory", "==", "blood")
            .where("donationId", "==", element.data().donationId)
            .get()
            .then((querySnapshot1) => {
              querySnapshot1.forEach((element1) => {
                db.collection("receiver")
                  .where(
                    firebase.firestore.FieldPath.documentId(),
                    "==",
                    element1.data().receiverId
                  )
                  .get()
                  .then((querySnapshot2) => {
                    querySnapshot2.forEach((element2) => {
                      receiverData = element2.data();
                    });
                  });

                db.collection("blood")
                  .where(
                    firebase.firestore.FieldPath.documentId(),
                    "==",
                    element1.data().donationId
                  )
                  .get()
                  .then((querySnapshot3) => {
                    querySnapshot3.forEach((element3) => {
                      var bloodData = element3.data();

                      setBloodInfo((arr) => [
                        ...arr,
                        { donationData, receiverData, bloodData },
                      ]);
                    });
                  });
              });
            });
        });
      });
  };

  //LATEST TO OLD
  const latestToOld = async () => {
    var receiverData;
    db.collection("receivedDonations")
      .orderBy("date", "desc")
      .onSnapshot((querySnapshot) => {
        setFoodInfo([]);
        setItemInfo([]);
        setBloodInfo([]);
        querySnapshot.forEach((element) => {
          var donationData = element.data();

          db.collection("interested")
            .where("status", "==", "accepted")
            .where("donationCategory", "==", "food")
            .where("donationId", "==", element.data().donationId)
            .get()
            .then((querySnapshot1) => {
              querySnapshot1.forEach((element1) => {
                db.collection("receiver")
                  .where(
                    firebase.firestore.FieldPath.documentId(),
                    "==",
                    element1.data().receiverId
                  )
                  .get()
                  .then((querySnapshot2) => {
                    querySnapshot2.forEach((element2) => {
                      receiverData = element2.data();
                    });
                  });

                db.collection("food")
                  .where(
                    firebase.firestore.FieldPath.documentId(),
                    "==",
                    element1.data().donationId
                  )
                  .get()
                  .then((querySnapshot3) => {
                    querySnapshot3.forEach((element3) => {
                      var foodData = element3.data();

                      setFoodInfo((arr) => [
                        ...arr,
                        { donationData, receiverData, foodData },
                      ]);
                    });
                  });
              });
            });

          db.collection("interested")
            .where("status", "==", "accepted")
            .where("donationCategory", "==", "used item")
            .where("donationId", "==", element.data().donationId)
            .get()
            .then((querySnapshot1) => {
              querySnapshot1.forEach((element1) => {
                db.collection("receiver")
                  .where(
                    firebase.firestore.FieldPath.documentId(),
                    "==",
                    element1.data().receiverId
                  )
                  .get()
                  .then((querySnapshot2) => {
                    querySnapshot2.forEach((element2) => {
                      receiverData = element2.data();
                    });
                  });

                db.collection("usedItems")
                  .where(
                    firebase.firestore.FieldPath.documentId(),
                    "==",
                    element1.data().donationId
                  )
                  .get()
                  .then((querySnapshot3) => {
                    querySnapshot3.forEach((element3) => {
                      var itemData = element3.data();

                      setItemInfo((arr) => [
                        ...arr,
                        { donationData, receiverData, itemData },
                      ]);
                    });
                  });
              });
            });

          db.collection("interested")
            .where("status", "==", "accepted")
            .where("donationCategory", "==", "blood")
            .where("donationId", "==", element.data().donationId)
            .get()
            .then((querySnapshot1) => {
              querySnapshot1.forEach((element1) => {
                db.collection("receiver")
                  .where(
                    firebase.firestore.FieldPath.documentId(),
                    "==",
                    element1.data().receiverId
                  )
                  .get()
                  .then((querySnapshot2) => {
                    querySnapshot2.forEach((element2) => {
                      receiverData = element2.data();
                    });
                  });

                db.collection("blood")
                  .where(
                    firebase.firestore.FieldPath.documentId(),
                    "==",
                    element1.data().donationId
                  )
                  .get()
                  .then((querySnapshot3) => {
                    querySnapshot3.forEach((element3) => {
                      var bloodData = element3.data();

                      setBloodInfo((arr) => [
                        ...arr,
                        { donationData, receiverData, bloodData },
                      ]);
                    });
                  });
              });
            });
        });
      });
  };

  //OLD TO LATEST
  const oldToLatest = async () => {
    var receiverData;
    db.collection("receivedDonations")
      .where("date", "<", "dt")
      .orderBy("date")
      .onSnapshot((querySnapshot) => {
        setFoodInfo([]);
        setItemInfo([]);
        setBloodInfo([]);
        querySnapshot.forEach((element) => {
          var donationData = element.data();

          db.collection("interested")
            .where("status", "==", "accepted")
            .where("donationCategory", "==", "food")
            .where("donationId", "==", element.data().donationId)
            .get()
            .then((querySnapshot1) => {
              querySnapshot1.forEach((element1) => {
                db.collection("receiver")
                  .where(
                    firebase.firestore.FieldPath.documentId(),
                    "==",
                    element1.data().receiverId
                  )
                  .get()
                  .then((querySnapshot2) => {
                    querySnapshot2.forEach((element2) => {
                      receiverData = element2.data();
                    });
                  });

                db.collection("food")
                  .where(
                    firebase.firestore.FieldPath.documentId(),
                    "==",
                    element1.data().donationId
                  )
                  .get()
                  .then((querySnapshot3) => {
                    querySnapshot3.forEach((element3) => {
                      var foodData = element3.data();

                      setFoodInfo((arr) => [
                        ...arr,
                        { donationData, receiverData, foodData },
                      ]);
                    });
                  });
              });
            });

          db.collection("interested")
            .where("status", "==", "accepted")
            .where("donationCategory", "==", "used item")
            .where("donationId", "==", element.data().donationId)
            .get()
            .then((querySnapshot1) => {
              querySnapshot1.forEach((element1) => {
                db.collection("receiver")
                  .where(
                    firebase.firestore.FieldPath.documentId(),
                    "==",
                    element1.data().receiverId
                  )
                  .get()
                  .then((querySnapshot2) => {
                    querySnapshot2.forEach((element2) => {
                      receiverData = element2.data();
                    });
                  });

                db.collection("usedItems")
                  .where(
                    firebase.firestore.FieldPath.documentId(),
                    "==",
                    element1.data().donationId
                  )
                  .get()
                  .then((querySnapshot3) => {
                    querySnapshot3.forEach((element3) => {
                      var itemData = element3.data();

                      setItemInfo((arr) => [
                        ...arr,
                        { donationData, receiverData, itemData },
                      ]);
                    });
                  });
              });
            });

          db.collection("interested")
            .where("status", "==", "accepted")
            .where("donationCategory", "==", "blood")
            .where("donationId", "==", element.data().donationId)
            .get()
            .then((querySnapshot1) => {
              querySnapshot1.forEach((element1) => {
                db.collection("receiver")
                  .where(
                    firebase.firestore.FieldPath.documentId(),
                    "==",
                    element1.data().receiverId
                  )
                  .get()
                  .then((querySnapshot2) => {
                    querySnapshot2.forEach((element2) => {
                      receiverData = element2.data();
                    });
                  });

                db.collection("blood")
                  .where(
                    firebase.firestore.FieldPath.documentId(),
                    "==",
                    element1.data().donationId
                  )
                  .get()
                  .then((querySnapshot3) => {
                    querySnapshot3.forEach((element3) => {
                      var bloodData = element3.data();

                      setBloodInfo((arr) => [
                        ...arr,
                        { donationData, receiverData, bloodData },
                      ]);
                    });
                  });
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
            marginRight: "50px",
            textDecoration: "underline",
          }}
        >
          Admin
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
          Received Donations
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
              img={item.foodData.img}
              receiverName={item.receiverData.name}
              receiverContact={item.receiverData.contactNo}
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
              receiverName={item.receiverData.name}
              receiverContact={item.receiverData.contactNo}
              receiverId={item.donationData.receiverId}
              date={item.donationData.date}
            />
          ))}

          {bloodInfo.map((item) => (
            <Frame3
              bloodGroup={item.bloodData.bloodGroup}
              age={item.bloodData.age}
              lastDonated={item.bloodData.lastDonated}
              illness={item.bloodData.illness}
              currentMedication={item.bloodData.currentMedication}
              vaccination={item.bloodData.vaccination}
              bloodTransfusion={item.bloodData.bloodTransfusion}
              smoking={item.bloodData.smoking}
              province={item.bloodData.province}
              city={item.bloodData.city}
              img={item.bloodData.img}
              receiverName={item.receiverData.name}
              receiverContact={item.receiverData.contactNo}
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
  receiverName,
  receiverContact,
  date,
}) => {
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

      <p style={{ textDecoration: "underline" }}>Receiver Information</p>
      <p style={{ marginTop: "-10px" }}>Name: {receiverName}</p>
      <p style={{ marginTop: "-10px" }}>Contact No: {receiverContact}</p>
      <p style={{ marginTop: "-10px" }}>
        Received On: {new Date(date).toDateString()}
      </p>

      <p style={{ marginTop: "-10px", textDecoration: "underline" }}>
        Donation Information
      </p>
      <p style={{ marginTop: "-10px" }}>Category: Food</p>
      <p style={{ marginTop: "-10px" }}>Name: {name}</p>
      <p style={{ marginTop: "-10px" }}>Quantity: {quantity}</p>
      <p style={{ marginTop: "-10px" }}>Street Address: {streetAddress}</p>
      <p style={{ marginTop: "-10px" }}>Province: {province}</p>
      <p style={{ marginTop: "-10px" }}>City: {city}</p>
      <p style={{ marginTop: "-10px" }}>Sub-category: {category}</p>
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
  receiverName,
  receiverContact,
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
        Received On: {new Date(date).toDateString()}
      </p>

      <p style={{ marginTop: "-10px", textDecoration: "underline" }}>
        Donation Information
      </p>
      <p style={{ marginTop: "-10px" }}>Category: Used Item</p>
      <p style={{ marginTop: "-10px" }}>Name: {name}</p>
      <p style={{ marginTop: "-10px" }}>Quantity: {quantity}</p>
      <p style={{ marginTop: "-10px" }}>Street Address: {streetAddress}</p>
      <p style={{ marginTop: "-10px" }}>Province: {province}</p>
      <p style={{ marginTop: "-10px" }}>City: {city}</p>
      <p style={{ marginTop: "-10px" }}>Sub-category: {category}</p>
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
  img,
  receiverName,
  receiverContact,
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
        Received On: {new Date(date).toDateString()}
      </p>

      <p style={{ marginTop: "-10px", textDecoration: "underline" }}>
        Donation Information
      </p>
      <p style={{ marginTop: "-10px" }}>Category: Blood</p>
      <p style={{ marginTop: "-10px" }}>Blood Group: {bloodGroup}</p>
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
    </div>
  );
};

export default ReceivedDonations;
