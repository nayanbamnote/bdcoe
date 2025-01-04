import React from 'react'

const Banner = () => {
  return (
    
    <div className="banner-wrapper">
    <div
      className="carousel fade-carousel slide"
      data-ride="carousel"
      data-interval="4000"
      id="bs-carousel"
    >
      {/* <!-- Overlay --> */}
      <div className="overlay"></div>
      {/* <!-- Wrapper for slides --> */}
      <div className="carousel-inner">
        <div className="item slides active">
          <div className="slide-1 max-h-[650px] ">
            <img
              src="images/bdcoe_i.jpeg"
              alt=""
              className="object-cover object-top"
            />
          </div>
          <div className="hero">
            <h1 className="animated1 whitespace-nowrap">
              Computer Department{" "}
            </h1>
            <h3 className="animated2">
              Excellence, Innovation, and Success
            </h3>
          </div>
        </div>
      </div>
      <a
        className="left carousel-control"
        href="#bs-carousel"
        data-slide="prev"
      >
        <span className="transition3s glyphicon glyphicon-chevron-left fa fa-angle-left"></span>
      </a>{" "}
      <a
        className="right carousel-control"
        href="#bs-carousel"
        data-slide="next"
      >
        <span className="transition3s glyphicon glyphicon-chevron-right fa fa-angle-right"></span>
      </a>{" "}
    </div>
  </div>
  )
}

export default Banner