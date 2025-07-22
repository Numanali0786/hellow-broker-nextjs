"use client"

import React from 'react'
import { TypeAnimation } from "react-type-animation";

const TypeAnimationComp = () => {
  return (
     <TypeAnimation
            className="text-white"
            sequence={[
              // Same substring at the start will only be typed out once, initially
              "Find Your Dream Appartment.",
              3000, // wait 1s before replacing "Mice" with "Hamsters"
              "Find Your Dream House.",
              3000,
              "Find Your Dream Villa.",
              3000,
              "Find Your Dream Flat.",
              3000,
            ]}
            wrapper="span"
            speed={20}
            style={{ fontSize: "3em", display: "inline-block" }}
            repeat={Infinity}
          />
  )
}

export default TypeAnimationComp