import React from 'react'

export default function ScrollingText({ text }) {
  return (
    <div className="relative flex overflow-x-hidden z-50 w-screen -ml-[20px] md:-ml-[50px]">
      <div className="py-12 animate-marquee whitespace-nowrap">
        <span className="text-[8rem] md:text-[12rem] lg:text-[16rem] text-primary font-bold mx-[100px] uppercase font-uniform">{text}</span>
        <span className="text-[8rem] md:text-[12rem] lg:text-[16rem] text-primary font-bold mx-[100px] uppercase font-uniform">{text}</span>
        <span className="text-[8rem] md:text-[12rem] lg:text-[16rem] text-primary font-bold mx-[100px] uppercase font-uniform">{text}</span>
        <span className="text-[8rem] md:text-[12rem] lg:text-[16rem] text-primary font-bold mx-[100px] uppercase font-uniform">{text}</span>
        <span className="text-[8rem] md:text-[12rem] lg:text-[16rem] text-primary font-bold mx-[100px] uppercase font-uniform">{text}</span>
      </div>

      <div className="absolute top-0 py-12 animate-marquee2 whitespace-nowrap">
        <span className="text-[8rem] md:text-[12rem] lg:text-[16rem] text-primary font-bold mx-[100px] uppercase font-uniform">{text}</span>
        <span className="text-[8rem] md:text-[12rem] lg:text-[16rem] text-primary font-bold mx-[100px] uppercase font-uniform">{text}</span>
        <span className="text-[8rem] md:text-[12rem] lg:text-[16rem] text-primary font-bold mx-[100px] uppercase font-uniform">{text}</span>
        <span className="text-[8rem] md:text-[12rem] lg:text-[16rem] text-primary font-bold mx-[100px] uppercase font-uniform">{text}</span>
        <span className="text-[8rem] md:text-[12rem] lg:text-[16rem] text-primary font-bold mx-[100px] uppercase font-uniform">{text}</span>
      </div>
    </div>
  )
}
