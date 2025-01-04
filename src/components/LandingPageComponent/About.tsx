import React from 'react'

const About = () => {
  return (
    <div className="about-wrapper">
        <div className="about-wrapper-inner">
          <div className="container">
            <div className="aboutus-box">
              <div className="col-sm-4 aboutus-box-image">
                <img
                  src="images/default.png"
                  className="img-responsive max-h-[326px]"
                  alt=""
                />
              </div>
              <div className="col-sm-8 aboutus-box-body">
                <div className="aboutus-box-body-content">
                  <h3>About Us</h3>
                  <p>
                    Our college envisions fostering innovation, excellence, and
                    leadership. Its mission is to empower students through
                    quality education and technical skills, guided by core
                    values of integrity, collaboration, and lifelong learning.
                  </p>
                  <div className="special-text">
                    {" "}
                    <cite>- Dr. S.W. Mohod,</cite>
                    <small>HOD of Computer Engineering</small>{" "}
                  </div>
                </div>
                <div className="about-btn">
                  {" "}
                  <a href="#" className="btn">
                    Register
                  </a>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ backgroundImage: "url('/images/home-1.jpg')" }}
          className="about-bg bg-image"
        ></div>
      </div>
  )
}

export default About