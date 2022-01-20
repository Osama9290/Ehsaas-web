import React from "react";
import img from "./images/about.svg";

const AboutUs = () => {
  return (
    <>
      <div
        style={{ height: "200px", width: "100%", backgroundColor: "#2BB8C1" }}
      >
        <h2
          style={{
            textAlign: "center",
            paddingTop: "50px",
            paddingBottom: "20px",
          }}
        >
          About Us
        </h2>
        <p style={{ textAlign: "center" }}>
          Ehsaas is a platform designed to avoid the wastage of resources and
          cater the needs of the less privileged.
        </p>
      </div>
      <div>
        <img
          style={{ display: "block", marginLeft: "auto", marginRight: "auto" }}
          src={img}
        />
      </div>
    </>
  );
};

export default AboutUs;
