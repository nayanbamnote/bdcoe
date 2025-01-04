import React from 'react'
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const stats = [
    { number: 10, label: "Teachers" },
    { number: 3, label: "Courses" },
    { number: 350, label: "Students" },
    { number: 361, label: "Recruited" },
  ];
const Satisfied = () => {
    const { ref, inView } = useInView({
        triggerOnce: true, // Ensures the animation triggers only once
        threshold: 1, // Start the animation when 50% of the component is visible
      });
  return (
    <div
        ref={ref}
        className="satisfied-wrapper bg-gray-50 py-12 flex justify-center items-center"
      >
        <div className="container mx-auto flex flex-wrap justify-evenly gap-14 text-center">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="counter flex flex-col justify-center items-center text-center w-40"
            >
              <div className="number text-4xl font-bold text-primary">
                {inView ? (
                  <CountUp start={0} end={stat.number} duration={2.5} />
                ) : (
                  0
                )}
              </div>
              <p className="text-lg font-medium text-gray-600 !mt-[16px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
  )
}

export default Satisfied