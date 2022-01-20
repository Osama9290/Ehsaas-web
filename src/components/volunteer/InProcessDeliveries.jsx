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

const InProcessDeliveries = () => {
  const [foodInfo, setFoodInfo] = useState([]);
  const [itemInfo, setItemInfo] = useState([]);
  const [active, setActive] = useState("");

  useEffect(async () => {
    db.collection("delivery")
      .where("status", "==", "in progress")
      .onSnapshot((querySnapshot) => {
        setFoodInfo([]);
        setItemInfo([]);
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

              setItemInfo([]);
              db.collection("receiver")
                .where(
                  firebase.firestore.FieldPath.documentId(),
                  "==",
                  element.data().receiverId
                )
                .get()
                .then((querySnapshot4) => {
                  querySnapshot4.forEach((element4) => {
                    var receiverData = element4.data();

                    db.collection("usedItems")
                      .where(
                        firebase.firestore.FieldPath.documentId(),
                        "==",
                        element.data().donationId
                      )
                      .get()
                      .then((querySnapshot5) => {
                        querySnapshot5.forEach((element5) => {
                          var itemData = element5.data();

                          db.collection("donor")
                            .where(
                              firebase.firestore.FieldPath.documentId(),
                              "==",
                              element.data().donorId
                            )
                            .get()
                            .then((querySnapshot5) => {
                              querySnapshot5.forEach((element5) => {
                                var donorData = element5.data();

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
      });
  }, []);

  const fetchFoodData = async () => {
    db.collection("delivery")
      .where("status", "==", "in progress")
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
    db.collection("delivery")
      .where("status", "==", "in progress")
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
                  .then((querySnapshot5) => {
                    querySnapshot5.forEach((element5) => {
                      var itemData = element5.data();

                      db.collection("donor")
                        .where(
                          firebase.firestore.FieldPath.documentId(),
                          "==",
                          element.data().donorId
                        )
                        .get()
                        .then((querySnapshot5) => {
                          querySnapshot5.forEach((element5) => {
                            var donorData = element5.data();

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
    db.collection("delivery")
      .where("status", "==", "in progress")
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
                  .then((querySnapshot5) => {
                    querySnapshot5.forEach((element5) => {
                      var itemData = element5.data();

                      db.collection("donor")
                        .where(
                          firebase.firestore.FieldPath.documentId(),
                          "==",
                          element.data().donorId
                        )
                        .get()
                        .then((querySnapshot5) => {
                          querySnapshot5.forEach((element5) => {
                            var donorData = element5.data();

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
    db.collection("delivery")
      .where("status", "==", "in progress")
      .where("date", "<", "dt")
      .orderBy("date")
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
                  .then((querySnapshot5) => {
                    querySnapshot5.forEach((element5) => {
                      var itemData = element5.data();

                      db.collection("donor")
                        .where(
                          firebase.firestore.FieldPath.documentId(),
                          "==",
                          element.data().donorId
                        )
                        .get()
                        .then((querySnapshot5) => {
                          querySnapshot5.forEach((element5) => {
                            var donorData = element5.data();

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
    <>
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
              paddingTop: "5px",
              paddingBottom: "20px",
            }}
          >
            In Progress Deliveries
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
        </Grid>
      </Grid>

      <TableContainer
        style={{
          width: "100%",
          maxWidth: 1150,
          margin: "1rem",
          backgroundColor: "#E5E5E5",
          padding: "20px",
          margin: "30px",
          marginLeft: "50px",
        }}
        component={Paper}
      >
        <Table sx={{ minWidth: 550 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Receiver Name</TableCell>
              <TableCell align="right">Receiver Contact</TableCell>
              <TableCell>Donation Name</TableCell>
              <TableCell>Donation Category</TableCell>
              <TableCell align="right">Donor Name</TableCell>
              <TableCell align="right">Donor Contact</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {foodInfo.map((item) => (
              <TableRow
                key={item.receiverData.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.receiverData.name}
                </TableCell>
                <TableCell align="right">
                  {item.receiverData.contactNo}
                </TableCell>
                <TableCell align="right">{item.foodData.name}</TableCell>
                <TableCell component="th" scope="row">
                  Food
                </TableCell>
                <TableCell align="right">{item.donorData.name}</TableCell>
                <TableCell align="right">{item.donorData.contactNo}</TableCell>
                <TableCell align="right">
                  {new Date(item.donationData.date).toDateString()}
                </TableCell>
                <TableCell align="right">
                  <Link
                    style={{ textDecoration: "none" }}
                    to={"/volunteer-portal"}
                  >
                    <Button
                      onClick={async () => {
                        alert("Thank you for delivering!");

                        db.collection("delivery")
                          .get()
                          .then(function (querySnapshot) {
                            querySnapshot.forEach(function (doc) {
                              doc.ref.update({
                                status: "completed",
                              });
                            });
                          });

                        const volunteerRef = db.doc(
                          `volunteer/${auth.currentUser.uid}`
                        );
                        const volunteerSnapshot = await volunteerRef.get();
                        db.collection("volunteer")
                          .where("name", "==", volunteerSnapshot.data().name)
                          .get()
                          .then(function (querySnapshot) {
                            querySnapshot.forEach(function (doc) {
                              doc.ref.update({
                                deliveryCount:
                                  firebase.firestore.FieldValue.increment(1),
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
                      }}
                    >
                      DELIVERED
                    </Button>
                  </Link>
                </TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => {
                      db.collection("food")
                        .where("name", "==", item.foodData.name)
                        .get()
                        .then(function (querySnapshot) {
                          querySnapshot.forEach(function (doc) {
                            var foodId = doc.id;

                            db.collection("delivery")
                              .where("donationId", "==", foodId)
                              .get()
                              .then(function (querySnapshot) {
                                querySnapshot.forEach(function (doc) {
                                  doc.ref.delete();
                                });
                              });
                          });
                        });
                    }}
                    type="submit"
                    style={{
                      backgroundColor: "red",
                      color: "black",
                      borderRadius: "0.7rem",
                      textTransform: "capitalize",
                    }}
                  >
                    CANCEL
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableBody>
            {itemInfo.map((item) => (
              <TableRow
                key={item.receiverData.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.receiverData.name}
                </TableCell>
                <TableCell align="right">
                  {item.receiverData.contactNo}
                </TableCell>
                <TableCell align="right">{item.itemData.name}</TableCell>
                <TableCell component="th" scope="row">
                  Used Items
                </TableCell>
                <TableCell align="right">{item.donorData.name}</TableCell>
                <TableCell align="right">{item.donorData.contactNo}</TableCell>
                <TableCell align="right">
                  {new Date(item.donationData.date).toDateString()}
                </TableCell>
                <TableCell align="right">
                  <Link
                    style={{ textDecoration: "none" }}
                    to={"/volunteer-portal"}
                  >
                    <Button
                      onClick={async () => {
                        alert("Thank you for delivering!");

                        db.collection("delivery")
                          .get()
                          .then(function (querySnapshot) {
                            querySnapshot.forEach(function (doc) {
                              doc.ref.update({
                                status: "completed",
                              });
                            });
                          });

                        const volunteerRef = db.doc(
                          `volunteer/${auth.currentUser.uid}`
                        );
                        const volunteerSnapshot = await volunteerRef.get();
                        db.collection("volunteer")
                          .where("name", "==", volunteerSnapshot.data().name)
                          .get()
                          .then(function (querySnapshot) {
                            querySnapshot.forEach(function (doc) {
                              doc.ref.update({
                                deliveryCount:
                                  firebase.firestore.FieldValue.increment(1),
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
                      }}
                    >
                      DELIVERED
                    </Button>
                  </Link>
                </TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => {
                      db.collection("usedItems")
                        .where("name", "==", item.itemData.name)
                        .get()
                        .then(function (querySnapshot) {
                          querySnapshot.forEach(function (doc) {
                            var itemId = doc.id;

                            db.collection("delivery")
                              .where("donationId", "==", itemId)
                              .get()
                              .then(function (querySnapshot) {
                                querySnapshot.forEach(function (doc) {
                                  doc.ref.delete();
                                });
                              });
                          });
                        });
                    }}
                    type="submit"
                    style={{
                      backgroundColor: "red",
                      color: "black",
                      borderRadius: "0.7rem",
                      textTransform: "capitalize",
                    }}
                  >
                    CANCEL
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default InProcessDeliveries;
