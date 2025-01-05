import React from "react";

const MapComponent: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-[500px] max-h-full p-4">
      <div className="w-full h-[330px] !rounded-[5px] max-w-4xl aspect-w-16 aspect-h-9">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3731.380483170548!2d78.66113935155725!3d20.735367029799605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4800e217157ef%3A0xc403f5cc281124!2sBapurao%20Deshmukh%20College%20of%20Engineering%2C%20Sevagram%2C%20Wardha!5e0!3m2!1sen!2sin!4v1734785998129!5m2!1sen!2sin"
          title="Google Maps"
          style={{ border: "0" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full rounded-xl"
        ></iframe>
      </div>
    </div>
  );
};

export default MapComponent;
