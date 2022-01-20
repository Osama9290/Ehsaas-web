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

const RequestDonation = () => {
  const classes = useStyles();

  return (
    <div>
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
      <h2 style={{ textAlign: "center", padding: "20px", marginTop: "-40px" }}>
        Request Donation
      </h2>

      <Stack direction="row" spacing={3} justifyContent="center" display="flex">
        <Link to="/request-food">
          <Avatar
            style={{ height: "350px", width: "350px" }}
            alt="food"
            src={food}
          />
        </Link>
        <Link to="/request-used-item">
          <Avatar
            style={{ height: "350px", width: "350px" }}
            alt="useditems"
            src={useditems}
          />
        </Link>
        <Link to="/request-blood">
          <Avatar
            style={{ height: "350px", width: "350px" }}
            alt="blood"
            src={blood}
          />
        </Link>
      </Stack>

      <div style={{ display: "flex" }}>
        <h4 style={{ fontFamily: "roboto", paddingLeft: "230px" }}>Food</h4>
        <h4 style={{ fontFamily: "roboto", paddingLeft: "290px" }}>
          Used Items
        </h4>
        <h4 style={{ fontFamily: "roboto", paddingLeft: "295px" }}>Blood</h4>
      </div>

      <div>
        <p className={classes.quote}>
          Feel free to make a request to get what you need.
        </p>
      </div>
    </div>
  );
};

export default RequestDonation;
