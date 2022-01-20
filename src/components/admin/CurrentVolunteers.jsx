import { db } from "../../firebase";
import { useState, useEffect } from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import { Modal } from "react-bootstrap";
import firebase from "firebase";
import axios from "axios";

const CurrentVolunteers = () => {
  const [volunteerInfo, setVolunteerInfo] = useState([]);
  const [active, setActive] = useState("");
  const [filterCategory, setFilterCategory] = useState(false);

  const dt = firebase.firestore.Timestamp.now().toDate().toString();

  useEffect(async () => {
    db.collection("volunteer").onSnapshot((querySnapshot) => {
      var volunteerData = [];
      querySnapshot.forEach((element) => {
        volunteerData.push(element.data());
      });
      setVolunteerInfo(volunteerData);
    });
  }, []);

  //ACTIVE
  const fetchActiveStatus = async () => {
    db.collection("volunteer")
      .where("status", "==", "active")
      .get()
      .then((querySnapshot) => {
        setVolunteerInfo([]);
        querySnapshot.forEach((element) => {
          var volunteerData = element.data();
          setVolunteerInfo((arr) => [...arr, volunteerData]);
        });
      });
  };

  //INACTIVE
  const fetchInactiveStatus = async () => {
    db.collection("volunteer")
      .where("status", "==", "inactive")
      .get()
      .then((querySnapshot) => {
        setVolunteerInfo([]);
        querySnapshot.forEach((element) => {
          var volunteerData = element.data();
          setVolunteerInfo((arr) => [...arr, volunteerData]);
        });
      });
  };

  //LATEST TO OLD
  const latestToOld = async () => {
    db.collection("volunteer")
      .orderBy("date", "desc")
      .onSnapshot((querySnapshot) => {
        setVolunteerInfo([]);
        querySnapshot.forEach((element) => {
          var volunteerData = element.data();
          setVolunteerInfo((arr) => [...arr, volunteerData]);
        });
      });
  };

  //OLD TO LATEST
  const oldToLatest = async () => {
    db.collection("volunteer")
      .where("date", "<", "dt")
      .orderBy("date")
      .onSnapshot((querySnapshot) => {
        setVolunteerInfo([]);
        querySnapshot.forEach((element) => {
          var volunteerData = element.data();
          setVolunteerInfo((arr) => [...arr, volunteerData]);
        });
      });
  };

  //PUNJAB
  const punjab = async () => {
    db.collection("volunteer")
      .where("province", "==", "Punjab")
      .get()
      .then((querySnapshot) => {
        setVolunteerInfo([]);
        querySnapshot.forEach((element) => {
          var volunteerData = element.data();
          setVolunteerInfo((arr) => [...arr, volunteerData]);
        });
      });
  };

  //SINDH
  const sindh = async () => {
    db.collection("volunteer")
      .where("province", "==", "Sindh")
      .get()
      .then((querySnapshot) => {
        setVolunteerInfo([]);
        querySnapshot.forEach((element) => {
          var volunteerData = element.data();
          setVolunteerInfo((arr) => [...arr, volunteerData]);
        });
      });
  };

  //KHYBER PAKHTUNKHWA
  const kpk = async () => {
    db.collection("volunteer")
      .where("province", "==", "Khyber Pakhtunkhwa")
      .get()
      .then((querySnapshot) => {
        setVolunteerInfo([]);
        querySnapshot.forEach((element) => {
          var volunteerData = element.data();
          setVolunteerInfo((arr) => [...arr, volunteerData]);
        });
      });
  };

  //BALOCHISTAN
  const balochistan = async () => {
    db.collection("volunteer")
      .where("province", "==", "Balochistan")
      .get()
      .then((querySnapshot) => {
        setVolunteerInfo([]);
        querySnapshot.forEach((element) => {
          var volunteerData = element.data();
          setVolunteerInfo((arr) => [...arr, volunteerData]);
        });
      });
  };

  //AZAD KASHMIR
  const kashmir = async () => {
    db.collection("volunteer")
      .where("province", "==", "Azad Kashmir")
      .get()
      .then((querySnapshot) => {
        setVolunteerInfo([]);
        querySnapshot.forEach((element) => {
          var volunteerData = element.data();
          setVolunteerInfo((arr) => [...arr, volunteerData]);
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
            marginTop: "-40px",
          }}
        >
          All Volunteers
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
          paddingLeft="40px"
          paddingTop="30px"
        >
          {volunteerInfo.map((volunteerData) => (
            <Frame
              name={volunteerData.name}
              email={volunteerData.email}
              contactNo={volunteerData.contactNo}
              province={volunteerData.province}
              city={volunteerData.city}
              age={volunteerData.age}
              occupation={volunteerData.occupation}
              institution={volunteerData.institution}
              status={volunteerData.status}
              createdAt={volunteerData.createdAt}
              deliveryCount={volunteerData.deliveryCount}
            />
          ))}
        </Grid>

        <Grid item xs={2}>
          <p>Filter by:</p>
          <p>Status</p>
          <div style={{ flex: "1", flexDirection: "column" }}>
            <input
              type="checkbox"
              onChange={() => {
                setFilterCategory("active");
              }}
              onClick={() => {
                fetchActiveStatus();
                setActive("active");
              }}
              checked={filterCategory === "active"}
            />
            Active
          </div>
          <div style={{ flex: "1", flexDirection: "column" }}>
            <input
              type="checkbox"
              onChange={() => {
                setFilterCategory("inactive");
              }}
              onClick={() => {
                fetchInactiveStatus();
                setActive("inactive");
              }}
              checked={filterCategory === "inactive"}
            />
            Inactive
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

const Frame = ({
  name,
  email,
  contactNo,
  province,
  city,
  age,
  occupation,
  institution,
  createdAt,
  status,
  deliveryCount,
}) => {
  const [show, setShow] = useState(false);
  const [reason, setReason] = useState("");
  const [msg, setMsg] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    db.collection("volunteer")
      .where("email", "==", email)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.update({
            status: "inactive",
          });
          handleClose();
          alert("Volunteer removed successfully!");
        });
      });
    db.collection("volunteer")
      .where("email", "==", email)
      .onSnapshot((querySnapshot) => {
        var status = [];
        querySnapshot.forEach((doc) => {
          status.push(doc.data().status);
        });
      });
  };

  return (
    <div
      style={{
        padding: "20px",
        marginTop: "30px",
        borderStyle: "solid",
        borderWidth: "10px",
        borderColor: "#2BB8C1",
        borderRadius: "0.7rem",
        marginLeft: "30px",
      }}
    >
      <p>Name: {name}</p>
      <p style={{ marginTop: "-10px" }}>Email: {email}</p>
      <p style={{ marginTop: "-10px" }}>Contact No.: {contactNo}</p>
      <p style={{ marginTop: "-10px" }}>Province: {province}</p>
      <p style={{ marginTop: "-10px" }}>City: {city}</p>
      <p style={{ marginTop: "-10px" }}>Age: {age}</p>
      <p style={{ marginTop: "-10px" }}>Occupation: {occupation}</p>
      <p style={{ marginTop: "-10px" }}>Institution: {institution}</p>
      <p style={{ marginTop: "-10px" }}>
        Joined: {new Date(createdAt).toDateString()}
      </p>
      <p style={{ marginTop: "-10px" }}>Delivery Count: {deliveryCount}</p>
      <p style={{ marginTop: "-10px" }}>Status: {status}</p>

      {status == "active" ? (
        <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                Please provide a reason so that we can notify the volunteer
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={(e) => handleSubmit(e)}>
                <TextField
                  style={{ backgroundColor: "#E5E5E5", marginBottom: "10px" }}
                  label="Reason"
                  fullWidth
                  value={reason}
                  required="true"
                  inputProps={{ minLength: 3, maxLength: 30 }}
                  onChange={(e) => {
                    var letters = /^[a-zA-Z\s]*$/;
                    if (e.target.value === "" || letters.test(e.target.value)) {
                      setReason(e.target.value);
                    }
                  }}
                />

                <Button
                  onClick={async () => {
                    await axios
                      .post("http://localhost:2000/volunteer-email/", {
                        email,
                        reason,
                        name,
                      })
                      .then((response) => setMsg(response.data.respMesg));
                  }}
                  type="submit"
                  style={{
                    backgroundColor: "#2BB8C1",
                    color: "black",
                    borderRadius: "0.7rem",
                    textTransform: "capitalize",
                    marginLeft: "395px",
                  }}
                >
                  SUBMIT
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
              marginLeft: "80px",
            }}
          >
            REMOVE
          </Button>
        </>
      ) : (
        <></>
      )}
      {status == "inactive" ? (
        <Button
          type="submit"
          onClick={() => {
            db.collection("volunteer")
              .where("email", "==", email)
              .get()
              .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                  doc.ref.update({
                    status: "active",
                  });

                  alert("Volunteer activated successfully!");
                });
              });
            db.collection("volunteer")
              .where("email", "==", email)
              .onSnapshot((querySnapshot) => {
                var status = [];
                querySnapshot.forEach((doc) => {
                  status.push(doc.data().status);
                });
              });
          }}
          style={{
            backgroundColor: "#2BB8C1",
            color: "black",
            borderRadius: "0.7rem",
            marginLeft: "75px",
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

export default CurrentVolunteers;
