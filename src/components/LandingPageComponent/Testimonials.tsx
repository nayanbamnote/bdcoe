"use client"

import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"

interface TestimonialPerson {
  image: string;
  content: string;
  name: string;
  role: string;
}

const testimonialData: TestimonialPerson[] = [
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
  },
  {
    image: "images/testimon.png",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    name: "Michal Marek",
    role: "Sales Manager"
  },
  {
    image: "images/testimonials1.png",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    name: "Michal Marek", 
    role: "Sales Manager"
  },
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
];

const TestimonialBlock: React.FC<TestimonialPerson> = ({ image, content, name, role }) => (
  <Card>
    <CardContent className="flex flex-col items-center p-6">
      <img src={image} alt={name} className="w-20 h-20 rounded-full mb-4" />
      <blockquote className="text-center mb-4">
        <p className="text-gray-600">{content}</p>
      </blockquote>
      <h3 className="font-semibold">- {name}</h3>
      <h4 className="text-gray-500">{role}</h4>
    </CardContent>
  </Card>
);

const Testimonials = () => {
  return (
    <div className="testimonials-wrapper">
      <div className="container px-12 sm:px-16">
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

          <div className="relative">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {testimonialData.map((testimonial, index) => (
                  <CarouselItem key={index} className="pl-4 md:basis-1/2">
                    <TestimonialBlock {...testimonial} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden sm:block">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Testimonials