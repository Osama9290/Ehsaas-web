import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import admin from "../images/admin.svg";

const AdminPortal = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={7.5}>
        <img
          src={admin}
          alt=" "
          width="720"
          height="500"
          flex={1}
          flexDirection="column"
        />
      </Grid>

      <Grid item xs={4}>
        <h2
          className="container"
          style={{ textAlign: "center", paddingTop: "50px" }}
        >
          Admin Portal
        </h2>

        <Link to="/listed-donations" style={{ textDecoration: "none" }}>
          <Button
            type="submit"
            style={{
              backgroundColor: "#2BB8C1",
              color: "black",
              borderRadius: "0.7rem",
              textTransform: "capitalize",
              marginTop: "20px",
              fontSize: "medium",
              marginLeft: "120px",
            }}
          >
            Listed Donations
          </Button>
        </Link>

        <Grid item xs={9}>
          <Link to="/received-donations" style={{ textDecoration: "none" }}>
            <Button
              type="submit"
              style={{
                backgroundColor: "#2BB8C1",
                color: "black",
                borderRadius: "0.7rem",
                textTransform: "capitalize",
                marginTop: "30px",
                fontSize: "medium",
                marginLeft: "110px",
              }}
            >
              Received Donations
            </Button>
          </Link>
        </Grid>

        <Grid item xs={9}>
          <Link to="/current-volunteers" style={{ textDecoration: "none" }}>
            <Button
              type="submit"
              style={{
                backgroundColor: "#2BB8C1",
                color: "black",
                borderRadius: "0.7rem",
                textTransform: "capitalize",
                marginTop: "30px",
                fontSize: "medium",
                marginLeft: "115px",
              }}
            >
              Current Volunteers
            </Button>
          </Link>

          <Link to="/view-requests" style={{ textDecoration: "none" }}>
            <Button
              type="submit"
              style={{
                backgroundColor: "#2BB8C1",
                color: "black",
                borderRadius: "0.7rem",
                textTransform: "capitalize",
                marginTop: "30px",
                fontSize: "medium",
                marginLeft: "115px",
              }}
            >
              Donation Requests
            </Button>
          </Link>

          <Grid item xs={15}>
            <Link to="/user-messages" style={{ textDecoration: "none" }}>
              <Button
                type="submit"
                style={{
                  backgroundColor: "#2BB8C1",
                  color: "black",
                  borderRadius: "0.7rem",
                  textTransform: "capitalize",
                  marginTop: "30px",
                  fontSize: "medium",
                  marginLeft: "128px",
                }}
              >
                User Messages
              </Button>
            </Link>

            <Link to="/progress" style={{ textDecoration: "none" }}>
              <Button
                type="submit"
                style={{
                  backgroundColor: "#2BB8C1",
                  color: "black",
                  borderRadius: "0.7rem",
                  textTransform: "capitalize",
                  marginTop: "30px",
                  fontSize: "medium",
                  marginLeft: "155px",
                }}
              >
                Progress
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AdminPortal;
