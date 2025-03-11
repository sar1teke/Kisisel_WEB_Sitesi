import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const AnimatedBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  overflow: hidden;
`;

const GradientOrb = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.4;
  background: ${props => props.color};
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  transform: translate(-50%, -50%);

  @media (max-width: 768px) {
    width: ${props => props.size * 0.8}px;
    height: ${props => props.size * 0.8}px;
    filter: blur(40px);
  }

  @media (max-width: 480px) {
    width: ${props => props.size * 0.6}px;
    height: ${props => props.size * 0.6}px;
    filter: blur(30px);
  }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 20px 20px;
  color: var(--color-text);
  min-height: 100vh;
  position: relative;
  z-index: 1;
  width: 99vw;
  box-sizing: border-box;
  overflow-x: hidden; /* Yatay taşmayı önler */

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(5, 5, 5, 0.7);
    backdrop-filter: blur(5px);
    z-index: -1;
  }

  @media (max-width: 1024px) {
    padding: 60px 15px 20px;
  }

  @media (max-width: 768px) {
    padding: 40px 10px 20px;
  }

  @media (max-width: 480px) {
    padding: 20px 5px 20px;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  text-shadow: 0 0 20px rgba(125, 90, 255, 0.3);

  @media (max-width: 1024px) {
    font-size: 2.2rem;
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 40px;
  width: 100%;
  max-width: 1200px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 15px;
    margin-top: 30px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 12px;
    margin-top: 20px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 10px;
    margin-top: 15px;
  }
`;

const ProjectCard = styled(motion.div)`
  background: rgba(18, 18, 18, 0.8);
  padding: 20px;
  border-radius: 10px;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(125, 90, 255, 0.1);
  backdrop-filter: blur(10px);
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 5px 20px rgba(125, 90, 255, 0.4);
    border: 1px solid rgba(125, 90, 255, 0.3);
    transform: translateY(-5px);
  }

  @media (max-width: 1024px) {
    padding: 15px;
  }

  @media (max-width: 768px) {
    padding: 12px;
    border-radius: 8px;
  }

  @media (max-width: 480px) {
    padding: 10px;
    border-radius: 6px;
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  color: var(--color-secondary);
  margin-bottom: 10px;

  @media (max-width: 1024px) {
    font-size: 1.4rem;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 8px;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
    margin-bottom: 6px;
  }
`;

