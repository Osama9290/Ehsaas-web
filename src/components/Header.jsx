import React from "react";

const Header = () => {
  return (
    <>
      <header>
        <section className="container main-hero-container">
          <div className="row">
            <div className="col-12 col-lg-6 header-left-side d-flex justify-content-center flex-column align-items-start">
              <h2 className="display-2">EHSAAS</h2>
              <p className="main-hero-para">Pakistan</p>
              <div className="donate-receive-images">
                <a href="/donor-sign-up">
                  <img
                    src="./images/donate.png"
                    alt="donate"
                    style={{ borderRadius: "15rem", maxWidth: 230 }}
                  />
                </a>
                <a href="/receiver-sign-up">
                  <img
                    src="./images/receive.png"
                    alt="receive"
                    style={{ borderRadius: "15rem", maxWidth: 230 }}
                  />
                </a>
                <div className="donate-receive-titles">
                  <p className="donate-title">Donate</p>
                  <p className="receive-title">Receive/Request</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 header-right-side d-flex justify-content-center align-items-center main-herosection-images">
              <img
                src="./images/hero1.png"
                alt="heroimg1"
                className="img-fluid"
              />
              <img
                src="./images/hero2.jpg"
                alt="heroimg2"
                className="img-fluid main-hero-img2"
              />
            </div>
          </div>
        </section>
      </header>
    </>
  );
};

export default Header;
