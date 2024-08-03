'use client'
// src/AnimationCheck.tsx

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './animation.css';

gsap.registerPlugin(ScrollTrigger);

const AnimationCheck: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 50, fontSize: '1rem' },
        {
          opacity: 1,
          y: 0,
          fontSize: '2rem',
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: true,
          },
        }
      );
    }
  }, []);

  return (
    <div>
      <section className="content">Scroll down to see the animation</section>
      <section ref={sectionRef} className="animated-section">
        Hello, I will animate!
      </section>
      <section className="content">Keep scrolling...</section>
    </div>
  );
};

export default AnimationCheck;
