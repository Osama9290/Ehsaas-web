import { db, auth } from "../../firebase";
import { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import firebase from "firebase";
import { Link } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";

const ReceiversInterested = () => {
  const [foodInfo, setFoodInfo] = useState([]);
  const [itemInfo, setItemInfo] = useState([]);
  const [bloodInfo, setBloodInfo] = useState([]);
  const [active, setActive] = useState("");

  var name,
    city,
    province,
    donorName,
    donorContact,
    receiverName,
    receiverContact,
    streetAddress,
    receiverEmail;
  var volEmail = [];
  var volName = [];

  const link = "http://localhost:3000/deliver-donations";
  const link2 = "http://localhost:3000/receivers-interested";

  const fetch = async () => {
    const donorRef = db.doc(`donor/${auth.currentUser.uid}`);
    const donorSnapshot = await donorRef.get();
    donorName = donorSnapshot.data().name;
    donorContact = donorSnapshot.data().contactNo;

    db.collection("volunteer")
      .where("province", "==", province)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          volEmail = element.data().email;
          volName = element.data().name;

          axios.post("http://localhost:2000/volunteer-delivery-email/", {
            volEmail,
            volName,
            b: link,
            c: receiverName,
            d: receiverContact,
            e: name,
            g: streetAddress,
            i: province,
            j: city,
            k: donorContact,
            l: donorName,
          });
        });
      });
  };
  const fetch2 = async () => {
    const donorRef = db.doc(`donor/${auth.currentUser.uid}`);
    const donorSnapshot = await donorRef.get();
    donorName = donorSnapshot.data().name;
    donorContact = donorSnapshot.data().contactNo;

    await axios.post("http://localhost:2000/receiver-accept-donation-email/", {
      t: receiverEmail,
      l: link2,
      rc: receiverName,
      n: name,
      st: streetAddress,
      p: province,
      c: city,
      d: donorName,
      dc: donorContact,
    });
  };
  const fetch3 = async () => {
    const donorRef = db.doc(`donor/${auth.currentUser.uid}`);
    const donorSnapshot = await donorRef.get();
    donorName = donorSnapshot.data().name;
    donorContact = donorSnapshot.data().contactNo;

    await axios.post("http://localhost:2000/receiver-decline-donation-email/", {
      t: receiverEmail,
      rc: receiverName,
      n: name,
      st: streetAddress,
      p: province,
      c: city,
      d: donorName,
      dc: donorContact,
    });
  };

  useEffect(async () => {
    const userRef = db.doc(`donor/${auth.currentUser.uid}`);

    db.collection("interested")
      .where("donorId", "==", userRef)
      .where("status", "==", "in progress")
      .onSnapshot((querySnapshot) => {
        setFoodInfo([]);
        setItemInfo([]);
        setBloodInfo([]);
        querySnapshot.forEach((element) => {
          var donationData = element.data();

          setFoodInfo([]);
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
                  .where(
                    firebase.firestore.FieldPath.documentId(),
                    "==",
                    element.data().donationId
                  )
                  .get()
                  .then((querySnapshot2) => {
                    querySnapshot2.forEach((element2) => {
                      var foodData = element2.data();

                      setFoodInfo((arr) => [
                        ...arr,
                        { donationData, receiverData, foodData },
                      ]);
                    });
                  });
              });
            });

          setItemInfo([]);
          db.collection("receiver")
            .where(
              firebase.firestore.FieldPath.documentId(),
              "==",
              element.data().receiverId
            )
            .get()
            .then((querySnapshot3) => {
              querySnapshot3.forEach((element3) => {
                var receiverData = element3.data();

                db.collection("usedItems")
                  .where(
                    firebase.firestore.FieldPath.documentId(),
                    "==",
                    element.data().donationId
                  )
                  .get()
                  .then((querySnapshot4) => {
                    querySnapshot4.forEach((element4) => {
                      var itemData = element4.data();

                      setItemInfo((arr) => [
                        ...arr,
                        { donationData, receiverData, itemData },
                      ]);
                    });
                  });
              });
            });

          setBloodInfo([]);
          db.collection("receiver")
            .where(
              firebase.firestore.FieldPath.documentId(),
              "==",
              element.data().receiverId
            )
            .get()
            .then((querySnapshot5) => {
              querySnapshot5.forEach((element5) => {
                var receiverData = element5.data();

                db.collection("blood")
                  .where(
                    firebase.firestore.FieldPath.documentId(),
                    "==",
                    element.data().donationId
                  )
                  .get()
                  .then((querySnapshot6) => {
                    querySnapshot6.forEach((element6) => {
                      var bloodData = element6.data();

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
    const userRef = db.doc(`donor/${auth.currentUser.uid}`);

    db.collection("interested")
      .where("donorId", "==", userRef)
      .where("status", "==", "in progress")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          setFoodInfo([]);
          setItemInfo([]);
          setBloodInfo([]);

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
                  .where(
                    firebase.firestore.FieldPath.documentId(),
                    "==",
                    element.data().donationId
                  )
                  .get()
                  .then((querySnapshot2) => {
                    querySnapshot2.forEach((element2) => {
                      var foodData = element2.data();

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
    const userRef = db.doc(`donor/${auth.currentUser.uid}`);

    db.collection("interested")
      .where("donorId", "==", userRef)
      .where("status", "==", "in progress")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          setFoodInfo([]);
          setItemInfo([]);
          setBloodInfo([]);

          var donationData = element.data();

          db.collection("receiver")
            .where(
              firebase.firestore.FieldPath.documentId(),
              "==",
              element.data().receiverId
            )
            .get()
            .then((querySnapshot3) => {
              querySnapshot3.forEach((element3) => {
                var receiverData = element3.data();

                db.collection("usedItems")
                  .where(
                    firebase.firestore.FieldPath.documentId(),
                    "==",
                    element.data().donationId
                  )
                  .get()
                  .then((querySnapshot4) => {
                    querySnapshot4.forEach((element4) => {
                      var itemData = element4.data();

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
    const userRef = db.doc(`donor/${auth.currentUser.uid}`);

    db.collection("interested")
      .where("donorId", "==", userRef)
      .where("status", "==", "in progress")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          setFoodInfo([]);
          setItemInfo([]);
          setBloodInfo([]);

          var donationData = element.data();

          db.collection("receiver")
            .where(
              firebase.firestore.FieldPath.documentId(),
              "==",
              element.data().receiverId
            )
            .get()
            .then((querySnapshot5) => {
              querySnapshot5.forEach((element5) => {
                var receiverData = element5.data();

                db.collection("blood")
                  .where(
                    firebase.firestore.FieldPath.documentId(),
                    "==",
                    element.data().donationId
                  )
                  .get()
                  .then((querySnapshot6) => {
                    querySnapshot6.forEach((element6) => {
                      var bloodData = element6.data();

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
    const userRef = db.doc(`donor/${auth.currentUser.uid}`);

    db.collection("interested")
      .where("donorId", "==", userRef)
      .where("status", "==", "in progress")
      .orderBy("date", "desc")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((element) => {
          setFoodInfo([]);
          setItemInfo([]);
          setBloodInfo([]);

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
                  .where(
                    firebase.firestore.FieldPath.documentId(),
                    "==",
                    element.data().donationId
                  )
                  .get()
                  .then((querySnapshot2) => {
                    querySnapshot2.forEach((element2) => {
                      var foodData = element2.data();

                      setFoodInfo((arr) => [
                        ...arr,
                        { donationData, receiverData, foodData },
                      ]);
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
            .then((querySnapshot3) => {
              querySnapshot3.forEach((element3) => {
                var receiverData = element3.data();

                db.collection("usedItems")
                  .where(
                    firebase.firestore.FieldPath.documentId(),
                    "==",
                    element.data().donationId
                  )
                  .get()
                  .then((querySnapshot4) => {
                    querySnapshot4.forEach((element4) => {
                      var itemData = element4.data();

                      setItemInfo((arr) => [
                        ...arr,
                        { donationData, receiverData, itemData },
                      ]);
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
            .then((querySnapshot5) => {
              querySnapshot5.forEach((element5) => {
                var receiverData = element5.data();

                db.collection("blood")
                  .where(
                    firebase.firestore.FieldPath.documentId(),
                    "==",
                    element.data().donationId
                  )
                  .get()
                  .then((querySnapshot6) => {
                    querySnapshot6.forEach((element6) => {
                      var bloodData = element6.data();

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
    const userRef = db.doc(`donor/${auth.currentUser.uid}`);

    db.collection("interested")
      .where("donorId", "==", userRef)
      .where("status", "==", "in progress")
      .where("date", "<", "dt")
      .orderBy("date")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((element) => {
          setFoodInfo([]);
          setItemInfo([]);
          setBloodInfo([]);

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
                  .where(
                    firebase.firestore.FieldPath.documentId(),
                    "==",
                    element.data().donationId
                  )
                  .get()
                  .then((querySnapshot2) => {
                    querySnapshot2.forEach((element2) => {
                      var foodData = element2.data();

                      setFoodInfo((arr) => [
                        ...arr,
                        { donationData, receiverData, foodData },
                      ]);
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
            .then((querySnapshot3) => {
              querySnapshot3.forEach((element3) => {
                var receiverData = element3.data();

                db.collection("usedItems")
                  .where(
                    firebase.firestore.FieldPath.documentId(),
                    "==",
                    element.data().donationId
                  )
                  .get()
                  .then((querySnapshot4) => {
                    querySnapshot4.forEach((element4) => {
                      var itemData = element4.data();

                      setItemInfo((arr) => [
                        ...arr,
                        { donationData, receiverData, itemData },
                      ]);
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
            .then((querySnapshot5) => {
              querySnapshot5.forEach((element5) => {
                var receiverData = element5.data();

                db.collection("blood")
                  .where(
                    firebase.firestore.FieldPath.documentId(),
                    "==",
                    element.data().donationId
                  )
                  .get()
                  .then((querySnapshot6) => {
                    querySnapshot6.forEach((element6) => {
                      var bloodData = element6.data();

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
    <>
      <Grid container spacing={2}>
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
              paddingTop: "5px",
              paddingBottom: "20px",
            }}
          >
            Your Donation Requests
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

          <p style={{ marginLeft: "460px", marginRight: "20px" }}>Filter by:</p>

          <Button
            type="submit"
            onClick={() => {
              fetchFoodData();
              setActive("food");
            }}
            style={{
              backgroundColor: "#2BB8C1",
              color: "black",
              borderRadius: "0.7rem",
              textTransform: "capitalize",
              marginRight: "10px",
            }}
          >
            Food
          </Button>

          <Button
            type="submit"
            onClick={() => {
              fetchItemData();
              setActive("item");
            }}
            style={{
              backgroundColor: "#2BB8C1",
              color: "black",
              borderRadius: "0.7rem",
              textTransform: "capitalize",
              marginRight: "10px",
            }}
          >
            Used Items
          </Button>
          <Button
            type="submit"
            onClick={() => {
              fetchBloodData();
              setActive("blood");
            }}
            style={{
              backgroundColor: "#2BB8C1",
              color: "black",
              borderRadius: "0.7rem",
              textTransform: "capitalize",
              marginRight: "10px",
            }}
          >
            Blood
          </Button>
        </Grid>
      </Grid>

      <TableContainer
        style={{
          width: "100%",
          maxWidth: 1100,
          margin: "1rem",
          backgroundColor: "#E5E5E5",
          padding: "20px",
          margin: "30px",
          marginLeft: "80px",
        }}
        component={Paper}
      >
        <Table sx={{ minWidth: 550 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Donation Name</TableCell>
              <TableCell>Donation Category</TableCell>
              <TableCell align="right">Receiver Name</TableCell>
              <TableCell align="right">Receiver Contact</TableCell>
              <TableCell align="right">Via</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {foodInfo.map(
              (item) => (
                (name = item.foodData.name),
                (city = item.foodData.city),
                (streetAddress = item.foodData.streetAddress),
                (province = item.foodData.province),
                (receiverName = item.receiverData.name),
                (receiverContact = item.receiverData.contactNo),
                (receiverEmail = item.receiverData.email),
                (
                  <TableRow
                    key={item.foodData.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {item.foodData.name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      Food
                    </TableCell>
                    <TableCell align="right">
                      {item.receiverData.name}
                    </TableCell>
                    <TableCell align="right">
                      {item.receiverData.contactNo}
                    </TableCell>
                    <TableCell align="right">{item.donationData.via}</TableCell>
                    <TableCell align="right">
                      {new Date(item.donationData.date).toDateString()}
                    </TableCell>
                    <TableCell align="right">
                      <Link style={{ textDecoration: "none" }} to={"/chat"}>
                        <Button
                          onClick={() => {
                            alert(
                              "Thank you for accepting! Kindly chat with the receiver to coordinate."
                            );
                            db.collection("food")
                              .get()
                              .then((querySnapshot) => {
                                querySnapshot.forEach((element) => {
                                  db.collection("interested")
                                    .where("donationId", "==", element.id)
                                    .where("donationCategory", "==", "food")
                                    .get()
                                    .then((querySnapshot1) => {
                                      querySnapshot1.forEach((element1) => {
                                        element1.ref.update({
                                          status: "accepted",
                                        });
                                      });
                                    });
                                });
                              });

                            fetch(
                              volEmail,
                              volName,
                              link,
                              receiverName,
                              receiverContact,
                              name,
                              streetAddress,
                              province,
                              donorContact,
                              donorName
                            );
                            fetch2(
                              receiverEmail,
                              link2,
                              receiverName,
                              name,
                              streetAddress,
                              province
                            );
                          }}
                          type="submit"
                          style={{
                            backgroundColor: "#2BB8C1",
                            color: "black",
                            borderRadius: "0.7rem",
                            textTransform: "capitalize",
                          }}
                        >
                          ACCEPT
                        </Button>
                      </Link>
                    </TableCell>
                    <TableCell align="right">
                      <Link
                        style={{ textDecoration: "none" }}
                        to="/receivers-interested"
                      >
                        <Button
                          onClick={() => {
                            db.collection("food")
                              .get()
                              .then((querySnapshot) => {
                                querySnapshot.forEach((element) => {
                                  db.collection("interested")
                                    .where("donationId", "==", element.id)
                                    .where("donationCategory", "==", "food")
                                    .get()
                                    .then((querySnapshot1) => {
                                      querySnapshot1.forEach((element1) => {
                                        element1.ref.update({
                                          status: "declined",
                                        });
                                      });
                                    });
                                });
                              });

                            fetch3(
                              receiverEmail,
                              receiverName,
                              name,
                              streetAddress,
                              province,
                              donorContact,
                              donorName
                            );
                          }}
                          type="submit"
                          style={{
                            backgroundColor: "red",
                            color: "black",
                            borderRadius: "0.7rem",
                            textTransform: "capitalize",
                          }}
                        >
                          DECLINE
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                )
              )
            )}
          </TableBody>

          <TableBody>
            {itemInfo.map(
              (item) => (
                (name = item.itemData.name),
                (city = item.itemData.city),
                (streetAddress = item.itemData.streetAddress),
                (province = item.itemData.province),
                (receiverName = item.receiverData.name),
                (receiverContact = item.receiverData.contactNo),
                (receiverEmail = item.receiverData.email),
                (
                  <TableRow
                    key={item.itemData.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {item.itemData.name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      Used Items
                    </TableCell>
                    <TableCell align="right">
                      {item.receiverData.name}
                    </TableCell>
                    <TableCell align="right">
                      {item.receiverData.contactNo}
                    </TableCell>
                    <TableCell align="right">{item.donationData.via}</TableCell>
                    <TableCell align="right">
                      {new Date(item.donationData.date).toDateString()}
                    </TableCell>
                    <TableCell align="right">
                      <Link style={{ textDecoration: "none" }} to={"/chat"}>
                        <Button
                          onClick={() => {
                            alert(
                              "Thank you for accepting! Kindly chat with the receiver to coordinate."
                            );
                            db.collection("usedItems")
                              .get()
                              .then((querySnapshot) => {
                                querySnapshot.forEach((element) => {
                                  db.collection("interested")
                                    .where("donationId", "==", element.id)
                                    .where(
                                      "donationCategory",
                                      "==",
                                      "used item"
                                    )
                                    .get()
                                    .then((querySnapshot1) => {
                                      querySnapshot1.forEach((element1) => {
                                        element1.ref.update({
                                          status: "accepted",
                                        });
                                      });
                                    });
                                });
                              });

                            fetch(
                              volEmail,
                              volName,
                              link,
                              receiverName,
                              receiverContact,
                              name,
                              streetAddress,
                              province,
                              donorContact,
                              donorName
                            );
                            fetch2(
                              receiverEmail,
                              link2,
                              receiverName,
                              name,
                              streetAddress,
                              province,
                              donorContact,
                              donorName
                            );
                          }}
                          type="submit"
                          style={{
                            backgroundColor: "#2BB8C1",
                            color: "black",
                            borderRadius: "0.7rem",
                            textTransform: "capitalize",
                          }}
                        >
                          ACCEPT
                        </Button>
                      </Link>
                    </TableCell>
                    <TableCell align="right">
                      <Link
                        style={{ textDecoration: "none" }}
                        to="/receivers-interested"
                      >
                        <Button
                          onClick={() => {
                            db.collection("usedItems")
                              .get()
                              .then((querySnapshot) => {
                                querySnapshot.forEach((element) => {
                                  db.collection("interested")
                                    .where("donationId", "==", element.id)
                                    .where(
                                      "donationCategory",
                                      "==",
                                      "used item"
                                    )
                                    .get()
                                    .then((querySnapshot1) => {
                                      querySnapshot1.forEach((element1) => {
                                        element1.ref.update({
                                          status: "declined",
                                        });
                                      });
                                    });
                                });
                              });

                            fetch3(
                              receiverEmail,
                              receiverName,
                              name,
                              streetAddress,
                              province,
                              donorContact,
                              donorName
                            );
                          }}
                          type="submit"
                          style={{
                            backgroundColor: "red",
                            color: "black",
                            borderRadius: "0.7rem",
                            textTransform: "capitalize",
                          }}
                        >
                          DECLINE
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                )
              )
            )}
          </TableBody>

          <TableBody>
            {bloodInfo.map(
              (item) => (
                (name = item.bloodData.name),
                (city = item.bloodData.city),
                (streetAddress = item.bloodData.streetAddress),
                (province = item.bloodData.province),
                (receiverName = item.receiverData.name),
                (receiverContact = item.receiverData.contactNo),
                (receiverEmail = item.receiverData.email),
                (
                  <TableRow
                    key={item.bloodData.bloodGroup}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {item.bloodData.bloodGroup}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      Blood
                    </TableCell>
                    <TableCell align="right">
                      {item.receiverData.name}
                    </TableCell>
                    <TableCell align="right">
                      {item.receiverData.contactNo}
                    </TableCell>
                    <TableCell align="right">{item.donationData.via}</TableCell>
                    <TableCell align="right">
                      {new Date(item.donationData.date).toDateString()}
                    </TableCell>
                    <TableCell align="right">
                      <Link style={{ textDecoration: "none" }} to={"/chat"}>
                        <Button
                          onClick={() => {
                            alert(
                              "Thank you for accepting! Kindly chat with the receiver to coordinate."
                            );
                            db.collection("blood")
                              .get()
                              .then((querySnapshot) => {
                                querySnapshot.forEach((element) => {
                                  db.collection("interested")
                                    .where("donationId", "==", element.id)
                                    .where("donationCategory", "==", "blood")
                                    .get()
                                    .then((querySnapshot1) => {
                                      querySnapshot1.forEach((element1) => {
                                        element1.ref.update({
                                          status: "accepted",
                                        });
                                      });
                                    });
                                });
                              });

                            fetch(
                              volEmail,
                              volName,
                              link,
                              receiverName,
                              receiverContact,
                              name,
                              streetAddress,
                              province,
                              donorContact,
                              donorName
                            );
                            fetch2(
                              receiverEmail,
                              link2,
                              receiverName,
                              name,
                              streetAddress,
                              province,
                              donorContact,
                              donorName
                            );
                          }}
                          type="submit"
                          style={{
                            backgroundColor: "#2BB8C1",
                            color: "black",
                            borderRadius: "0.7rem",
                            textTransform: "capitalize",
                          }}
                        >
                          ACCEPT
                        </Button>
                      </Link>
                    </TableCell>
                    <TableCell align="right">
                      <Link
                        style={{ textDecoration: "none" }}
                        to="/receivers-interested"
                      >
                        <Button
                          onClick={() => {
                            db.collection("blood")
                              .get()
                              .then((querySnapshot) => {
                                querySnapshot.forEach((element) => {
                                  db.collection("interested")
                                    .where("donationId", "==", element.id)
                                    .where("donationCategory", "==", "blood")
                                    .get()
                                    .then((querySnapshot1) => {
                                      querySnapshot1.forEach((element1) => {
                                        element1.ref.update({
                                          status: "declined",
                                        });
                                      });
                                    });
                                });
                              });

                            fetch3(
                              receiverEmail,
                              receiverName,
                              name,
                              streetAddress,
                              province,
                              donorContact,
                              donorName
                            );
                          }}
                          type="submit"
                          style={{
                            backgroundColor: "red",
                            color: "black",
                            borderRadius: "0.7rem",
                            textTransform: "capitalize",
                          }}
                        >
                          DECLINE
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                )
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ReceiversInterested;
