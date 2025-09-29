'use client';

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import PolygonLogo from '@/app/assets/Images/polygon-card.svg';
import keyUpdateImg from '@/app/assets/Images/key-update-img.png'; 

const IndustriesSection = () => {
//   const [scrollPosition, setScrollPosition] = useState(0);
//   const firstCardRef = useRef<HTMLDivElement | null>(null);

//   // Handle scroll event
//   const handleScroll = () => {
//     const scrollPos = window.scrollY;
//     setScrollPosition(scrollPos); // Track scroll position
//   };

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   // Custom Min and Max Values for card transformation
//   const minValues = {
//     blur: 40,
//     opacity: 0,
//     translateY: 200,
//     rotate: 0,
//   };

//   const maxValues = {
//     blur: 0,
//     opacity: 1,
//     translateY: 0,
//     rotate: 70,
//   };

//   // Interpolation logic based on scroll position
//   const getInterpolatedValue = (minValue: number, maxValue: number) => {
//     return minValue + (maxValue - minValue) * (scrollPosition / 1000); // Adjust 1000 to change speed of the effect
//   };

//   // Calculate values for the transform, opacity, and blur effects
//   const blurAmount = getInterpolatedValue(minValues.blur, maxValues.blur);
//   const opacity = getInterpolatedValue(minValues.opacity, maxValues.opacity);
//   const translateY = getInterpolatedValue(minValues.translateY, maxValues.translateY);
//   const rotation = getInterpolatedValue(minValues.rotate, maxValues.rotate);

//   useEffect(() => {
//     if (firstCardRef.current) {
//       const cardElement = firstCardRef.current;

//       // Applying styles for the first card (rotate, translate3d, opacity, and blur)
//       cardElement.style.transform = `translate3d(0, ${translateY}px, 0) rotate(${rotation}deg)`;
//       cardElement.style.filter = `blur(${blurAmount}px)`;
//       cardElement.style.opacity = opacity.toString();
//     }
//   }, [scrollPosition, blurAmount, opacity, translateY, rotation]);

  return (
    <section className="industries">
      <div className="container">
        <h1>Industries We Serve</h1>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>

        {/* Card Wrapper */}
        <div className="inuds-polygon-wrapper">
          <div className="industrie-polygon-wrapper">
            {/* Card 1 */}
            <div
            //   ref={firstCardRef}  
              className="industrie-polygon-box"
              style={{
                position: "relative",
                transformOrigin:"50% 50%",
                transition: "transform 0.6s ease, opacity 0.6s ease, filter 0.6s ease",
              }}
            >
              <button>
                <label className="indus-box">Oil Gas</label>
                <i className="indus-plus">+</i>
                <PolygonLogo />
              </button>
              <div className="hover"></div>
            </div>

            {/* Card 2 */}
            <div className="industrie-polygon-box">
              <button>
                <label className="indus-box">Powerful & Utilities</label>
                <i className="indus-plus">+</i>
                <PolygonLogo />
              </button>
              <div className="hover"></div>
            </div>

            {/* Card 3 */}
            <div className="industrie-polygon-box">
              <button>
                <label className="indus-box">Mining & Minerals</label>
                <i className="indus-plus">+</i>
                <PolygonLogo />
              </button>
              <div className="hover"></div>
            </div>
          </div>

          {/* Other Card Wrappers */}
          <div className="industrie-polygon-wrapper">
            {/* Other Cards */}
            <div className="industrie-polygon-box">
              <button>
                <label className="indus-box">Manufacturing</label>
                <i className="indus-plus">+</i>
                <PolygonLogo />
              </button>
              <div className="hover"></div>
            </div>
            <div className="industrie-polygon-box">
              <button>
                <label className="indus-box">Chemicals</label>
                <i className="indus-plus">+</i>
                <PolygonLogo />
              </button>
              <div className="hover"></div>
            </div>
          </div>

          <div className="industrie-polygon-wrapper">
            {/* Card 6 */}
            <div className="industrie-polygon-box">
              <button>
                <label className="indus-box">Renewables</label>
                <i className="indus-plus">+</i>
                <PolygonLogo />
              </button>
              <div className="hover"></div>
            </div>
          </div>
        </div>

        {/* Key Update Section */}
        <div className="update-box-wrapper">
          <div className="column">
            <Image src={keyUpdateImg} className="key-update-img" alt="Key Update Img" />
          </div>
          <div className="column">
            <h2>Key Updates/ Highlights</h2>
            <div className="update-box-head-tag">
              <div className="dot"></div>
              <label>Lorem Ipsum</label>
            </div>
            <p className="update-box-head-para">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ...
            </p>
            <a href="/" className="update-box-btn">
              <div className="dot"></div> Start Your Journey
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
