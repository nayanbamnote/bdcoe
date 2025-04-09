import React from "react";
import { Eye, Target, GraduationCap, Handshake, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface VisionItem {
  Icon: LucideIcon;
  iconSize: number;
  title: string;
  description: string;
}

const visionData: VisionItem[] = [
  {
    Icon: Eye,
    iconSize: 60,
    title: "Vision",
    description: "Globally acceptable professionals satisfying technical and social needs."
  },
  {
    Icon: Target,
    iconSize: 50,
    title: "Mission",
    description: "Networking and cooperation with global organizations by creating a suitable environment in campus..."
  },
  {
    Icon: GraduationCap,
    iconSize: 60,
    title: "DICTUM",
    description: "One step ahead to enhance employability."
  },
  {
    Icon: Handshake,
    iconSize: 55,
    title: "Core Values",
    description: "Academic Integrity, Accountability, Appreciation of intellectual, excellence, Ethics, Enhance."
  }
];

const VisionCard: React.FC<VisionItem> = ({ Icon, iconSize, title, description }) => (
  <motion.div 
    className="flex flex-col items-center text-center p-4 border rounded-lg shadow-lg min-h-[234px] w-[280px]"
    whileHover={{ scale: 1.05 }} // Simple hover effect
  >
    <div className="text-[#3eb2ce] mb-4">
      <Icon size={iconSize} />
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-base text-gray-600">
      {description}
    </p>
  </motion.div>
);

const VisionMission: React.FC = () => {
  return (
    <section className="flex flex-wrap justify-center gap-6 p-6">
      {visionData.map((item, index) => (
        <VisionCard key={index} {...item} />
      ))}
    </section>
  );
};

export default VisionMission;
