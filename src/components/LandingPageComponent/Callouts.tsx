import React from 'react'
import { Clapperboard, Handshake, MonitorCog } from "lucide-react";
import VisionMission from './VisionMission';

interface CalloutItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const calloutData: CalloutItem[] = [
  {
    icon: <i className="fa fa-book"></i>,
    title: "Awesome Courses",
    description: "The Computer Department offers <span className=\"text-blue-400\">B.Tech, M.Tech,</span> and <span className=\"text-blue-400\">MBA</span> programs, blending innovation, technical expertise, creative problem-solving, and managerial skills for future leaders."
  },
  {
    icon: <i className="fa fa-users" aria-hidden="true"></i>,
    title: "Qualified Teachers",
    description: "The Computer Department boasts qualified teachers, fostering innovation, technical expertise, and leadership excellence in B.Tech, M.Tech, and MBA programs."
  },
  {
    icon: <MonitorCog style={{ width: "100%", height: "100%" }} />,
    title: "Computer Labs",
    description: "The Computer Department is equipped with state-of-the-art, cutting-edge labs that foster creativity, enhance technical expertise, and cultivate leadership, innovation, and problem-solving skills."
  },
  {
    icon: <Handshake style={{ width: "100%", height: "100%" }} />,
    title: "Training & Placements",
    description: "Our college offers dynamic training and placement programs to enhance students' overall personality, interview skills, professional growth, confidence, and career prospects."
  },
  {
    icon: <Clapperboard style={{ width: "100%", height: "100%" }} />,
    title: "Events & Fest",
    description: "Our college organizes vibrant events like ARAMBH, LAMHE, COLOURS Dance, Wheelspeen, Hackathon, Robo Race, and traditional festivals like Ganapati Pratishthan and Shivjayanti."
  },
  {
    icon: <i className="fa fa-users" aria-hidden="true"></i>,
    title: "Personal Mentor",
    description: "The college provides personal mentors to guide students in solving academic challenges and addressing personal issues for overall growth."
  }
];

const CalloutBox: React.FC<CalloutItem> = ({ icon, title, description }) => (
  <div className="col-sm-6 col-md-4">
    <div className="callouts">
      <div className="callouts-box text-center">
        <div className="icon-box" style={icon.type !== 'i' ? { width: "30px", height: "30px", color: "#3eb2ce" } : undefined}>
          {icon}
        </div>
        <div className="box-header">
          <h3>{title}</h3>
        </div>
        <div className="divider bg-primary"></div>
        <div className="box-body">
          <p dangerouslySetInnerHTML={{ __html: description }}></p>
        </div>
      </div>
    </div>
  </div>
);

const Callouts = () => {
  return (
    <div className="callouts-wrapper">
      <div className="container">
        <div className="row">
          <div className="title">
            <h2>
              Welcome to <span>BDCOE Computer Department</span>
            </h2>
            <p>
              Empowering innovation, fostering brilliance, and shaping
              tomorrow's tech-driven future.
            </p>
          </div>

          <VisionMission />
          
          {calloutData.map((item, index) => (
            <CalloutBox key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Callouts