'use client'

import React from 'react'
import CountUp from "react-countup"
import { useInView } from "react-intersection-observer"


const stats = [
  { number: 10, label: "Teachers" },
  { number: 3, label: "Courses" },
  { number: 350, label: "Students" },
  { number: 361, label: "Recruited" },
]

const ResponsiveCounter = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 1,
  })

  return (
    <div
      ref={ref}
      style={{ backgroundImage: "url('/images/count-number-bg.png')" }}
      className="bg-[#f9fafb] p-[48px_16px] flex justify-center items-center bg-cover bg-center"                                      
    >
      <div
      
        className="w-full max-w-[1200px] mx-auto grid grid-cols-2 sm:grid-cols-4 gap-[24px]"
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center text-center p-[16px] rounded-[8px] bg-transparent shadow-[0_4px_6px_rgba(0,0,0,0.1)]"
          >
            <div
              className="text-[50px] font-bold text-[#ffffff] mb-[8px]"
            >
              {inView ? (
                <CountUp start={0} end={stat.number} duration={2.5} />
              ) : (
                0
              )}
            </div>
            <p
              className="text-[16px] font-[500] text-[#ffffff]"
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ResponsiveCounter

