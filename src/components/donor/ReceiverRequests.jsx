import { db } from "../../firebase";
import { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import firebase from "firebase";

const ReceiverRequests = () => {
  const [foodInfo, setFoodInfo] = useState([]);
  const [itemInfo, setItemInfo] = useState([]);
  const [bloodInfo, setBloodInfo] = useState([]);

  const [active, setActive] = useState("");

  const dt = firebase.firestore.Timestamp.now().toDate().toString();

  useEffect(async () => {
    db.collection("foodRequest")
      .where("status", "==", "active")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          var foodData = element.data();
          setFoodInfo((arr) => [...arr, foodData]);
        });
      });
    db.collection("usedItemRequest")
      .where("status", "==", "active")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          var itemData = element.data();
          setItemInfo((arr) => [...arr, itemData]);
        });
      });
    db.collection("bloodRequest")
      .where("status", "==", "active")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          var bloodData = element.data();
          setBloodInfo((arr) => [...arr, bloodData]);
        });
      });
  }, []);

  const fetchFoodData = async () => {
    db.collection("foodRequest")
      .where("status", "==", "active")
      .get()
      .then((querySnapshot) => {
        setItemInfo([]);
        setBloodInfo([]);
        setFoodInfo([]);
        querySnapshot.forEach((element) => {
          var foodData = element.data();
          setFoodInfo((arr) => [...arr, foodData]);
        });
      });
  };

  const fetchItemData = async () => {
    db.collection("usedItemRequest")
      .where("status", "==", "active")
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
  };

  const fetchBloodData = async () => {
    db.collection("bloodRequest")
      .where("status", "==", "active")
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
  };

  //LATEST TO OLD
  const latestToOld = async () => {
    db
      .collection("foodRequest")
      .where("status", "==", "active")
      .orderBy("date", "desc")
      .onSnapshot((querySnapshot) => {
        setFoodInfo([]);
        querySnapshot.forEach((element) => {
          var foodData = element.data();
          setFoodInfo((arr) => [...arr, foodData]);
        });
      }) &&
      db
        .collection("usedItemRequest")
        .where("status", "==", "active")
        .orderBy("date", "desc")
        .onSnapshot((querySnapshot) => {
          setItemInfo([]);
          querySnapshot.forEach((element) => {
            var itemData = element.data();
            setItemInfo((arr) => [...arr, itemData]);
          });
        }) &&
      db
        .collection("bloodRequest")
        .where("status", "==", "active")
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
    db
      .collection("foodRequest")
      .where("status", "==", "active")
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
        .where("status", "==", "active")
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
        .where("status", "==", "active")
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

  return (
    <>
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
              paddingTop: "45px",
              marginTop: "-40px",
              paddingBottom: "30px",
            }}
          >
            General Donation Requests
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

          <p style={{ marginLeft: "480px", marginRight: "20px" }}>Filter by:</p>

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

      <h3
        className="container"
        style={{
          textAlign: "center",
          paddingTop: "20px",
        }}
      >
        Food
      </h3>
      <TableContainer
        style={{
          width: "100%",
          maxWidth: 1230,
          margin: "1rem",
          backgroundColor: "#E5E5E5",
          padding: "20px",
        }}
        component={Paper}
      >
        <Table sx={{ minWidth: 550 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Donation Name</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Province</TableCell>
              <TableCell align="right">City</TableCell>
              <TableCell align="right">Attendant Name</TableCell>
              <TableCell align="right">Attendant Contact</TableCell>
              <TableCell align="right">PickNDrop</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {foodInfo.map((foodData) => (
              <TableRow
                key={foodData.foodName}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {foodData.foodName}
                </TableCell>
                <TableCell align="right">{foodData.quantity}</TableCell>
                <TableCell align="right">{foodData.category}</TableCell>
                <TableCell align="right">{foodData.province}</TableCell>
                <TableCell align="right">{foodData.city}</TableCell>
                <TableCell align="right">{foodData.attendantName}</TableCell>
                <TableCell align="right">{foodData.attendantContact}</TableCell>
                <TableCell align="right">{foodData.pickDrop}</TableCell>
                <TableCell align="right">
                  {new Date(foodData.date).toDateString()}
                </TableCell>
                <TableCell align="right">
                  <Link style={{ textDecoration: "none" }} to={"/chat"}>
                    <Button
                      onClick={() => {
                        alert(
                          "Thank you! Kindly chat with the receiver to coordinate."
                        );
                        db.collection("foodRequest")
                          .where("foodName", "==", foodData.foodName)
                          .where("quantity", "==", foodData.quantity)
                          .get()
                          .then((querySnapshot) => {
                            querySnapshot.forEach((element) => {
                              element.ref.update({
                                status: "inactive",
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
                      DONATE
                    </Button>
                  </Link>
                </TableCell>
                <TableCell align="right">
                  <Link style={{ textDecoration: "none" }} to="/chat"></Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <h3
        className="container"
        style={{
          textAlign: "center",
          paddingTop: "20px",
        }}
      >
        Used Items
      </h3>
      <TableContainer
        style={{
          width: "100%",
          maxWidth: 1230,
          margin: "1rem",
          backgroundColor: "#E5E5E5",
          padding: "20px",
        }}
        component={Paper}
      >
        <Table sx={{ minWidth: 550 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Donation Name</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Province</TableCell>
              <TableCell align="right">City</TableCell>
              <TableCell align="right">Attendant Name</TableCell>
              <TableCell align="right">Attendant Contact</TableCell>
              <TableCell align="right">PickNDrop</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Size</TableCell>
              <TableCell align="right">Brand</TableCell>
              <TableCell align="right">Author</TableCell>
              <TableCell align="right">Edition</TableCell>
              <TableCell align="right">Other Category</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {itemInfo.map((itemData) => (
              <TableRow
                key={itemData.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {itemData.name}
                </TableCell>
                <TableCell align="right">{itemData.quantity}</TableCell>
                <TableCell align="right">{itemData.category}</TableCell>
                <TableCell align="right">{itemData.province}</TableCell>
                <TableCell align="right">{itemData.city}</TableCell>
                <TableCell align="right">{itemData.attendantName}</TableCell>
                <TableCell align="right">{itemData.attendantContact}</TableCell>
                <TableCell align="right">{itemData.pickDrop}</TableCell>
                <TableCell align="right">
                  {new Date(itemData.date).toDateString()}
                </TableCell>

                {itemData.category === "furniture" ? (
                  <TableCell align="right">{itemData.description}</TableCell>
                ) : (
                  <TableCell align="right">N/A</TableCell>
                )}
                {itemData.category === "clothes" ? (
                  <>
                    <TableCell align="right">{itemData.size}</TableCell>
                  </>
                ) : (
                  <TableCell align="right">N/A</TableCell>
                )}
                {itemData.category === "clothes" ? (
                  <>
                    <TableCell align="right">{itemData.brand}</TableCell>
                  </>
                ) : (
                  <TableCell align="right">N/A</TableCell>
                )}
                {itemData.category === "books" ? (
                  <TableCell align="right">{itemData.author}</TableCell>
                ) : (
                  <TableCell align="right">N/A</TableCell>
                )}
                {itemData.category === "books" ? (
                  <TableCell align="right">{itemData.edition}</TableCell>
                ) : (
                  <TableCell align="right">N/A</TableCell>
                )}
                {itemData.category === "other" ? (
                  <TableCell align="right">{itemData.otherCategory}</TableCell>
                ) : (
                  <TableCell align="right">N/A</TableCell>
                )}
                <TableCell align="right">
                  <Link style={{ textDecoration: "none" }} to={"/chat"}>
                    <Button
                      onClick={() => {
                        alert(
                          "Thank you! Kindly chat with the receiver to coordinate."
                        );
                        db.collection("usedItemRequest")
                          .where("name", "==", itemData.name)
                          .where("quantity", "==", itemData.quantity)
                          .get()
                          .then((querySnapshot) => {
                            querySnapshot.forEach((element) => {
                              element.ref.update({
                                status: "inactive",
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
                      DONATE
                    </Button>
                  </Link>
                </TableCell>
                <TableCell align="right">
                  <Link style={{ textDecoration: "none" }} to="/chat"></Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <h3
        className="container"
        style={{
          textAlign: "center",
          paddingTop: "20px",
        }}
      >
        Blood
      </h3>
      <TableContainer
        style={{
          width: "100%",
          maxWidth: 1230,
          margin: "1rem",
          backgroundColor: "#E5E5E5",
          padding: "20px",
        }}
        component={Paper}
      >
        <Table sx={{ minWidth: 550 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Blood Group</TableCell>
              <TableCell align="right">Age</TableCell>
              <TableCell align="right">Disease</TableCell>
              <TableCell align="right">HB Level</TableCell>
              <TableCell align="right">Pints Required</TableCell>
              <TableCell align="right">Time Limit</TableCell>
              <TableCell align="right">Hospital</TableCell>
              <TableCell align="right">Province</TableCell>
              <TableCell align="right">City</TableCell>
              <TableCell align="right">Attendant Name</TableCell>
              <TableCell align="right">Attendant Contact</TableCell>
              <TableCell align="right">PickNDrop</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bloodInfo.map((bloodData) => (
              <TableRow
                key={bloodData.bloodGroup}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {bloodData.bloodGroup}
                </TableCell>
                <TableCell align="right">{bloodData.age}</TableCell>
                <TableCell align="right">{bloodData.disease}</TableCell>
                <TableCell align="right">{bloodData.hbLevel}</TableCell>
                <TableCell align="right">{bloodData.pintsRequired}</TableCell>
                <TableCell align="right">{bloodData.timeLimit}</TableCell>
                <TableCell align="right">{bloodData.hospital}</TableCell>
                <TableCell align="right">{bloodData.province}</TableCell>
                <TableCell align="right">{bloodData.city}</TableCell>
                <TableCell align="right">{bloodData.attendantName}</TableCell>
                <TableCell align="right">
                  {bloodData.attendantContact}
                </TableCell>
                <TableCell align="right">{bloodData.pickDrop}</TableCell>
                <TableCell align="right">
                  {new Date(bloodData.date).toDateString()}
                </TableCell>
                <TableCell align="right">
                  <Link style={{ textDecoration: "none" }} to={"/chat"}>
                    <Button
                      onClick={() => {
                        alert(
                          "Thank you! Kindly chat with the receiver to coordinate."
                        );
                        db.collection("bloodRequest")
                          .where("bloodGroup", "==", bloodData.bloodGroup)
                          .where("age", "==", bloodData.age)
                          .get()
                          .then((querySnapshot) => {
                            querySnapshot.forEach((element) => {
                              element.ref.update({
                                status: "inactive",
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
                      DONATE
                    </Button>
                  </Link>
                </TableCell>
                <TableCell align="right">
                  <Link style={{ textDecoration: "none" }} to="/chat"></Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ReceiverRequests;
