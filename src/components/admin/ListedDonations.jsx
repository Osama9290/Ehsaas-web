import { db } from "../../firebase";
import { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import firebase from "firebase";

const ListedDonations = () => {
  const [foodInfo, setFoodInfo] = useState([]);
  const [itemInfo, setItemInfo] = useState([]);
  const [bloodInfo, setBloodInfo] = useState([]);

  const [active, setActive] = useState("");
  const [filterCategory, setFilterCategory] = useState(false);

  const dt = firebase.firestore.Timestamp.now().toDate().toString();

  useEffect(async () => {
    db.collection("food")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          var foodData = element.data();
          setFoodInfo((arr) => [...arr, foodData]);
        });
      });
    db.collection("usedItems")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          var itemData = element.data();
          setItemInfo((arr) => [...arr, itemData]);
        });
      });
    db.collection("blood")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          var bloodData = element.data();
          setBloodInfo((arr) => [...arr, bloodData]);
        });
      });
  }, []);

  const fetchFoodData = async () => {
    db.collection("food")
      .get()
      .then((querySnapshot) => {
        setFoodInfo([]);
        setItemInfo([]);
        setBloodInfo([]);
        querySnapshot.forEach((element) => {
          var foodData = element.data();
          setFoodInfo((arr) => [...arr, foodData]);
        });
      });
  };

  const fetchItemData = async () => {
    db.collection("usedItems")
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
    db.collection("blood")
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
      .collection("food")
      .orderBy("date", "desc")
      .onSnapshot((querySnapshot) => {
        setFoodInfo([]);
        querySnapshot.forEach((element) => {
          var foodData = element.data();
          setFoodInfo((arr) => [...arr, foodData]);
        });
      }) &&
      db
        .collection("usedItems")
        .orderBy("date", "desc")
        .onSnapshot((querySnapshot) => {
          setItemInfo([]);
          querySnapshot.forEach((element) => {
            var itemData = element.data();
            setItemInfo((arr) => [...arr, itemData]);
          });
        }) &&
      db
        .collection("blood")
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
      .collection("food")
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

  //PUNJAB
  const punjab = async () => {
    db
      .collection("food")
      .where("province", "==", "Punjab")
      .get()
      .then((querySnapshot) => {
        setFoodInfo([]);
        querySnapshot.forEach((element) => {
          var foodData = element.data();
          setFoodInfo((arr) => [...arr, foodData]);
        });
      }) &&
      db
        .collection("usedItems")
        .where("province", "==", "Punjab")
        .get()
        .then((querySnapshot) => {
          setItemInfo([]);
          querySnapshot.forEach((element) => {
            var itemData = element.data();
            setItemInfo((arr) => [...arr, itemData]);
          });
        }) &&
      db
        .collection("blood")
        .where("province", "==", "Punjab")
        .get()
        .then((querySnapshot) => {
          setBloodInfo([]);
          querySnapshot.forEach((element) => {
            var bloodData = element.data();
            setBloodInfo((arr) => [...arr, bloodData]);
          });
        });
  };

  //SINDH
  const sindh = async () => {
    db
      .collection("food")
      .where("province", "==", "Sindh")
      .get()
      .then((querySnapshot) => {
        setFoodInfo([]);
        querySnapshot.forEach((element) => {
          var foodData = element.data();
          setFoodInfo((arr) => [...arr, foodData]);
        });
      }) &&
      db
        .collection("usedItems")
        .where("province", "==", "Sindh")
        .get()
        .then((querySnapshot) => {
          setItemInfo([]);
          querySnapshot.forEach((element) => {
            var itemData = element.data();
            setItemInfo((arr) => [...arr, itemData]);
          });
        }) &&
      db
        .collection("blood")
        .where("province", "==", "Sindh")
        .get()
        .then((querySnapshot) => {
          setBloodInfo([]);
          querySnapshot.forEach((element) => {
            var bloodData = element.data();
            setBloodInfo((arr) => [...arr, bloodData]);
          });
        });
  };

  //KHYBER PAKHTUNKHWA
  const kpk = async () => {
    db
      .collection("food")
      .where("province", "==", "Khyber Pakhtunkhwa")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          setFoodInfo([]);
          var foodData = element.data();
          setFoodInfo((arr) => [...arr, foodData]);
        });
      }) &&
      db
        .collection("usedItems")
        .where("province", "==", "Khyber Pakhtunkhwa")
        .get()
        .then((querySnapshot) => {
          setItemInfo([]);
          querySnapshot.forEach((element) => {
            var itemData = element.data();
            setItemInfo((arr) => [...arr, itemData]);
          });
        }) &&
      db
        .collection("blood")
        .where("province", "==", "Khyber Pakhtunkhwa")
        .get()
        .then((querySnapshot) => {
          setBloodInfo([]);
          querySnapshot.forEach((element) => {
            var bloodData = element.data();
            setBloodInfo((arr) => [...arr, bloodData]);
          });
        });
  };

  //BALOCHISTAN
  const balochistan = async () => {
    db
      .collection("food")
      .where("province", "==", "Balochistan")
      .get()
      .then((querySnapshot) => {
        setFoodInfo([]);
        querySnapshot.forEach((element) => {
          var foodData = element.data();
          setFoodInfo((arr) => [...arr, foodData]);
        });
      }) &&
      db
        .collection("usedItems")
        .where("province", "==", "Balochistan")
        .get()
        .then((querySnapshot) => {
          setItemInfo([]);
          querySnapshot.forEach((element) => {
            var itemData = element.data();
            setItemInfo((arr) => [...arr, itemData]);
          });
        }) &&
      db
        .collection("blood")
        .where("province", "==", "Balochistan")
        .get()
        .then((querySnapshot) => {
          setBloodInfo([]);
          querySnapshot.forEach((element) => {
            var bloodData = element.data();
            setBloodInfo((arr) => [...arr, bloodData]);
          });
        });
  };

  //AZAD KASHMIR
  const kashmir = async () => {
    db
      .collection("food")
      .where("province", "==", "Azad Kashmir")
      .get()
      .then((querySnapshot) => {
        setFoodInfo([]);
        querySnapshot.forEach((element) => {
          var foodData = element.data();
          setFoodInfo((arr) => [...arr, foodData]);
        });
      }) &&
      db
        .collection("usedItems")
        .where("province", "==", "Azad Kashmir")
        .get()
        .then((querySnapshot) => {
          setItemInfo([]);
          querySnapshot.forEach((element) => {
            var itemData = element.data();
            setItemInfo((arr) => [...arr, itemData]);
          });
        }) &&
      db
        .collection("blood")
        .where("province", "==", "Azad Kashmir")
        .get()
        .then((querySnapshot) => {
          setBloodInfo([]);
          querySnapshot.forEach((element) => {
            var bloodData = element.data();
            setBloodInfo((arr) => [...arr, bloodData]);
          });
        });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h2
          className="container"
          style={{
            textAlign: "center",
            paddingTop: "40px",
            paddingBottom: "20px",
          }}
        >
          Listed Donations
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
          {foodInfo.map((foodData) => (
            <Frame1
              name={foodData.name}
              quantity={foodData.quantity}
              streetAddress={foodData.streetAddress}
              province={foodData.province}
              city={foodData.city}
              category={foodData.category}
              date={foodData.date}
              img={foodData.img}
              status={foodData.status}
            />
          ))}

          {itemInfo.map((itemData) => (
            <Frame2
              name={itemData.name}
              quantity={itemData.quantity}
              streetAddress={itemData.streetAddress}
              province={itemData.province}
              city={itemData.city}
              category={itemData.category}
              date={itemData.date}
              img={itemData.img}
              rating={itemData.rating}
              description={itemData.description}
              size={itemData.size}
              brand={itemData.brand}
              author={itemData.author}
              edition={itemData.edition}
              otherCategory={itemData.otherCategory}
              status={itemData.status}
            />
          ))}

          {bloodInfo.map((bloodData) => (
            <Frame3
              bloodGroup={bloodData.bloodGroup}
              age={bloodData.age}
              lastDonated={bloodData.lastDonated}
              illness={bloodData.illness}
              currentMedication={bloodData.currentMedication}
              vaccination={bloodData.vaccination}
              bloodTransfusion={bloodData.bloodTransfusion}
              smoking={bloodData.smoking}
              province={bloodData.province}
              city={bloodData.city}
              date={bloodData.date}
              img={bloodData.img}
              status={bloodData.status}
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

      <p>Name: {name}</p>
      <p style={{ marginTop: "-10px" }}>Quantity: {quantity}</p>
      <p style={{ marginTop: "-10px" }}>Street Address: {streetAddress}</p>
      <p style={{ marginTop: "-10px" }}>Province: {province}</p>
      <p style={{ marginTop: "-10px" }}>City: {city}</p>
      <p style={{ marginTop: "-10px" }}>Category: {category}</p>
      <p style={{ marginTop: "-10px" }}>Status: {status}</p>
      <p style={{ marginTop: "-10px" }}>
        Date: {new Date(date).toDateString()}
      </p>
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

      <p>Name: {name}</p>
      <p style={{ marginTop: "-10px" }}>Quantity: {quantity}</p>
      <p style={{ marginTop: "-10px" }}>Street Address: {streetAddress}</p>
      <p style={{ marginTop: "-10px" }}>Province: {province}</p>
      <p style={{ marginTop: "-10px" }}>City: {city}</p>
      <p style={{ marginTop: "-10px" }}>Category: {category}</p>
      <p style={{ marginTop: "-10px" }}>Status: {status}</p>
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
  date,
  img,
  status,
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

      <p>Blood Group: {bloodGroup}</p>
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
      <p style={{ marginTop: "-10px" }}>Status: {status}</p>
      <p style={{ marginTop: "-10px" }}>
        Date: {new Date(date).toDateString()}
      </p>
    </div>
  );
};

export default ListedDonations;
