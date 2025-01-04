import React from 'react'

interface CourseItem {
  image: string;
  title: string;
  description: string;
}

const courseData: CourseItem[] = [
  {
    image: "images/courses-img1.jpg",
    title: "B.Tech",
    description: "B.Tech course provides in-depth knowledge in engineering, combining theory and practical skills to prepare students for the tech industry."
  },
  {
    image: "images/courses-img2.jpg",
    title: "M.Tech",
    description: "MTech course offers advanced knowledge in engineering, focusing on research, innovation, and specialized skills to excel in technology fields."
  },
  {
    image: "images/courses-img3.jpg",
    title: "MBA",
    description: "MBA course provides comprehensive management education, focusing on leadership, strategy, and business skills to excel in the corporate world"
  }
];

const CourseCard: React.FC<CourseItem> = ({ image, title, description }) => (
  <div className="col-sm-6 col-md-4">
    <div className="single-item">
      <div className="single-item-image overlay-effect">
        {" "}
        <a href="#">
          <img src={image} alt={title} />
        </a>{" "}
      </div>
      <div className="single-item-text">
        <h4>
          <a href="#">{title}</a>
        </h4>
        <div className="single-item-text-info" />
        <p>{description}</p>
        <div className="single-item-content">
          <div className="single-item-comment-view" />
          {title === "B.Tech" && <div className="single-item-rating" />}
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
);

const Course = () => {
  return (
    <div className="course-wrapper">
      <div className="container">
        <div className="row">
          <div className="title">
            <h2>
              Popular <span>Courses</span>
            </h2>
            <p>
              Empowering futures with cutting-edge B.Tech, M.Tech, and MBA
              programs.
            </p>
          </div>
        </div>
        <div className="row offset-top-40">
          {courseData.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Course