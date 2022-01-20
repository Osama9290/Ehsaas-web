import { db } from "../../firebase";
import { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import firebase from "firebase";

const UserMessages = () => {
  const [messageInfo, setMessageInfo] = useState([]);
  const [messageSort, setMessageSort] = useState([]);
  const [messageSort2, setMessageSort2] = useState([]);
  const [active, setActive] = useState("");

  const dt = firebase.firestore.Timestamp.now().toDate().toString();

  useEffect(async () => {
    db.collection("contactMessages")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          var messageData = element.data();
          setMessageInfo((arr) => [...arr, messageData]);
        });
      });
  }, []);

  // latest to old
  const latestToOld = () => {
    db.collection("contactMessages")
      .orderBy("date", "desc")
      .onSnapshot((querySnapshot) => {
        var sortMessage2 = [];
        querySnapshot.forEach((element) => {
          sortMessage2.push(element.data());
        });
        setMessageSort2(sortMessage2);
      });
  };
  // old to latest
  const oldToLatest = () => {
    db.collection("contactMessages")
      .where("date", "<", "dt")
      .orderBy("date")
      .onSnapshot((querySnapshot) => {
        var sortMessage = [];
        querySnapshot.forEach((element) => {
          sortMessage.push(element.data());
        });
        setMessageSort(sortMessage);
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
            marginTop: "-40px",
          }}
        >
          User Messages
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

      {messageInfo.map((messageData) => (
        <Frame
          name={messageData.name}
          email={messageData.email}
          subject={messageData.subject}
          message={messageData.message}
          date={messageData.date}
        />
      ))}
      {active == "one" &&
        messageSort2.map((sortMessage2) => (
          <Frame
            name={sortMessage2.name}
            email={sortMessage2.email}
            subject={sortMessage2.subject}
            message={sortMessage2.message}
            date={sortMessage2.date}
          />
        ))}
      {active == "two" &&
        messageSort.map((sortMessage) => (
          <Frame
            name={sortMessage.name}
            email={sortMessage.email}
            subject={sortMessage.subject}
            message={sortMessage.message}
            date={sortMessage.date}
          />
        ))}
    </Grid>
  );
};

const Frame = ({ name, email, subject, message, date }) => {
  return (
    <div
      style={{
        padding: "20px",
        marginTop: "30px",
        borderStyle: "solid",
        borderWidth: "10px",
        borderColor: "#2BB8C1",
        borderRadius: "0.7rem",
        marginLeft: "60px",
      }}
    >
      <p>Name: {name}</p>
      <p style={{ marginTop: "-10px" }}>Email: {email}</p>
      <p style={{ marginTop: "-10px" }}>Subject: {subject}</p>
      <p style={{ marginTop: "-10px" }}>Message: {message}</p>
      <p style={{ marginTop: "-10px" }}>
        Sent on: {new Date(date).toDateString()}
      </p>
    </div>
  );
};

export default UserMessages;
