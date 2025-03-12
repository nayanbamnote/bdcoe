import React from "react";
import MapComponent from "./MapComponent";
import { Twitter, Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <div>
      <div className="footer-wrapper flex flex-wrap justify-around items-start mx-auto gap-[20px] p-[20px]">
        {/* Get in Touch Section */}
        <div
          className="w-full md:w-[500px] p-[16px] md:p-[32px] flex flex-col justify-between leading-tight"
          style={{ height: "330px" }} // Matches MapComponent height
        >
          <div className="fo-one">
            <h3 className="text-[24px] font-bold mb-[16px]">Get in touch</h3>
            <p className="text-[px] leading-[1.6] max-w-full md:max-w-[300px] mb-[16px]">
              Our team is available to assist you from 10:00 AM to 5:00 PM,
              Monday to Friday. Don't miss out on the chance to be a part of
              something extraordinary — apply early for admission.
            </p>
            <address className="text-[13px] mb-[8px]">
              <strong>Address:</strong> <br />
              4, MLK Colony, Sevagram,
              <br />
              Maharashtra, India -442102
            </address>
            <span className="block text-[13px] mb-[8px]">
              <strong>Phone:</strong> 07152-284378
            </span>
            <span className="block text-[13px] mb-[8px]">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:principal@bdce.edu.in"
                className="text-blue-600 underline"
              >
                principal@bdce.edu.in
              </a>
            </span>
            <span className="block text-[13px] mb-[8px]">
              <strong>Fax:</strong> +1-0123-456-789
            </span>
          </div>
        </div>

        {/* Map Section */}
        <MapComponent />
      </div>

      {/* Footer Bottom */}
      <div className="copyright-wrapper bg-gray-100 py-[20px]">
        <div className="container text-center">
          <div className="social-iconbox mb-[16px]">
            <ul className="flex justify-center gap-[16px]">
              <li>
                <a className="twitter text-blue-500" href="#">
                  <Twitter size={20} />
                </a>
              </li>
              <li>
                <a className="text-blue-700" href="#">
                  <Facebook size={20} /> 
                </a>
              </li>
              <li>
                <a className="text-red-500" href="#">
                  <Instagram size={20} />
                </a>
              </li>
              <li>
                <a className="text-blue-600" href="#">
                  <Linkedin size={20} />
                </a>
              </li>
            </ul>
          </div>
          <p className="text-[16px]">
            © Copyright 2024, BDCOE | All Rights Reserved | Nayan & Om.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
