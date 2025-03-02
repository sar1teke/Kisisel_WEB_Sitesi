import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const AboutSection = styled.section`
  background-color: #0a0a0a;
  color: #ffffff;
  padding: 100px 20px;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  background: linear-gradient(90deg, #7d5aff, #ff5a78);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  color: #a5a5a5;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const Highlight = styled.span`
  color: #ff5a78;
  font-weight: 600;
`;

// Arka plan için dekoratif elementler
const BackgroundCircle = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  opacity: 0.05;
  background: linear-gradient(90deg, #7d5aff, #ff5a78);
`;

const Circle1 = styled(BackgroundCircle)`
  width: 300px;
  height: 300px;
  top: -100px;
  left: -100px;
`;

const Circle2 = styled(BackgroundCircle)`
  width: 200px;
  height: 200px;
  bottom: -50px;
  right: -50px;
`;

// Skill Badges
const SkillContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 30px;
`;

const SkillBadge = styled(motion.div)`
  background: #151515;
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  border: 1px solid #252525;
`;

const About = () => {
  // Ana bölüm için animasyon kontrolü
  const { ref: sectionRef, controls: sectionControls } = useScrollAnimation(0.1);
  
  // Title için animasyon 
  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  // Paragraflar için animasyon
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: i => ({ 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        delay: 0.2 + (i * 0.1) 
      } 
    })
  };

  // Skill badges için animasyon
  const skillsVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.6
      }
    }
  };

  const skillItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4, ease: "backOut" }
    }
  };

  // Arkaplan daireleri için animasyon
  const circleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 0.05, 
      scale: 1,
      transition: { duration: 1.5, ease: "easeOut" } 
    }
  };

  // Skills listesi
  const skills = ["ReactJS", "Styled Components", "Framer Motion", "UI/UX", "Responsive Design", "Yapay Zeka"];

  return (
    <AboutSection>
      <Circle1 
        variants={circleVariants}
        initial="hidden"
        animate="visible"
      />
      <Circle2 
        variants={circleVariants}
        initial="hidden"
        animate="visible"
      />
      
      <Container ref={sectionRef}>
        <Title
          variants={titleVariants}
          initial="hidden"
          animate={sectionControls}
        >
          Hakkımda
        </Title>
        
        <Description
          custom={0}
          variants={textVariants}
          initial="hidden"
          animate={sectionControls}
        >
          Merhaba! Ben <Highlight>İsmail SARITEKE</Highlight>, yaratıcı ve teknoloji tutkunu bir geliştiriciyim.
          Dijital dünyada yenilikçi projeler geliştirerek kendimi geliştirmeyi hedefliyorum.
        </Description>
        
        <Description
          custom={1}
          variants={textVariants}
          initial="hidden"
          animate={sectionControls}
        >
          Web geliştirme, arayüz tasarımı ve yapay zeka modelleri oluşturma konularında
          <Highlight> güçlü bir tutku</Highlight> ile çalışıyorum. Kodlamanın gücünü kullanarak,
          insanların hayatını kolaylaştıran projeler yapmayı seviyorum.
        </Description>
        
        <SkillContainer
          variants={skillsVariants}
          initial="hidden"
          animate={sectionControls}
        >
          {skills.map((skill, index) => (
            <SkillBadge 
              key={index}
              variants={skillItemVariants}
            >
              {skill}
            </SkillBadge>
          ))}
        </SkillContainer>
      </Container>
    </AboutSection>
  );
};

export default About;