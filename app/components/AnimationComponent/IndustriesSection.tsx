'use client';

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import PolygonLogo from '@/app/assets/Images/polygon-card.svg';
import keyUpdateImg from '@/app/assets/Images/key-update-img.png'; 
import BlurText from "./BlurText";

const IndustriesSection = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const imageWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const col = imageWrapperRef.current;
    if (!root || !col) return;

    const imgEl = col.querySelector<HTMLImageElement>('.key-update-img');
    if (!imgEl) return;

    const secTop = root.offsetTop;

    const MAX_ROTATION = 85;   // max rotation allowed
    const SPEED = 0.15;        // adjust multiplier for smoothness

    const onScroll = () => {
      const y = window.scrollY;
      const secScroll = y - secTop;

      // scroll → rotation
      const newRotation = secScroll * SPEED;

      // clamp between 0 and MAX_ROTATION
      const clampedRotation = Math.min(Math.max(newRotation, 0), MAX_ROTATION);

      // apply rotation
      imgEl.style.transform = `rotate(${clampedRotation}deg)`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section className="industries">
      <div className="container">
        <BlurText as="h1" split="words" stagger={40} blurAmount={14} yOffset={18} duration={800}>Industries We Serve</BlurText>
        <BlurText as="p" split="chars" stagger={12} blurAmount={10} yOffset={5} duration={2000}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</BlurText>

        {/* Card Wrapper */}
        <div className="inuds-polygon-wrapper">
          <div className="industrie-polygon-wrapper">
            <div
              className="industrie-polygon-box"
              style={{
                position: "relative",
                transformOrigin:"50% 50%",
              }}
            >
              <button>
                <label className="indus-box">Oil Gas</label>
                <i className="indus-plus">+</i>
                <PolygonLogo />
              </button>
              <div className="hover"></div>
            </div>

            <div className="industrie-polygon-box">
              <button>
                <label className="indus-box">Powerful & Utilities</label>
                <i className="indus-plus">+</i>
                <PolygonLogo />
              </button>
              <div className="hover"></div>
            </div>

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
        <div className="update-box-wrapper" ref={rootRef}>
          <div className="column" ref={imageWrapperRef}>
            <img
              src={keyUpdateImg.src}
              alt="Key Update Img"
              className="key-update-img"
              style={{
                transition: "transform 0.1s linear",
              }}
            />
          </div>
          <div className="column">
            <BlurText as="h2" split="words" stagger={40} blurAmount={14} yOffset={18} duration={800}>Key Updates/ Highlights</BlurText>
            <div className="update-box-head-tag">
              <div className="dot"></div>
              <label>Lorem Ipsum</label>
            </div>
            <BlurText as="p" split="chars" stagger={12} blurAmount={10} yOffset={5} duration={2000} className="update-box-head-para">Lorem Ipsum is simply dummy text of the printing and typesetting industry...</BlurText>
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
