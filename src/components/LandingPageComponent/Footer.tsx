import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="footer-wrapper">
        <div className="container">
          <div className="row">
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
            {/* <div className="col-md-3 col-sm-12">
            <div className="fo-two">
              <h3>Recent Posts</h3>
              <div className="fo-posts">
                <div className="image-left">
                  <img src="images/post-img1.jpg" alt="" />
                </div>
                <div className="text-box-right">
                  <h4>
                    <a href="#">Mark Warren</a>
                  </h4>
                  <p>Lorem ipsum dolor sit</p>
                  <div className="post-info">
                    {" "}
                    <span>By John Doe</span>
                    <span>May 15</span>{" "}
                  </div>
                </div>
              </div>
              <div className="line"></div>
              <div className="fo-posts">
                <div className="image-left">
                  <img src="images/post-img2.jpg" alt="" />
                </div>
                <div className="text-box-right">
                  <h4>
                    <a href="#">Mark Warren</a>
                  </h4>
                  <p>Lorem ipsum dolor sit</p>
                  <div className="post-info">
                    {" "}
                    <span>By John Doe</span>
                    <span>May 15</span>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-12">
            <div className="fo-three">
              <h3>Tags</h3>
              <ul className="footer-tags">
                <li>
                  <a href="">Responsive</a>
                </li>
                <li>
                  <a href="">About</a>
                </li>
                <li>
                  <a href="">Tabs</a>
                </li>
                <li>
                  <a href="">Tables</a>
                </li>
                <li>
                  <a className="active" href="">
                    Design
                  </a>
                </li>
                <li>
                  <a href="">Servces</a>
                </li>
                <li>
                  <a href="">Blog</a>
                </li>
                <li>
                  <a href="">Gallery</a>
                </li>
                <li>
                  <a href="">Animation</a>
                </li>
                <li>
                  <a href="">Pages</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-3 col-sm-12">
            <div className="fo-four">
              <h3>Gallery</h3>
              <ul className="fo-gal">
                <li>
                  <a href="">
                    <img src="images/post-img1.jpg" alt="" />
                  </a>
                </li>
                <li>
                  <a href="">
                    <img src="images/post-img2.jpg" alt="" />
                  </a>
                </li>
                <li>
                  <a href="">
                    <img src="images/post-img1.jpg" alt="" />
                  </a>
                </li>
                <li>
                  <a href="">
                    <img src="images/post-img2.jpg" alt="" />
                  </a>
                </li>
                <li>
                  <a href="">
                    <img src="images/post-img1.jpg" alt="" />
                  </a>
                </li>
                <li>
                  <a href="">
                    <img src="images/post-img2.jpg" alt="" />
                  </a>
                </li>
              </ul>
            </div>
          </div> */}
          </div>
        </div>
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
