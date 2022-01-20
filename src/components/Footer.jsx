import React from "react";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-10 mx-auto">
              <div className="row">
                <div className="col-6 col-lg-3">
                  <h2 style={{ fontSize: "1.7rem", paddingTop: "30px" }}>
                    About Ehsaas
                  </h2>
                  <ul>
                    <li>
                      <a href="/about-us">Our Story</a>
                    </li>
                    <li>
                      <a href="/">Our Services</a>
                    </li>
                  </ul>
                </div>

                <div className="col-6 col-lg-3">
                  <h2 style={{ fontSize: "1.7rem", paddingTop: "30px" }}>
                    Get Involved
                  </h2>
                  <ul>
                    <li>
                      <a href="/volunteer-form">Volunteer Form</a>
                    </li>
                    <li>
                      <a href="/contact-us">Contact Us</a>
                    </li>
                  </ul>
                </div>

                <div className="col-6 col-lg-3">
                  <h2 style={{ fontSize: "1.7rem", paddingTop: "30px" }}>
                    Our Services
                  </h2>
                  <ul>
                    <li>
                      <a href="/donor-donation-category">Donate</a>
                    </li>
                    <li>
                      <a href="/receiver-donation-category">Receive</a>
                    </li>
                  </ul>
                </div>

                <div className="col-6 col-lg-3">
                  <h2 style={{ fontSize: "1.7rem", paddingTop: "30px" }}>
                    Follow Us
                  </h2>
                  <div className="row">
                    <div className="col-3 mx-auto">
                      <i class="fab fa-facebook-f fontawesome-style"></i>
                    </div>
                    <div className="col-3 mx-auto">
                      <i class="fab fa-instagram fontawesome-style"></i>
                    </div>
                    <div className="col-3 mx-auto">
                      <i class="fab fa-twitter fontawesome-style"></i>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="mt-5">
                <p className="main-hero-para text-center w-70">
                  Copyright @ Ehsaas 2021 All Rights Reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
