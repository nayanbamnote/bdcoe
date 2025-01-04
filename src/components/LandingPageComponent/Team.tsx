import React from 'react'

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
  <div className={`col-sm-6 col-md-3 ${spaceClass || ''}`}>
    <div className="team-wrap">
      <div className="thumbnail thumbnail-model">
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
    </div>
  </div>
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
          {teamData.map((member, index) => (
            <TeamMemberCard key={index} {...member} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Team