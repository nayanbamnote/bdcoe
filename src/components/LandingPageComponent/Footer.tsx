import React from 'react'

const Footer = () => {
  return (
    <div>
    <div className="footer-wrapper">
    <div className="container">
      <div className="row">
        <div className="col-md-3 col-sm-12">
          <div className="fo-one">
            <h3>Get in touch</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been
            </p>
            <address>
              <strong>Address:</strong> <br />
              No.16 - 12345 street lorem ipsum, <br />
              ipsum City, Country
            </address>
            <span>
              <strong>Phone:</strong> +1-0123-456-789
            </span>
            <span>
              <strong>Email:</strong>{" "}
              <a href="mailto:support@yourdomain.com">
                support@yourdomain.com
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
          © Copyright
          2024, College Education | All Rights Reserved.{" "}
        </div>
      </div>
    </div>
  </div>
  </div>
  )
}

export default Footer