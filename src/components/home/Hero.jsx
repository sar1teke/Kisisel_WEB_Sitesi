import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useMousePosition } from '../../hooks/useMousePosition';

const HeroContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  background-color: #050505;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const GradientOrb = styled(motion.div)`
  position: absolute;
  width: 60vw;
  height: 60vw;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
  z-index: 1;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 800px;
  padding: 0 20px;
`;

const Title = styled(motion.h1)`
  font-size: 5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(90deg, #fff 0%, #a5a5a5 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  color: #a5a5a5;
  margin-bottom: 2rem;
  line-height: 1.5;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #a5a5a5;
  font-size: 0.9rem;
`;

const MouseIcon = styled(motion.div)`
  width: 30px;
  height: 50px;
  border: 2px solid #a5a5a5;
  border-radius: 20px;
  margin-bottom: 10px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 6px;
    height: 6px;
    background: #a5a5a5;
    border-radius: 50%;
  }
`;

const Hero = () => {
  const mousePosition = useMousePosition();
  const backgroundRef = useRef(null);
  
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  };
  
  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, delay: 0.2 }
    }
  };
  
  const scrollVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.8, 
        delay: 0.8,
      }
    }
  };
  
  const mouseIconVariants = {
    animate: {
      y: [0, 10, 0],
      transition: {
        y: {
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut"
        }
      }
    }
  };

  return (
    <HeroContainer>
      <Background ref={backgroundRef}>
        <GradientOrb 
          style={{
            background: 'radial-gradient(circle, rgba(125, 90, 255, 0.8) 0%, rgba(60, 50, 150, 0) 70%)',
            top: '30%',
            left: '60%',
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02,
          }}
        />
        <GradientOrb 
          style={{
            background: 'radial-gradient(circle, rgba(255, 90, 120, 0.8) 0%, rgba(150, 50, 70, 0) 70%)',
            top: '60%',
            left: '30%',
            x: mousePosition.x * -0.02,
            y: mousePosition.y * -0.02,
          }}
        />
      </Background>
      
      <ContentWrapper>
        <Title
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          Dünyamı Keşfedin
        </Title>
        <Subtitle
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
        >
          Dijital dünyadaki yaratıcı yolculuğuma hoş geldiniz. Projelerim, fikirlerim ve tutkularım burada hayat buluyor.
        </Subtitle>
      </ContentWrapper>
      
      <ScrollIndicator
        variants={scrollVariants}
        initial="hidden"
        animate="visible"
      >
        <MouseIcon
          variants={mouseIconVariants}
          animate="animate"
        />
        <motion.span>Aşağı Kaydır</motion.span>
      </ScrollIndicator>
    </HeroContainer>
  );
};

export default Hero;