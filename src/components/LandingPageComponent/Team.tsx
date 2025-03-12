"use client"

import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface TeamMember {
  image: string;
  phone: string;
  email: string;
  name: string;
  role: string;
  spaceClass?: string;
}

const teamData: TeamMember[] = [
  {
    image: "images/harshal.jpg",
    phone: "+91 8623094369",
    email: "contactsvraut@gmail.com",
    name: "Prof S.V. Raut",
    role: "Java Faculty"
  },
  {
    image: "images/harshal.jpg",
    phone: "+91 8087736725",
    email: "contactroshanc@gmail.com",
    name: "Prof R. Chaudhari",
    role: "AI/ML Expert"
  },
  {
    image: "images/harshal.jpg",
    phone: "+91 9503141798",
    email: "contactrmpatil@gmail.com",
    name: "Prof R. M. Patil",
    role: "Computer Graphics",
    spaceClass: "space"
  },
  {
    image: "images/harshal.jpg",
    phone: "+91 7517697478",
    email: "contactsveer@gmail.com",
    name: "Prof S. Veer",
    role: "Computer Networking"
  },
  {
    image: "images/harshal.jpg",
    phone: "+91 8623094369",
    email: "contactsvraut@gmail.com",
    name: "Prof S.V. Raut",
    role: "Java Faculty"
  },
  {
    image: "images/harshal.jpg",
    phone: "+91 8087736725",
    email: "contactroshanc@gmail.com",
    name: "Prof R. Chaudhari",
    role: "AI/ML Expert"
  },
  {
    image: "images/harshal.jpg",
    phone: "+91 9503141798",
    email: "contactrmpatil@gmail.com",
    name: "Prof R. M. Patil",
    role: "Computer Graphics",
    spaceClass: "space"
  },
  {
    image: "images/harshal.jpg",
    phone: "+91 7517697478",
    email: "contactsveer@gmail.com",
    name: "Prof S. Veer",
    role: "Computer Networking"
  }
];

const TeamMemberCard: React.FC<TeamMember> = ({ 
  image, 
  phone, 
  email, 
  name, 
  role,
  spaceClass 
}) => (
  <Card className="team-wrap rounded-none shadow-none border-none">
    <CardContent className="p-0">
      <div className="thumbnail thumbnail-model w-full">
        <figure className="thumbnail-image">
          <img src={image} alt={name} />{" "}
        </figure>
        <div className="thumbnail-inner">
          <div className="link-group">
            <i className="fa fa-phone"></i>
            <a href="#" className="link-white">
              {phone}
            </a>
          </div>
          <div className="link-group">
            <i className="fa fa-envelope"></i>
            <a href="#" className="link-white">
              {email}
            </a>
          </div>
        </div>
        <div className="thumbnail-caption">
          <p className="text-header">
            <a href="#">{name}</a>
          </p>
          <div className="divider divider-md bg-teak"></div>
          <p className="text-caption">{role}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const Team = () => {
  return (
    <div className="team-wrapper team">
      <div className="container">
        <div className="row">
          <div className="title">
            <h2>
              Expert <span>Faculty</span>
            </h2>
            <p>
              Our faculty combines expertise and passion to inspire young
              minds.
            </p>
          </div>
          
          <div className="relative px-[32px] md:px-[48px]">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-[16px] h-[450px]">
                {teamData.map((member, index) => (
                  <CarouselItem key={index} className="pl-[16px] basis-full md:basis-1/2 lg:basis-1/4">
                    <div className="p-[16px]">
                      <TeamMemberCard {...member} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="h-[32px] w-[32px] md:h-[32px] md:w-[32px] left-[-24px] md:left-[-48px]" />
              <CarouselNext className="h-[32px] w-[32px] md:h-[32px] md:w-[32px] right-[-24px] md:right-[-48px]" />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Team