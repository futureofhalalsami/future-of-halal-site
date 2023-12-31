import React, { useState, useEffect } from 'react'
import Button from 'components/controls/button'
import { preOrderBtnLink } from 'lib/config'

const heading = 'Power up your business'
const subHeading1 = 'Comprehensive Insight into the Growing Halal Market'
const subText1 = `Unlock Secret tools, softwares, and marketing tactics of the rapidly expanding $3 Trillion Halal Industry. Our book provides an in-depth analysis across key
sectors—Branding, Tech & Digital Services, Finance, Fashion, Tourism,
Food & Beverages, AR/VR, Beauty & Cosmetics, and Franchising—giving
you a comprehensive understanding of how Halal is shaping global
markets.`
const subHeading2 = 'Global Trends and Case Studies'
const subText2 = `Stay ahead of the curve with our forward-looking analysis of global
Halal trends. Our book includes exclusive insights and real-world case
studies from some of the world's leading companies, offering practical
strategies and insights for both businesses and consumers.`

export default function Section2() {
  return (
    <>
      <DesktopLaptopView />
      <MobileTabletView />
    </>
  )
}

function MobileTabletView() {
  return (
    <div className="block lg:hidden my-8">
      <p className="text-[2.2rem] md:text-[2rem] lg:text-[4rem] xl:text-[6rem] text-center text-primary uppercase pt-8 font-uniform mb-8">
        {heading}
      </p>

      <div className="relative pb-12 px-2 pt-4 ultimate-z-index">
        <h6 className="text-primary text-2xl font-extrabold">{subHeading1}</h6>
        <p className="text-left text-slate-100 text-md font-normal my-4">
          {subText1}
        </p>

        <a href={preOrderBtnLink} target="_blank">
          <Button text="Pre-Order Now" theme="light" />
        </a>

        <img
          src="/images/arrow-left.png"
          width="60px"
          className="rotate-[220deg] m-auto"
          alt="arrow-left"
        />
      </div>

      <div className="h-[300px]"></div>

      <h6 className="text-primary text-2xl font-extrabold px-2">
        {subHeading2}
      </h6>
      <p className="text-slate-100 text-md font-normal my-4 px-2 mb-16">
        {subText2}
      </p>
    </div>
  )
}

function DesktopLaptopView() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="hidden lg:grid grid-cols-1 lg:grid-cols-6 grid-rows-5 gap-4 w-screen h-screen px-12">
      <div className="col-start-1 col-end-7 row-span-1 rounded-lg m-2 p-2">
        <p className="text-[1.7rem] md:text-[2rem] lg:text-[4rem] xl:text-[6rem] text-center text-primary uppercase font-uniform">
          {heading}
        </p>
      </div>

      <div className="col-start-1 col-end-3 row-span-2 rounded-lg m-2 p-2 relative ultimate-z-index">
        <h6 className="text-primary text-3xl font-extrabold">{subHeading1}</h6>
        <p className="text-left text-slate-100 text-lg font-normal my-4">
          {subText1}
        </p>

        <div className="my-4">
          <a href={preOrderBtnLink} target="_blank">
            <Button text="Pre-Order Now" theme="light" />
          </a>
        </div>
      </div>

      <div className="col-start-1 col-end-3 row-span-1 row-start-5 m-auto">
        <img
          src="/images/arrow-left.png"
          width="150px"
          className="rotate-[290deg] scale-x-[-1]"
          alt="arrow-left"
        />
      </div>
      <div className="col-end-7 col-span-2 row-span-1 bg-opacity-30 text-center text-2xl rounded-lg m-2 p-2">
        <img src="/images/arrow-right.png" className="" alt="arrow-right" />
      </div>
      <div className="col-start-5 col-end-7 flex flex-col justify-center row-span-2 text-right rounded-lg m-2 p-2">
        <h6 className="text-primary text-3xl font-extrabold mt-20">{subHeading2}</h6>
        <p className="text-slate-100 text-lg font-normal my-4">{subText2}</p>
      </div>
    </div>
  )
}
