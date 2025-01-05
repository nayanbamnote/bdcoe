import React from "react";
import MapComponent from "./MapComponent";

const Footer = () => {
  return (
    <div>
      <div className="footer-wrapper flex justify-around items-center mx-auto gap-[25px]">
            <div className="col-md-3 col-sm-12">
              <div className="fo-one">
                <h3>Get in touch</h3>
                <p className="max-w-[300px]">
                  Our team is available to assist you from 10:00 AM to 5:00 PM,
                  Monday to Friday. Don't miss out on the chance to be a part of
                  something extraordinary — apply early for admission
                </p>
                <address>
                  <strong>Address:</strong> <br />
                  4, MLK Colony, Sevagram,
                  <br />
                  Maharashtra, India -442102
                </address>
                <span>
                  <strong>Phone:</strong> 07152-284378
                </span>
                <span>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:principal@bdce.edu.in">
                    principal@bdce.edu.in
                  </a>
                </span>
                <span>
                  <strong>Fax:</strong> +1-0123-456-789
                </span>
              </div>
            </div>
            <MapComponent/>
      </div>
      <div className="copyright-wrapper">
        <div className="container">
          <div className="row">
            <div className="fo-copyright-holder col-sm-12 text-center">
              <div className="social-iconbox">
                <ul className="sc-icons">
                  <li>
                    <a className="twitter" href="">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <i className="fa fa-pinterest"></i>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </li>
                </ul>
              </div>
              © Copyright 2024, BDCOE | All Rights Reserved.{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
