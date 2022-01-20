import { auth, db } from "../../firebase";
import { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import firebase from "firebase";
import { Link } from "react-router-dom";
import axios from "axios";

const ReceiveBlood = () => {
  const [bloodInfo, setBloodInfo] = useState([]);
  const [active, setActive] = useState("");
  const [filterCategory, setFilterCategory] = useState(false);

  const dt = firebase.firestore.Timestamp.now().toDate().toString();

  useEffect(async () => {
    db.collection("blood")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          var bloodData = element.data();
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
                setBloodInfo((arr) => [...arr, { bloodData, donorData }]);
              });
            });
        });
      });
  }, []);

  //A+
  const Apositive = async () => {
    db.collection("blood")
      .where("bloodGroup", "==", "A+")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          setBloodInfo([]);
          var bloodData = element.data();
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
                setBloodInfo((arr) => [...arr, { bloodData, donorData }]);
              });
            });
        });
      });
  };

  //A-
  const Anegative = async () => {
    db.collection("blood")
      .where("bloodGroup", "==", "A-")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          setBloodInfo([]);
          var bloodData = element.data();
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
                setBloodInfo((arr) => [...arr, { bloodData, donorData }]);
              });
            });
        });
      });
  };

  //B+
  const Bpositive = async () => {
    db.collection("blood")
      .where("bloodGroup", "==", "B+")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          setBloodInfo([]);
          var bloodData = element.data();
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
                setBloodInfo((arr) => [...arr, { bloodData, donorData }]);
              });
            });
        });
      });
  };

  //B-
  const Bnegative = async () => {
    db.collection("blood")
      .where("bloodGroup", "==", "B-")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          setBloodInfo([]);
          var bloodData = element.data();
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
                setBloodInfo((arr) => [...arr, { bloodData, donorData }]);
              });
            });
        });
      });
  };

  //O+
  const Opositive = async () => {
    db.collection("blood")
      .where("bloodGroup", "==", "O+")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          setBloodInfo([]);
          var bloodData = element.data();
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
                setBloodInfo((arr) => [...arr, { bloodData, donorData }]);
              });
            });
        });
      });
  };

  //O-
  const Onegative = async () => {
    db.collection("blood")
      .where("bloodGroup", "==", "O-")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          setBloodInfo([]);
          var bloodData = element.data();
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
                setBloodInfo((arr) => [...arr, { bloodData, donorData }]);
              });
            });
        });
      });
  };

  //AB+
  const ABpositive = async () => {
    db.collection("blood")
      .where("bloodGroup", "==", "AB+")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          setBloodInfo([]);
          var bloodData = element.data();
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
                setBloodInfo((arr) => [...arr, { bloodData, donorData }]);
              });
            });
        });
      });
  };

  //AB-
  const ABnegative = async () => {
    db.collection("blood")
      .where("bloodGroup", "==", "AB-")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          setBloodInfo([]);
          var bloodData = element.data();
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
                setBloodInfo((arr) => [...arr, { bloodData, donorData }]);
              });
            });
        });
      });
  };

  const punjab = async () => {
    db.collection("blood")
      .where("province", "==", "Punjab")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          setBloodInfo([]);
          var bloodData = element.data();
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
                setBloodInfo((arr) => [...arr, { bloodData, donorData }]);
              });
            });
        });
      });
  };

  //SINDH
  const sindh = async () => {
    db.collection("blood")
      .where("province", "==", "Sindh")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          setBloodInfo([]);
          var bloodData = element.data();
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
                setBloodInfo((arr) => [...arr, { bloodData, donorData }]);
              });
            });
        });
      });
  };

  //KHYBER PAKHTUNKHWA
  const kpk = async () => {
    db.collection("blood")
      .where("province", "==", "Khyber Pakhtunkhwa")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          setBloodInfo([]);
          var bloodData = element.data();
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
                setBloodInfo((arr) => [...arr, { bloodData, donorData }]);
              });
            });
        });
      });
  };

  //BALOCHISTAN
  const balochistan = async () => {
    db.collection("blood")
      .where("province", "==", "Balochistan")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          setBloodInfo([]);
          var bloodData = element.data();
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
                setBloodInfo((arr) => [...arr, { bloodData, donorData }]);
              });
            });
        });
      });
  };

  //AZAD KASHMIR
  const kashmir = async () => {
    db.collection("blood")
      .where("province", "==", "Azad Kashmir")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          setBloodInfo([]);
          var bloodData = element.data();
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
                setBloodInfo((arr) => [...arr, { bloodData, donorData }]);
              });
            });
        });
      });
  };

  //LATEST TO OLD
  const latestToOld = async () => {
    db.collection("blood")
      .orderBy("date", "desc")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((element) => {
          setBloodInfo([]);
          var bloodData = element.data();
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
                setBloodInfo((arr) => [...arr, { bloodData, donorData }]);
              });
            });
        });
      });
  };

  //OLD TO LATEST
  const oldToLatest = async () => {
    db.collection("blood")
      .where("date", "<", "dt")
      .orderBy("date")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((element) => {
          setBloodInfo([]);
          var bloodData = element.data();
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
                setBloodInfo((arr) => [...arr, { bloodData, donorData }]);
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
          Blood Donations
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
              date={item.bloodData.date}
              img={item.bloodData.img}
              donorId={item.bloodData.donorId}
              status={item.bloodData.status}
              donorName={item.donorData.name}
              donorContact={item.donorData.contactNo}
              donorEmail={item.donorData.email}
            />
          ))}
        </Grid>

        <Grid item xs={2}>
          <p>Filter by:</p>

          <p>Blood Group</p>
          <div style={{ flex: "1", flexDirection: "column" }}>
            <input
              type="checkbox"
              onChange={() => {
                setFilterCategory("A+");
              }}
              onClick={() => {
                Apositive();
                setActive("A+");
              }}
              checked={filterCategory === "A+"}
            />
            A+
          </div>

          <div style={{ flex: "1", flexDirection: "column" }}>
            <input
              type="checkbox"
              onChange={() => {
                setFilterCategory("A-");
              }}
              onClick={() => {
                Anegative();
                setActive("A-");
              }}
              checked={filterCategory === "A-"}
            />
            A-
          </div>
          <div style={{ flex: "1", flexDirection: "column" }}>
            <input
              type="checkbox"
              onChange={() => {
                setFilterCategory("B+");
              }}
              onClick={() => {
                Bpositive();
                setActive("B+");
              }}
              checked={filterCategory === "B+"}
            />
            B+
          </div>
          <div style={{ flex: "1", flexDirection: "column" }}>
            <input
              type="checkbox"
              onChange={() => {
                setFilterCategory("B-");
              }}
              onClick={() => {
                Bnegative();
                setActive("B-");
              }}
              checked={filterCategory === "B-"}
            />
            B-
          </div>
          <div style={{ flex: "1", flexDirection: "column" }}>
            <input
              type="checkbox"
              onChange={() => {
                setFilterCategory("O+");
              }}
              onClick={() => {
                Opositive();
                setActive("O+");
              }}
              checked={filterCategory === "O+"}
            />
            O+
          </div>
          <div style={{ flex: "1", flexDirection: "column" }}>
            <input
              type="checkbox"
              onChange={() => {
                setFilterCategory("O-");
              }}
              onClick={() => {
                Onegative();
                setActive("O-");
              }}
              checked={filterCategory === "O-"}
            />
            O-
          </div>
          <div style={{ flex: "1", flexDirection: "column" }}>
            <input
              type="checkbox"
              onChange={() => {
                setFilterCategory("AB+");
              }}
              onClick={() => {
                ABpositive();
                setActive("AB+");
              }}
              checked={filterCategory === "AB+"}
            />
            AB+
          </div>
          <div style={{ flex: "1", flexDirection: "column" }}>
            <input
              type="checkbox"
              onChange={() => {
                setFilterCategory("AB-");
              }}
              onClick={() => {
                ABnegative();
                setActive("AB-");
              }}
              checked={filterCategory === "AB-"}
            />
            AB-
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

    await axios.post("http://localhost:2000/donor-blood-donation-email/", {
      t: donorEmail,
      l: link,
      r: receiverName,
      rc: receiverContact,
      b: bloodGroup,
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
            type="submit"
            style={{
              backgroundColor: "#2BB8C1",
              color: "black",
              borderRadius: "0.7rem",
              textTransform: "capitalize",
              marginLeft: "85px",
            }}
            onClick={() => {
              alert(
                "The donor has been notified of your need. You will receive an email and message if he/she accepts your request."
              );

              db.collection("blood")
                .where("bloodGroup", "==", bloodGroup)
                .where("age", "==", age)
                .get()
                .then(function (querySnapshot) {
                  querySnapshot.forEach(function (doc) {
                    var bloodId = doc.id;
                    db.collection("interested").add({
                      donationId: bloodId,
                      receiverId: db
                        .collection("receiver")
                        .doc(auth.currentUser.uid),
                      donorId: donorId,
                      via: "hospital",
                      donationCategory: "blood",
                      status: "in progress",
                      date: firebase.firestore.Timestamp.now()
                        .toDate()
                        .toString(),
                    });
                  });
                });
              fetch(donorEmail, link, bloodGroup, donorName);
            }}
          >
            I need it
          </Button>
        </Link>
      </div>
    );
  } else {
    return null;
  }
};

export default ReceiveBlood;
