import React from 'react'

interface TestimonialPerson {
  image: string;
  content: string;
  name: string;
  role: string;
}

interface TestimonialSlide {
  isActive?: boolean;
  testimonials: [TestimonialPerson, TestimonialPerson];
}

const testimonialData: TestimonialSlide[] = [
  {
    isActive: true,
    testimonials: [
      {
        image: "images/harshal.jpg",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        name: "Abhishekh Chaware",
        role: "CDOS President"
      },
      {
        image: "images/harshal.jpg",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        name: "Ridhhi Watkar",
        role: "CDOS Vice-President"
      }
    ]
  },
  {
    testimonials: [
      {
        image: "images/testimonials1.png",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        name: "Michal Marek",
        role: "Sales Manager"
      },
      {
        image: "images/testimonials1.png",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        name: "Michal Marek",
        role: "Sales Manager"
      }
    ]
  },
  {
    testimonials: [
      {
        image: "images/testimonials2.png",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        name: "Michal Marek",
        role: "Sales Manager"
      },
      {
        image: "images/testimonials3.png",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        name: "Michal Marek",
        role: "Sales Manager"
      }
    ]
  }
];

const TestimonialBlock: React.FC<TestimonialPerson> = ({ image, content, name, role }) => (
  <div className="col-sm-6">
    <blockquote>
      {" "}
      <img src={image} alt={name} />
      <p>{content}</p>
      <h3>- {name}</h3>
      <h4>{role}</h4>
    </blockquote>
  </div>
);

const TestimonialSlide: React.FC<TestimonialSlide> = ({ isActive, testimonials }) => (
  <div className={`item ${isActive ? 'active' : ''}`}>
    {testimonials.map((testimonial, index) => (
      <TestimonialBlock key={index} {...testimonial} />
    ))}
  </div>
);

const Testimonials = () => {
  return (
    <div className="testimonials-wrapper">
      <div className="container">
        <div className="row">
          <div className="title">
            <h2>
              CDOS <span className="!text-[#3eb2ce]">Testimonials</span>
            </h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry
            </p>
          </div>
          <div
            id="myCarousel1"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner" role="listbox">
              {testimonialData.map((slide, index) => (
                <TestimonialSlide key={index} {...slide} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Testimonials