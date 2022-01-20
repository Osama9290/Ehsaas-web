import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Avatar } from "@material-ui/core";
import Stack from "@material-ui/core/Stack";
import food from "../images/food.jpg";
import useditems from "../images/useditems.jpg";
import blood from "../images/blood.jpg";

const useStyles = makeStyles((theme) => ({
  quote: {
    fontFamily: "roboto",
    display: "flex",
    justifyContent: "center",
    fontWeight: "bold",
    paddingTop: "30px",
  },
}));

const DonorDonationCategory = () => {
  const classes = useStyles();

  return (
    <div>
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
      <h2 style={{ textAlign: "center", marginTop: "-40px", padding: "20px" }}>
        Donate
      </h2>

      <Stack direction="row" spacing={3} justifyContent="center" display="flex">
        <Link to="/add-food">
          <Avatar
            style={{ height: "350px", width: "350px" }}
            alt="food"
            src={food}
          />
        </Link>
        <Link to="/add-used-item">
          <Avatar
            style={{ height: "350px", width: "350px" }}
            alt="useditems"
            src={useditems}
          />
        </Link>
        <Link to="/add-blood">
          <Avatar
            style={{ height: "350px", width: "350px" }}
            alt="blood"
            src={blood}
          />
        </Link>
      </Stack>

      <div style={{ display: "flex" }}>
        <h4 style={{ fontFamily: "roboto", paddingLeft: "230px" }}>Food</h4>
        <h4 style={{ fontFamily: "roboto", paddingLeft: "300px" }}>
          Used Items
        </h4>
        <h4 style={{ fontFamily: "roboto", paddingLeft: "290px" }}>Blood</h4>
      </div>

      <div>
        <p className={classes.quote}>
          We make a living by what we get, but we make a life by what we give.
        </p>
      </div>
    </div>
  );
};

export default DonorDonationCategory;
