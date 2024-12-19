import React from "react";
import { Eye, Target, GraduationCap, Handshake } from "lucide-react";

const VisionMission = () => {
  return (
    <section
      className="flex flex-wrap justify-center md:justify-evenly items-center gap-6 p-4 "
    >
      {/* Vision */}
      <div className="flex flex-col items-center text-center w-full sm:w-1/2 md:w-1/4 p-4 border rounded-lg shadow-lg min-h-[234px]">
        <div className="text-blue-500 mb-4">
          <Eye size={60} />
        </div>
        <h3 className="text-xl font-semibold mb-2">Vision</h3>
        <p className="text-base text-gray-600">
          Globally acceptable professionals satisfying technical and social needs.
        </p>
      </div>

      {/* Mission */}
      <div className="flex flex-col items-center text-center w-full sm:w-1/2 md:w-1/4 p-4 border rounded-lg shadow-lg min-h-[234px]">
        <div className="text-blue-500 mb-4">
          <Target size={50} />
        </div>
        <h3 className="text-xl font-semibold mb-2">Mission</h3>
        <p className="text-base text-gray-600">
          Networking and cooperation with global organizations by creating suitable environment in campus...
        </p>
      </div>

      {/* Dictum */}
      <div className="flex flex-col items-center text-center w-full sm:w-1/2 md:w-1/4 p-4 border rounded-lg shadow-lg min-h-[234px]">
        <div className="text-blue-500 mb-4">
          <GraduationCap size={60} />
        </div>
        <h3 className="text-xl font-semibold mb-2">DICTUM</h3>
        <p className="text-base text-gray-600">
          One step ahead to enhance employability.
        </p>
      </div>

      {/* Core Values */}
      <div className="flex flex-col items-center text-center w-full sm:w-1/2 md:w-1/4 p-4 border rounded-lg shadow-lg min-h-[234px]">
        <div className="text-blue-500 mb-4">
          <Handshake size={55} />
        </div>
        <h3 className="text-xl font-semibold mb-2">Core Values</h3>
        <p className="text-base text-gray-600">
          Academic Integrity, Accountability, Appreciation of intellectual, excellence, Ethics, Enhance.
        </p>
      </div>
    </section>
  );
};

export default VisionMission;

