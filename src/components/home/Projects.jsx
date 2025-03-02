import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const ProjectsSection = styled.section`
  background-color: #050505;
  color: white;
  padding: 100px 20px;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
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

const ProjectGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 40px;
`;

const ProjectCard = styled(motion.div)`
  background: #121212;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 25px rgba(125, 90, 255, 0.15);
  }
`;

const ProjectImageContainer = styled.div`
  height: 180px;
  background: linear-gradient(45deg, #121212, #252525);
  position: relative;
  overflow: hidden;
`;

const ProjectImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #7d5aff20, #ff5a7820);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProjectIcon = styled.div`
  font-size: 3rem;
  color: rgba(255, 255, 255, 0.7);
`;

const ProjectContent = styled.div`
  padding: 20px;
  text-align: left;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  color: #ff5a78;
  margin-bottom: 10px;
`;

const ProjectDescription = styled.p`
  color: #a5a5a5;
  font-size: 1rem;
  margin-bottom: 15px;
  flex-grow: 1;
`;

const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: auto;
`;

const ProjectTag = styled.span`
  background: #1d1d1d;
  color: #7d5aff;
  padding: 4px 10px;
  border-radius: 15px;
  font-size: 0.75rem;
  font-weight: 500;
`;

const AdditionalText = styled(motion.p)`
  color: #a5a5a5;
  font-size: 1rem;
  margin-top: 40px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const ViewAllProjects = styled(motion.div)`
  margin-top: 20px;
`;

const ViewAllLink = styled(Link)`
  display: inline-block;
  background: linear-gradient(90deg, #7d5aff, #ff5a78);
  color: white;
  text-decoration: none;
  padding: 12px 25px;
  border-radius: 30px;
  font-weight: 600;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(255, 90, 120, 0.3);
  }
`;

// Arka plan için dekoratif elementler
const BackgroundGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(to right, #111111 1px, transparent 1px),
    linear-gradient(to bottom, #111111 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0.2;
`;

const Projects = () => {
  // Ana bölüm için scroll animasyonu
  const { ref: sectionRef, controls: sectionControls } = useScrollAnimation(0.1);
  const { ref: gridRef, controls: gridControls } = useScrollAnimation(0.15);

  // Animasyon varyantları
  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut"
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        delay: 0.6
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        delay: 0.8
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 5px 15px rgba(255, 90, 120, 0.3)",
      transition: { duration: 0.3 }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  // Genişletilmiş proje verileri
  const projects = [
    
  ];

  return (
    <ProjectsSection ref={sectionRef}>
      <BackgroundGrid />
      
      <Container>
        <Title
          variants={titleVariants}
          initial="hidden"
          animate={sectionControls}
          
        >
          Projelerim
        </Title>
        
        <ProjectGrid
          ref={gridRef}
          variants={gridVariants}
          initial="hidden"
          animate={gridControls}
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              variants={cardVariants}
            >
              <ProjectImageContainer>
                <ProjectImage>
                  <ProjectIcon>{project.icon}</ProjectIcon>
                </ProjectImage>
              </ProjectImageContainer>
              
              <ProjectContent>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                
                <ProjectTags>
                  {project.tags.map((tag, index) => (
                    <ProjectTag key={index}>{tag}</ProjectTag>
                  ))}
                </ProjectTags>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectGrid>
        
        <AdditionalText
          variants={textVariants}
          initial="hidden"
          animate={sectionControls}
        >
          Projelerimi detaylıca incelemek için projeler kısmına gidin
        </AdditionalText>

        <ViewAllProjects>
          <ViewAllLink 
            to="/projects"
            
          >
            Tüm Projeleri Görüntüle
          </ViewAllLink>
        </ViewAllProjects>
      </Container>
    </ProjectsSection>
  );
};

export default Projects;