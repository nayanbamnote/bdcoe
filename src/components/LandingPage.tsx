import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import '@/css/animate.css'
import '@/css/bootstrap.min.css'
import '@/css/font-awesome.min.css'
import '@/css/meanmenu.css'
import '@/css/one.css'
import '@/css/style.css'
import Header from "./LandingPageComponent/Header";
import Footer from "./LandingPageComponent/Footer";


const LandingPage = () => {
  return (
    <section>
      {/* <!-- Pre Loader --> */}
      {/* <div id="dvLoading"></div> */}

      {/* <!-- Banner Wrapper Start --> */}

      <div className="banner-wrapper">
        <div
          className="carousel fade-carousel slide"
          data-ride="carousel"
          data-interval="4000"
          id="bs-carousel">
          {/* <!-- Overlay --> */}
          <div className="overlay"></div>
          {/* <!-- Indicators --> */}
          <ol className="carousel-indicators">
            <li
              data-target="#bs-carousel"
              data-slide-to="0"
              className="active"></li>
            <li data-target="#bs-carousel" data-slide-to="1"></li>
            <li data-target="#bs-carousel" data-slide-to="2"></li>
          </ol>
          {/* <!-- Wrapper for slides --> */}
          <div className="carousel-inner">
            <div className="item slides active">
              <div className="slide-1">
                <img src="images/banner.jpg" alt="" />
              </div>
              <div className="hero">
                <h1 className="animated1 whitespace-nowrap">College Education</h1>
                <h3 className="animated2">Multipurpose Responsive Template</h3>
              </div>
            </div>
            <div className="item slides">
              <div className="slide-2">
                <img src="images/banner1.jpg" alt="" />
              </div>
              <div className="hero">
                <h1 className="animated1">College Education</h1>
                <h3 className="animated2">Multipurpose Responsive Template</h3>
              </div>
            </div>
            <div className="item slides">
              <div className="slide-3">
                <img src="images/banner2.jpg" alt="" />
              </div>
              <div className="hero">
                <h1 className="animated1">College Education</h1>
                <h3 className="animated2">Multipurpose Responsive Template</h3>
              </div>
            </div>
          </div>
          <a
            className="left carousel-control"
            href="#bs-carousel"
            data-slide="prev">
            <span className="transition3s glyphicon glyphicon-chevron-left fa fa-angle-left"></span>
          </a>{" "}
          <a
            className="right carousel-control"
            href="#bs-carousel"
            data-slide="next">
            <span className="transition3s glyphicon glyphicon-chevron-right fa fa-angle-right"></span>
          </a>{" "}
        </div>
      </div>

      {/* <!-- Banner Wrapper End -->  */}

      {/* <!-- Callouts Wrapper Start --> */}

      <div className="callouts-wrapper">
        <div className="container">
          <div className="row">
            <div className="title">
              <h2>
                Welcome to <span>College Education</span>
              </h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry
              </p>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="callouts">
                <div className="callouts-box text-center">
                  <div className="icon-box">
                    <i className="fa fa-book"></i>
                  </div>
                  <div className="box-header">
                    <h3>Awesome Courses</h3>
                  </div>
                  <div className="divider bg-primary"></div>
                  <div className="box-body">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="callouts">
                <div className="callouts-box text-center">
                  <div className="icon-box">
                    <i className="fa fa-users " aria-hidden="true"></i>
                  </div>
                  <div className="box-header">
                    <h3>Qualified Teachers</h3>
                  </div>
                  <div className="divider bg-primary"></div>
                  <div className="box-body">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="callouts">
                <div className="callouts-box text-center">
                  <div className="icon-box">
                    <i className="fa fa-android" aria-hidden="true"></i>
                  </div>
                  <div className="box-header">
                    <h3>App Development</h3>
                  </div>
                  <div className="divider bg-primary"></div>
                  <div className="box-body">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="callouts">
                <div className="callouts-box text-center">
                  <div className="icon-box">
                    <i className="fa fa-globe" aria-hidden="true"></i>
                  </div>
                  <div className="box-header">
                    <h3>Online classNamees</h3>
                  </div>
                  <div className="divider bg-primary"></div>
                  <div className="box-body">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="callouts">
                <div className="callouts-box text-center">
                  <div className="icon-box">
                    <i className="fa fa-truck" aria-hidden="true"></i>
                  </div>
                  <div className="box-header">
                    <h3>Transportation</h3>
                  </div>
                  <div className="divider bg-primary"></div>
                  <div className="box-body">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="callouts">
                <div className="callouts-box text-center">
                  <div className="icon-box">
                    <i className="fa fa-users" aria-hidden="true"></i>
                  </div>
                  <div className="box-header">
                    <h3>Customer Support</h3>
                  </div>
                  <div className="divider bg-primary"></div>
                  <div className="box-body">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Callouts Wrapper End -->  */}

      {/* <!-- About us wrapper start --> */}

      <div className="about-wrapper">
        <div className="about-wrapper-inner">
          <div className="container">
            <div className="aboutus-box">
              <div className="col-sm-4 aboutus-box-image">
                <img
                  src="images/about-person.jpg"
                  className="img-responsive"
                  alt=""
                />
              </div>
              <div className="col-sm-8 aboutus-box-body">
                <div className="aboutus-box-body-content">
                  <h3>About Us</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et sed do eiusmod
                    tempor incididunt ut labore etsed do eiusmod tempor
                    incididunt ut labore etsed do eiusmod tempor incididunt ut
                    labore et sed do eiusmod tempor incididunt ut labore et.
                  </p>
                  <div className="special-text">
                    {" "}
                    <cite>- Les Williams,</cite>
                    <small>CEO at College Education</small>{" "}
                  </div>
                </div>
                <div className="about-btn">
                  {" "}
                  <a href="#" className="btn">
                    Book A Appointment
                  </a>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ backgroundImage: "url('/images/home-1.jpg')" }}
          className="about-bg bg-image"></div>
      </div>

      {/* <!-- About us wrapper End -->  */}

      {/* <!-- Team Wrapper Start --> */}

      <div className="team-wrapper team">
        <div className="container">
          <div className="row">
            <div className="title">
              <h2>
                Expert <span>Team</span>
              </h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry
              </p>
            </div>
            <div className="col-sm-6 col-md-3">
              <div className="team-wrap">
                <div className="thumbnail thumbnail-model">
                  <figure className="thumbnail-image">
                    <img src="images/team1.jpg" alt="" />{" "}
                  </figure>
                  <div className="thumbnail-inner">
                    <div className="link-group">
                      <i className="fa fa-phone"></i>
                      <a href="#" className="link-white">
                        +1 (123) 456 7890
                      </a>
                    </div>
                    <div className="link-group">
                      <i className="fa fa-envelope"></i>
                      <a href="#" className="link-white">
                        info@demolink.org
                      </a>
                    </div>
                  </div>
                  <div className="thumbnail-caption">
                    <p className="text-header">
                      <a href="#">Anne Kemper</a>
                    </p>
                    <div className="divider divider-md bg-teak"></div>
                    <p className="text-caption">Mraketing Expert</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div className="team-wrap">
                <div className="thumbnail thumbnail-model">
                  <figure className="thumbnail-image">
                    <img src="images/team2.jpg" alt="" />{" "}
                  </figure>
                  <div className="thumbnail-inner">
                    <div className="link-group">
                      <i className="fa fa-phone"></i>
                      <a href="#" className="link-white">
                        +1 (123) 456 7890
                      </a>
                    </div>
                    <div className="link-group">
                      <i className="fa fa-envelope"></i>
                      <a href="#" className="link-white">
                        info@demolink.org
                      </a>
                    </div>
                  </div>
                  <div className="thumbnail-caption">
                    <p className="text-header">
                      <a href="#">Doris Wilson</a>
                    </p>
                    <div className="divider divider-md bg-teak"></div>
                    <p className="text-caption">Business Expert</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-3 space">
              <div className="team-wrap">
                <div className="thumbnail thumbnail-model">
                  <figure className="thumbnail-image">
                    <img src="images/team3.jpg" alt="" />{" "}
                  </figure>
                  <div className="thumbnail-inner">
                    <div className="link-group">
                      <i className="fa fa-phone"></i>
                      <a href="#" className="link-white">
                        +1 (123) 456 7890
                      </a>
                    </div>
                    <div className="link-group">
                      <i className="fa fa-envelope"></i>
                      <a href="#" className="link-white">
                        info@demolink.org
                      </a>
                    </div>
                  </div>
                  <div className="thumbnail-caption">
                    <p className="text-header">
                      <a href="#">Amanda Smith</a>
                    </p>
                    <div className="divider divider-md bg-teak"></div>
                    <p className="text-caption">Marketing Expert</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div className="team-wrap">
                <div className="thumbnail thumbnail-model">
                  <figure className="thumbnail-image">
                    <img src="images/team4.jpg" alt="" />{" "}
                  </figure>
                  <div className="thumbnail-inner">
                    <div className="link-group">
                      <i className="fa fa-phone"></i>
                      <a href="#" className="link-white">
                        +1 (123) 456 7890
                      </a>
                    </div>
                    <div className="link-group">
                      <i className="fa fa-envelope"></i>
                      <a href="#" className="link-white">
                        info@demolink.org
                      </a>
                    </div>
                  </div>
                  <div className="thumbnail-caption">
                    <p className="text-header">
                      <a href="#">Amanda Smith</a>
                    </p>
                    <div className="divider divider-md bg-teak"></div>
                    <p className="text-caption">Business Expert</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Team Wrapper End -->  */}

      {/* <!-- Testimonials Wrapper Start --> */}

      <div className="testimonials-wrapper">
        <div className="container">
          <div className="row">
            <div className="title">
              <h2>
                Client <span className="!text-[#3eb2ce]">Testimonials</span>
              </h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry
              </p>
            </div>
            <div
              id="myCarousel1"
              className="carousel slide"
              data-ride="carousel">
              {/* <!-- Testimonials Indicators --> */}

              <ol className="carousel-indicators">
                <li
                  data-target="#myCarousel1"
                  data-slide-to="0"
                  className=""></li>
                <li
                  data-target="#myCarousel1"
                  data-slide-to="1"
                  className=""></li>
                <li
                  data-target="#myCarousel1"
                  data-slide-to="2"
                  className="active"></li>
              </ol>

              {/* <!-- Testimonials slides --> */}

              <div className="carousel-inner" role="listbox">
                <div className="item active">
                  <div className="col-sm-6">
                    <blockquote>
                      {" "}
                      <img src="images/testimonials1.png" alt="" />
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                      </p>
                      <h3>- Michal Marek</h3>
                      <h4>Sales Manager</h4>
                    </blockquote>
                  </div>
                  <div className="col-sm-6">
                    <blockquote>
                      {" "}
                      <img src="images/testimonials2.png" alt="" />
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                      </p>
                      <h3>- Michal Marek</h3>
                      <h4>Sales Manager</h4>
                    </blockquote>
                  </div>
                </div>
                <div className="item">
                  <div className="col-sm-6">
                    <blockquote>
                      {" "}
                      <img src="images/testimonials3.png" alt="" />
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                      </p>
                      <h3>- Michal Marek</h3>
                      <h4>Sales Manager</h4>
                    </blockquote>
                  </div>
                  <div className="col-sm-6">
                    <blockquote>
                      {" "}
                      <img src="images/testimonials1.png" alt="" />
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                      </p>
                      <h3>- Michal Marek</h3>
                      <h4>Sales Manager</h4>
                    </blockquote>
                  </div>
                </div>
                <div className="item">
                  <div className="col-sm-6">
                    <blockquote>
                      {" "}
                      <img src="images/testimonials2.png" alt="" />
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                      </p>
                      <h3>- Michal Marek</h3>
                      <h4>Sales Manager</h4>
                    </blockquote>
                  </div>
                  <div className="col-sm-6">
                    <blockquote>
                      {" "}
                      <img src="images/testimonials3.png" alt="" />
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                      </p>
                      <h3>- Michal Marek</h3>
                      <h4>Sales Manager</h4>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Testimonials Wrapper End -->  */}

      {/* <!-- Courses styles Start--> */}

      <div className="course-wrapper">
        <div className="container">
          <div className="row">
            <div className="title">
              <h2>
                Popular <span>Courses</span>
              </h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry
              </p>
            </div>
          </div>
          <div className="row offset-top-40">
            <div className="col-sm-6 col-md-4">
              <div className="single-item">
                <div className="single-item-image overlay-effect">
                  {" "}
                  <a href="#">
                    <img src="images/courses-img1.jpg" alt="" />
                  </a>{" "}
                </div>
                <div className="single-item-text">
                  <h4>
                    <a href="#">Photoshop CC 2016</a>
                  </h4>
                  <div className="single-item-text-info">
                    {" "}
                    <span>
                      By: <span>L Williams</span>
                    </span>{" "}
                    <span>
                      Date: <span>20.5.15</span>
                    </span>{" "}
                  </div>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since.
                  </p>
                  <div className="single-item-content">
                    <div className="single-item-comment-view">
                      {" "}
                      <span>
                        <i className="fa fa-eye"></i>259
                      </span>{" "}
                      <span>
                        <i className="fa fa-comment-o"></i>19
                      </span>{" "}
                    </div>
                    <div className="single-item-rating">
                      {" "}
                      <i className="fa fa-star" aria-hidden="true"></i>
                      <i className="fa fa-star" aria-hidden="true"></i>
                      <i className="fa fa-star" aria-hidden="true"></i>
                      <i className="fa fa-star" aria-hidden="true"></i>{" "}
                    </div>
                  </div>
                </div>
                <div className="button-bottom">
                  {" "}
                  <a href="#" className="btn button-default">
                    Learn Now
                  </a>{" "}
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="single-item">
                <div className="single-item-image overlay-effect">
                  {" "}
                  <a href="#">
                    <img src="images/courses-img2.jpg" alt="" />
                  </a>{" "}
                </div>
                <div className="single-item-text">
                  <h4>
                    <a href="#">Photoshop CC 2016</a>
                  </h4>
                  <div className="single-item-text-info">
                    {" "}
                    <span>
                      By: <span>L Williams</span>
                    </span>{" "}
                    <span>
                      Date: <span>20.5.15</span>
                    </span>{" "}
                  </div>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since.
                  </p>
                  <div className="single-item-content">
                    <div className="single-item-comment-view">
                      {" "}
                      <span>
                        <i className="fa fa-eye"></i>259
                      </span>{" "}
                      <span>
                        <i className="fa fa-comment-o"></i>19
                      </span>{" "}
                    </div>
                    <div className="single-item-rating">
                      {" "}
                      <i className="fa fa-star" aria-hidden="true"></i>
                      <i className="fa fa-star" aria-hidden="true"></i>
                      <i className="fa fa-star" aria-hidden="true"></i>
                      <i className="fa fa-star" aria-hidden="true"></i>{" "}
                    </div>
                  </div>
                </div>
                <div className="button-bottom">
                  {" "}
                  <a href="#" className="btn button-default">
                    Learn Now
                  </a>{" "}
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="single-item">
                <div className="single-item-image overlay-effect">
                  {" "}
                  <a href="#">
                    <img src="images/courses-img3.jpg" alt="" />
                  </a>{" "}
                </div>
                <div className="single-item-text">
                  <h4>
                    <a href="#">Photoshop CC 2016</a>
                  </h4>
                  <div className="single-item-text-info">
                    {" "}
                    <span>
                      By: <span>L Williams</span>
                    </span>{" "}
                    <span>
                      Date: <span>20.5.15</span>
                    </span>{" "}
                  </div>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since.
                  </p>
                  <div className="single-item-content">
                    <div className="single-item-comment-view">
                      {" "}
                      <span>
                        <i className="fa fa-eye"></i>259
                      </span>{" "}
                      <span>
                        <i className="fa fa-comment-o"></i>19
                      </span>{" "}
                    </div>
                    <div className="single-item-rating">
                      {" "}
                      <i className="fa fa-star" aria-hidden="true"></i>
                      <i className="fa fa-star" aria-hidden="true"></i>
                      <i className="fa fa-star" aria-hidden="true"></i>
                      <i className="fa fa-star" aria-hidden="true"></i>{" "}
                    </div>
                  </div>
                </div>
                <div className="button-bottom">
                  {" "}
                  <a href="#" className="btn button-default">
                    Learn Now
                  </a>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Courses styles End-->  */}

      {/* <!-- Footer styles Start--> */}
      <Footer/>
    </section>
  );
};

export default LandingPage;
