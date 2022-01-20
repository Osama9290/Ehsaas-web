import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Link, NavLink } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import { db, auth } from "../firebase";

const useStyles = makeStyles((theme) => ({
  logo: {
    maxWidth: 60,
    paddingRight: 10,
  },
}));

const Navbar = ({ user }) => {
  const [show, setShow] = useState(false);
  const classes = useStyles();
  const [userType, setUserType] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user && user.uid) {
        if (user.email === "ehsaas.adm@gmail.com") {
          setUserType("admin");
        }
        const donorRef = db.doc(`donor/${user.uid}`);
        const donorSnapshot = await donorRef.get();
        if (donorSnapshot.exists) {
          setUserType("donor");
        }
        const receiverRef = db.doc(`receiver/${user.uid}`);
        const receiverSnapshot = await receiverRef.get();
        if (receiverSnapshot.exists) {
          setUserType("receiver");
        }
        const volunteerRef = db.doc(`volunteer/${user.uid}`);
        const volunteerSnapshot = await volunteerRef.get();
        if (volunteerSnapshot.exists) {
          setUserType("volunteer");
        }
      } else {
        setUserType(null);
      }
    });
  }, []);

  return (
    <section className="navbar-bg">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <img src="./images/logo.png" alt="logo" className={classes.logo} />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShow(!show)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${show ? "show" : ""}`}>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {!user ? (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    HOME
                  </NavLink>
                </li>
              ) : (
                <></>
              )}
              {user && userType == "donor" ? (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/donor-donation-category">
                    HOME
                  </NavLink>
                </li>
              ) : (
                <></>
              )}
              {user && userType == "receiver" ? (
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/receiver-donation-category"
                  >
                    HOME
                  </NavLink>
                </li>
              ) : (
                <></>
              )}
              {user && userType == "volunteer" ? (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/volunteer-portal">
                    HOME
                  </NavLink>
                </li>
              ) : (
                <></>
              )}
              {user && userType == "admin" ? (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin-portal">
                    HOME
                  </NavLink>
                </li>
              ) : (
                <></>
              )}

              <li className="nav-item">
                <NavLink className="nav-link" to="/about-us">
                  ABOUT
                </NavLink>
              </li>

              {!user || userType == "admin" ? (
                <NavDropdown title="SERVICES" id="nav-dropdown">
                  <NavDropdown.Item
                    as={Link}
                    to="/donor-sign-up"
                    eventKey="Donate"
                  >
                    DONATE
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/receiver-sign-up"
                    eventKey="Receive"
                  >
                    RECEIVE
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/receiver-sign-up"
                    eventKey="Request"
                  >
                    REQUEST
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <></>
              )}
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact-us">
                  CONTACT
                </NavLink>
              </li>
              {!user ? (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/volunteer-form">
                    VOLUNTEER
                  </NavLink>
                </li>
              ) : (
                <></>
              )}
              {user && userType == "donor" ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/my-donations">
                      MY DONATIONS
                    </NavLink>
                  </li>
                  <NavDropdown title="REQUESTS" id="nav-dropdown">
                    <NavDropdown.Item as={Link} to="/receivers-interested">
                      Your Donation Requests
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/receiver-requests">
                      General Donation Requests
                    </NavDropdown.Item>
                  </NavDropdown>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/edit-donor-profile">
                      PROFILE
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/chat">
                      CHATS
                    </NavLink>
                  </li>
                </>
              ) : (
                <></>
              )}
              {user && userType == "receiver" ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/request-donation">
                      REQUEST
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/edit-receiver-profile">
                      PROFILE
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/chat">
                      CHATS
                    </NavLink>
                  </li>
                </>
              ) : (
                <></>
              )}
              {user && userType == "volunteer" ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/deliver-donations">
                      DELIVER
                    </NavLink>
                  </li>
                  <NavDropdown title="YOUR DELIVERIES" id="nav-dropdown">
                    <NavDropdown.Item as={Link} to="/in-process-deliveries">
                      In Progress
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/completed-deliveries">
                      Completed
                    </NavDropdown.Item>
                  </NavDropdown>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/edit-volunteer-profile">
                      PROFILE
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/chat">
                      CHATS
                    </NavLink>
                  </li>
                </>
              ) : (
                <></>
              )}
            </ul>
            {/*
            <form className="d-flex">
              <input
                className="form-control me-2 search-style"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-style" type="submit">
                SEARCH
              </button>
            </form>
*/}

            {user ? (
              <NavLink
                className="btn btn-style"
                to="/"
                onClick={() => {
                  auth
                    .signOut()
                    .then(function () {})
                    .catch(function (error) {
                      alert("Unable to log out");
                    });
                }}
              >
                LOGOUT
              </NavLink>
            ) : (
              <>
                <NavDropdown
                  className="btn btn-style"
                  title="SIGN UP"
                  id="nav-dropdown-signup"
                >
                  <NavDropdown.Item
                    as={Link}
                    to="/donor-sign-up"
                    eventKey="Donate"
                  >
                    As Donor
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/receiver-sign-up"
                    eventKey="Receive"
                  >
                    As Receiver
                  </NavDropdown.Item>
                </NavDropdown>

                <NavLink
                  className="btn btn-style"
                  style={{ marginLeft: "10px" }}
                  to="/login"
                >
                  LOGIN
                </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>
    </section>
  );
};

export default Navbar;