const ProjectDescription = styled.p`
  color: var(--color-text-secondary);
  font-size: 1rem;
  flex-grow: 1;

  @media (max-width: 1024px) {
    font-size: 0.95rem;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const ModalContent = styled(motion.div)`
  background: rgba(18, 18, 18, 0.95);
  padding: 25px;
  border-radius: 15px;
  max-width: 800px;
  width: 90%;
  color: var(--color-text);
  position: relative;
  box-shadow: 0 10px 40px rgba(125, 90, 255, 0.5);
  max-height: 90vh;
  overflow-y: auto;
  border: 1px solid rgba(125, 90, 255, 0.2);

  @media (max-width: 1024px) {
    max-width: 700px;
    padding: 20px;
  }

  @media (max-width: 768px) {
    max-width: 90%;
    padding: 15px;
    border-radius: 12px;
  }

  @media (max-width: 480px) {
    width: 95%;
    padding: 12px;
    border-radius: 10px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  color: var(--color-secondary);
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.3s ease;
  z-index: 10;

  &:hover {
    transform: scale(1.1) rotate(90deg);
  }

  @media (max-width: 768px) {
    top: 10px;
    right: 10px;
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const DetailTitle = styled.h2`
  font-size: 2rem;
  color: var(--color-secondary);
  margin-bottom: 20px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 1024px) {
    font-size: 1.8rem;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    font-size: 1.3rem;
    margin-bottom: 12px;
  }
`;

const DetailDescription = styled.p`
  color: #e0e0e0;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 20px;

  @media (max-width: 1024px) {
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    font-size: 0.95rem;
    line-height: 1.5;
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    line-height: 1.4;
    margin-bottom: 12px;
  }
`;

const TechStack = styled.div`
  margin-top: 20px;

  @media (max-width: 768px) {
    margin-top: 15px;
  }

  @media (max-width: 480px) {
    margin-top: 12px;
  }
`;

const TechLabel = styled.span`
  display: inline-block;
  background: linear-gradient(90deg, rgba(255, 158, 181, 0.7), rgba(255, 182, 193, 0.7));
  color: #fff;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  margin-right: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 5px rgba(255, 158, 181, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(255, 158, 181, 0.3);
  }

  @media (max-width: 1024px) {
    font-size: 0.85rem;
    padding: 4px 10px;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 3px 8px;
    margin-right: 8px;
    margin-bottom: 8px;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
    padding: 2px 6px;
    margin-right: 6px;
    margin-bottom: 6px;
  }
`;

const ProjectLink = styled.a`
  display: inline-block;
  background: linear-gradient(90deg, rgba(255, 158, 181, 0.7), rgba(255, 182, 193, 0.7));
  color: #fff;
  padding: 10px 25px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  margin-top: 20px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(255, 158, 181, 0.2);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 15px rgba(255, 158, 181, 0.3);
  }

  @media (max-width: 1024px) {
    padding: 8px 20px;
    font-size: 0.95rem;
  }

  @media (max-width: 768px) {
    padding: 7px 18px;
    font-size: 0.9rem;
    margin-top: 15px;
  }

  @media (max-width: 480px) {
    padding: 6px 15px;
    font-size: 0.85rem;
    margin-top: 12px;
  }
`;

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const location = useLocation();
  const directModalSwitch = useRef(false);

  const projects = [
    {
      id: 1,
      title: 'Türkçe Hakaret Tespit Sistemi',
      shortDescription: 'Çocukları siber zorbalığın olumsuz etkilerinden korumak için geliştirilen, derin öğrenme destekli kötü dil tespit ve koruma sistemi.',
      fullDescription: 'Bu proje, çocukların dijital dünyada karşılaşabileceği siber zorbalık, hakaret ve olumsuz dil kullanımını tespit ederek onları korumayı hedefleyen bir yapay zeka destekli sistemdir. Çocukların sosyal medya platformlarında, online oyunlarda ve mesajlaşma uygulamalarında maruz kaldığı olumsuz içerikleri analiz eden bu sistem, zararlı ifadeleri belirleyerek gerekli önlemleri alır.Sistem, derin öğrenme tabanlı doğal dil işleme (NLP) teknikleri kullanarak metin içeriklerini analiz eder ve kötüye kullanım içeriklerini filtreler. Ebeveyn kontrol paneli sayesinde aileler, çocuklarının çevrimiçi etkileşimlerini gözlemleyebilir ve şüpheli durumlarda bildirim alabilir. Ayrıca, çocukların güvenli bir internet deneyimi yaşaması için belirli kelimeleri sansürleme veya engelleme seçenekleri sunulmuştur.',
      techStack: ['React', 'Python', 'PyTorch', 'Cuda', 'BERT'],
      link: 'https://www.kaggle.com/datasets/smailsariteke/trke-tweetlerin-6-snfa-gre-etiketlenmesi'
    },
    {
      id: 2,
      title: 'Orman Yangınlarını Otomatik Tespit Eden Otonom İHA',
      shortDescription: 'Orman yangınlarını erken safhalarda tespit ederek hızlı müdahale sağlamak amacıyla geliştirilen otonom İHA tabanlı bir sistem.',
      fullDescription: 'Bu proje, yapay zeka destekli görüntü işleme algoritmaları ve insansız hava araçları (İHA) kullanarak orman yangınlarını erken tespit etmeyi amaçlayan bir sistemdir. İHA’lar, ormanlık alanlarda devriye uçuşları yaparak çevreyi tarar ve termal kameralar ile duman, alev veya anormal sıcaklık artışlarını analiz eder. Tespit edilen yangınlar, gerçek zamanlı olarak ilgili birimlere bildirilir ve erken müdahale sağlanır.Makine öğrenimi ve derin öğrenme modelleri kullanılarak yangın belirtileri tespit edilir ve yanlış alarm oranları en aza indirilmeye çalışılır. Veri işleme süreçleri için bulut tabanlı sistemler kullanılmış, yangın verilerinin toplanması ve analiz edilmesi sağlanmıştır. Kullanıcılar, mobil uygulama veya web paneli üzerinden yangın durumlarını takip edebilir ve acil bildirimler alabilir.',
      techStack: ['C#', 'Raspberry Pi', 'Telemetri', 'Python'],
      link: ''
    },
    {
      id: 3,
      title: 'Oteller İçin NLP Tabanlı Destek Sistemi',
      shortDescription: 'Büyük ölçekli oteller için müşteri hizmetlerini geliştiren, üretken yapay zeka destekli dil modeli tabanlı bir destek sistemi.',
      fullDescription: 'Bu proje, otel müşterilerinin taleplerine anında yanıt verebilen ve otel hizmetlerini optimize eden bir yapay zeka destekli chatbot ve destek sistemi geliştirmeyi amaçlamaktadır. Doğal dil işleme (NLP) tekniklerini kullanan sistem, müşteri isteklerini analiz ederek otel resepsiyonu, oda servisi veya teknik destek birimlerine yönlendirme yapar. Sistem, büyük ölçekli oteller için üretken yapay zeka modelleri (GPT, BERT) kullanılarak geliştirilmiştir. Müşteri ile etkileşime giren chatbot, talepleri anlar, otel hizmetleri hakkında bilgi sunar ve rezervasyon işlemlerini hızlandırır. Ayrıca, müşteri geri bildirimlerini analiz ederek otel yönetiminin hizmet kalitesini iyileştirmesine yardımcı olur.',
      techStack: ['Node.js', 'React', 'BERT', 'Python', 'Swagger'],
      link: ''
    },
    {
      id: 4,
      title: '5 Eksenli Makine Simülasyonu',
      shortDescription: 'C# kullanarak geliştirdiğim, 5 eksenli bir mermer kesim makinesi için tasarlanmış arayüz ve backend sistemi.',
      fullDescription: 'Bu proje, mermer ve taş işleme sektörüne yönelik olarak geliştirilen 5 eksenli CNC mermer kesim makinesi için bir kontrol ve simülasyon yazılımıdır. C# ile geliştirilen bu arayüz, makinenin hareketlerini yönetmek ve simüle etmek için kullanılır.Kullanıcılar, yazılım aracılığıyla kesim parametrelerini belirleyebilir, farklı tasarımlar oluşturabilir ve makinenin çalışma sürecini test edebilir. Backend tarafında, kesim verileri kaydedilir ve analiz edilerek, makinenin daha verimli çalışması sağlanır. Gerçek zamanlı görselleştirme ve simülasyon desteği ile kullanıcıların üretim süreçlerini optimize etmesi hedeflenmiştir.',
      techStack: ['C#', 'WPF', '.Net Framework'],
      link: ''
    },
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const projectId = searchParams.get('id');
    if (projectId) {
      const project = projects.find(p => p.id === parseInt(projectId));
      if (project) {
        setSelectedProject(project);
        setModalPosition({
          x: window.innerWidth / 2,
          y: window.innerHeight / 2
        });
      }
    }
  }, [location, projects]);

  const handleProjectClick = (project, e) => {
    if (selectedProject) {
      directModalSwitch.current = true;
      setSelectedProject(null);
      setTimeout(() => {
        setSelectedProject(project);
        setModalPosition({ x: e.clientX, y: e.clientY });
        directModalSwitch.current = false;
      }, 10);
    } else {
      setSelectedProject(project);
      setModalPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <AnimatedBackground>
        {projects.map((_, index) => (
          <GradientOrb
            key={index}
            size={400 - (index * 40)}
            color={['linear-gradient(135deg, #7d5aff, #5a78ff)', 'linear-gradient(135deg, #ff5a78, #ff5a5a)', 'linear-gradient(135deg, #5affff, #5a78ff)', 'linear-gradient(135deg, #7d5aff, #ff5a78)', 'linear-gradient(135deg, #a05aff, #5affb8)'][index % 5]}
            animate={{
              x: `calc(${mousePosition.x * 0.1 + (index * 20 - 40)}vw)`,
              y: `calc(${mousePosition.y * 0.1 + (index * 20 - 40)}vh)`,
            }}
            transition={{ type: 'spring', stiffness: 20, damping: 10 }}
          />
        ))}
      </AnimatedBackground>

      <PageContainer>
        <Title>Projelerim</Title>
        <ProjectGrid>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              onClick={(e) => handleProjectClick(project, e)}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDescription>{project.shortDescription}</ProjectDescription>
            </ProjectCard>
          ))}
        </ProjectGrid>

        <AnimatePresence mode="wait">
          {selectedProject && (
            <ModalOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: directModalSwitch.current ? 0.01 : 0.2 }}
              onClick={closeModal}
            >
              <ModalContent
                onClick={(e) => e.stopPropagation()}
                initial={{
                  opacity: 0,
                  scale: 0.5,
                  x: modalPosition.x - window.innerWidth / 2,
                  y: modalPosition.y - window.innerHeight / 2,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: 0,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.5,
                  filter: 'blur(10px)',
                }}
                transition={{
                  duration: directModalSwitch.current ? 0.01 : 0.25,
                  type: 'spring',
                  stiffness: 300,
                  damping: 30
                }}
              >
                <CloseButton onClick={closeModal}>×</CloseButton>
                <DetailTitle>{selectedProject.title}</DetailTitle>
                <DetailDescription>{selectedProject.fullDescription}</DetailDescription>
                <TechStack>
                  <h4 style={{ marginBottom: '10px', color: 'var(--color-primary)' }}>Kullanılan Teknolojiler:</h4>
                  {selectedProject.techStack.map((tech, index) => (
                    <TechLabel key={index}>{tech}</TechLabel>
                  ))}
                </TechStack>
                {selectedProject.link && (
                  <ProjectLink href={selectedProject.link} target="_blank" rel="noopener noreferrer">
                    Projeyi İncele
                  </ProjectLink>
                )}
              </ModalContent>
            </ModalOverlay>
          )}
        </AnimatePresence>
      </PageContainer>
    </>
  );
};

export default ProjectsPage;