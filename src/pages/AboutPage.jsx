import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const WaveBackground = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 20px;
  min-height: 100vh;
  font-family: var(--font-family);
  color: var(--color-text);
  background: transparent;
  position: relative;
  z-index: 1;

  @media (max-width: 1024px) {
    padding: 60px 15px;
  }

  @media (max-width: 768px) {
    padding: 40px 10px;
  }

  @media (max-width: 480px) {
    padding: 20px 5px;
  }
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 40px;
  text-align: center;
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 15px rgba(125, 90, 255, 0.5);

  @media (max-width: 1024px) {
    font-size: 2.2rem;
    margin-bottom: 30px;
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
`;

const Section = styled(motion.section)`
  margin-bottom: 60px;
  width: 100%;
  max-width: 800px;
  padding: 30px 20px;
  text-align: center;
  background: rgba(10, 10, 10, 0.7);
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), 0 0 15px rgba(125, 90, 255, 0.2);
  backdrop-filter: blur(5px);

  @media (max-width: 1024px) {
    padding: 25px 15px;
    margin-bottom: 50px;
  }

  @media (max-width: 768px) {
    padding: 20px 10px;
    margin-bottom: 40px;
    max-width: 90%;
  }

  @media (max-width: 480px) {
    padding: 15px 8px;
    margin-bottom: 30px;
    max-width: 100%;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: var(--color-secondary);
  text-align: center;
  text-shadow: 0 0 10px rgba(255, 90, 120, 0.3);

  @media (max-width: 1024px) {
    font-size: 1.8rem;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }
`;

const Paragraph = styled(motion.p)`
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: 15px;
  color: var(--color-text-secondary);
  text-align: center;

  @media (max-width: 1024px) {
    font-size: 0.95rem;
    line-height: 1.7;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    line-height: 1.6;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
    line-height: 1.5;
  }
`;

const List = styled(motion.ul)`
  list-style-type: none;
  padding: 0;
  text-align: center;
`;

const ListItem = styled(motion.li)`
  margin-bottom: 15px;
  padding: 12px 15px;
  border-radius: 8px;
  background: rgba(10, 10, 10, 0.4);
  transition: background 0.3s ease, transform 0.3s ease;
  border: 1px solid rgba(125, 90, 255, 0.1);

  &:hover {
    background: rgba(10, 10, 10, 0.6);
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(125, 90, 255, 0.2);
  }

  a {
    color: var(--color-primary);
    text-decoration: none;
    transition: color 0.3s ease;
    &:hover {
      color: var(--color-secondary);
    }
  }

  @media (max-width: 768px) {
    padding: 10px 12px;
    margin-bottom: 12px;
  }

  @media (max-width: 480px) {
    padding: 8px 10px;
    margin-bottom: 10px;
  }
`;

const FluidWaveAnimation = () => {
  const canvasRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef([]);
  const prevPointerRef = useRef({ x: 0, y: 0 });
  const activePointersRef = useRef({});

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width, height;

    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() || '#7d5aff';
    const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-secondary').trim() || '#ff5a78';
    const backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--color-background').trim() || '#050505';

    const waterColors = [
      { r: 125, g: 90, b: 255, a: 0.6 },
      { r: 255, g: 90, b: 120, a: 0.6 },
      { r: 90, g: 120, b: 255, a: 0.5 },
      { r: 150, g: 70, b: 200, a: 0.5 }
    ];

    class Particle {
      constructor(x, y, color, mass) {
        this.x = x;
        this.y = y;
        this.originalX = x;
        this.originalY = y;
        this.vx = 0;
        this.vy = 0;
        this.color = color;
        this.mass = mass || 1;
        this.radius = Math.random() * 2 + 1;
        this.friction = 0.97;
        this.intensity = 0;
      }

      update() {
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.x += this.vx;
        this.y += this.vy;
        const dx = this.originalX - this.x;
        const dy = this.originalY - this.y;
        this.vx += dx * 0.01;
        this.vy += dy * 0.01;
        this.intensity *= 0.98;
        return this;
      }

      draw(ctx) {
        const alpha = Math.min(0.8, 0.1 + this.intensity);
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius + this.intensity * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      disturbance(mx, my, force) {
        const dx = this.x - mx;
        const dy = this.y - my;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 100;
        if (distance < maxDistance) {
          const power = (1 - distance / maxDistance) * force;
          this.vx += dx * power * 0.02;
          this.vy += dy * power * 0.02;
          this.intensity += power * 0.5;
        }
      }
    }

    const setup = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      particlesRef.current = [];
      // Mobil cihazlarda daha az partikül kullanarak performansı optimize edelim
      const isMobile = window.innerWidth <= 768;
      const particleDensity = isMobile ? 5000 : 3000;
      const particleCount = Math.floor((width * height) / particleDensity);
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const colorIndex = Math.floor(Math.random() * waterColors.length);
        const mass = Math.random() * 0.5 + 0.5;
        particlesRef.current.push(new Particle(x, y, waterColors[colorIndex], mass));
      }
    };

    const drawFluid = () => {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);
      const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width, height)/1.5);
      gradient.addColorStop(0, 'rgba(10, 10, 10, 0.8)');
      gradient.addColorStop(1, 'rgba(5, 5, 5, 0.9)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      const pointerX = pointerRef.current.x;
      const pointerY = pointerRef.current.y;
      const prevX = prevPointerRef.current.x;
      const prevY = prevPointerRef.current.y;
      const distance = Math.sqrt((pointerX - prevX) ** 2 + (pointerY - prevY) ** 2);
      const activePointers = Object.values(activePointersRef.current);
      ctx.globalCompositeOperation = 'lighter';
      particlesRef.current.forEach(p => {
        if (distance > 5) {
          const force = Math.min(15, distance / 10);
          p.disturbance(pointerX, pointerY, force);
          for (let t = 0; t < 1; t += 0.2) {
            const pathX = prevX + (pointerX - prevX) * t;
            const pathY = prevY + (pointerY - prevY) * t;
            p.disturbance(pathX, pathY, force * 0.5);
          }
        }
        activePointers.forEach(pointer => {
          p.disturbance(pointer.x, pointer.y, 10);
        });
        p.update().draw(ctx);
      });
      prevPointerRef.current = { x: pointerX, y: pointerY };
      addSubtleWaves(ctx);
      animationFrameId = requestAnimationFrame(drawFluid);
    };

    const addSubtleWaves = (ctx) => {
      const time = Date.now() * 0.001;
      ctx.globalCompositeOperation = 'overlay';
      ctx.beginPath();
      for (let x = 0; x < width; x += 10) {
        const y1 = height * 0.3 + Math.sin(x * 0.01 + time) * 20;
        if (x === 0) {
          ctx.moveTo(x, y1);
        } else {
          ctx.lineTo(x, y1);
        }
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      const waveGradient = ctx.createLinearGradient(0, height * 0.3, 0, height);
      waveGradient.addColorStop(0, `rgba(125, 90, 255, 0.05)`);
      waveGradient.addColorStop(1, `rgba(255, 90, 120, 0.02)`);
      ctx.fillStyle = waveGradient;
      ctx.fill();
      ctx.beginPath();
      for (let x = 0; x < width; x += 10) {
        const y2 = height * 0.6 + Math.sin(x * 0.02 + time * 0.7) * 15;
        if (x === 0) {
          ctx.moveTo(x, y2);
        } else {
          ctx.lineTo(x, y2);
        }
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      const waveGradient2 = ctx.createLinearGradient(0, height * 0.6, 0, height);
      waveGradient2.addColorStop(0, `rgba(255, 90, 120, 0.03)`);
      waveGradient2.addColorStop(1, `rgba(125, 90, 255, 0.02)`);
      ctx.fillStyle = waveGradient2;
      ctx.fill();
      ctx.globalCompositeOperation = 'source-over';
    };

    const handleMouseMove = (e) => {
      pointerRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleTouchMove = (e) => {
      // e.preventDefault() kaldırıldı, kaydırma engellenmeyecek
      for (let i = 0; i < e.touches.length; i++) {
        const touch = e.touches[i];
        activePointersRef.current[touch.identifier] = {
          x: touch.clientX,
          y: touch.clientY
        };
      }
      if (e.touches.length > 0) {
        pointerRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        };
      }
    };

    const handleTouchEnd = (e) => {
      for (let i = 0; i < e.changedTouches.length; i++) {
        delete activePointersRef.current[e.changedTouches[i].identifier];
      }
    };

    const handleResize = () => {
      setup();
    };

    setup();
    drawFluid();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true }); // passive: true eklenerek kaydırma serbest bırakıldı
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <WaveBackground ref={canvasRef} />;
};

const AboutPage = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <>
      <FluidWaveAnimation />
      <PageContainer>
        <Title
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          Hakkımda
        </Title>

        <AnimatedSection>
          <SectionTitle variants={fadeInUp}>Merhaba, ben İsmail!</SectionTitle>
          <Paragraph variants={fadeInUp}>
            Selçuk Üniversitesi Bilgisayar Mühendisliği bölümünden mezun, C#, Dart ve React ile uğraşmayı seven bir bilgisayar mühendisiyim. Şu an Turkcell'de Uzun Dönem Stajyer olarak çalışıyorum.
          </Paragraph>
          <Paragraph variants={fadeInUp}>
            Okumayı, öğrenmeyi, düşünmeyi, kod yazmayı ve sinemayla ilgilenmeyi severim.
          </Paragraph>
        </AnimatedSection>

        <AnimatedSection>
          <SectionTitle variants={fadeInUp}>Profil</SectionTitle>
          <List variants={staggerContainer} initial="hidden" animate="visible">
            <ListItem variants={fadeInUp}><strong>Tam İsim:</strong> İsmail Sarıteke</ListItem>
            <ListItem variants={fadeInUp}><strong>Email:</strong> issariteke@hotmail.com</ListItem>
            <ListItem variants={fadeInUp}><strong>Doğum:</strong> Mayıs 2003 - Ağrı</ListItem>
            <ListItem variants={fadeInUp}><strong>Dil:</strong> İngilizce (A2-B1)</ListItem>
          </List>
        </AnimatedSection>

        <AnimatedSection>
          <SectionTitle variants={fadeInUp}>Eğitim</SectionTitle>
          <List variants={staggerContainer} initial="hidden" animate="visible">
            <ListItem variants={fadeInUp}>
              <strong>Bilgisayar Mühendisliği Lisans</strong><br />
              Selçuk Üniversitesi Bilgisayar Mühendisliği - 2021-2025 (GPA: 2.99, Devam Ediyor)
              <Paragraph variants={fadeInUp}>
                Üniversite eğitimime aktif olarak devam ediyorum. Özellikle son 2 yılımda aktif olarak projeler geliştirdim. Otonom yangın tespiti yapan İHA üzerinde çalışmalar yaptım ve oteller için destekleyici bir ChatBot tasarladım. Bitirme projesi olarak "Çocuklara Yönelik Hakaret İçerikli Dil Tespiti" adlı bir proje geliştirdim.
              </Paragraph>
            </ListItem>
            <ListItem variants={fadeInUp}>
              <strong>Bilgi Yönetimi Önlisans</strong><br />
              Atatürk Üniversitesi Bilgi Yönetimi - 2022-2024 (GPA: 3.50, Yüksek Onur Öğrencisi)
              <Paragraph variants={fadeInUp}>
                Üniversite eğitimimi 3.50 ortalama ile 2024 yılında tamamladım.
              </Paragraph>
            </ListItem>
            <ListItem variants={fadeInUp}>
              <strong>Üretken Akademi</strong><br />
              React.js Eğitimi (50 Saat) - 2023
              <Paragraph variants={fadeInUp}>
                Başarı ve katılım sertifikası aldığım bu eğitimde, web tasarım ve framework'leri üzerine eğitimler aldım. Programın asıl amacı olan React.js üzerinde, Meram Belediyesi için alternatif bir tanıtım sayfası tasarladım.
              </Paragraph>
            </ListItem>
          </List>
        </AnimatedSection>

        <AnimatedSection>
          <SectionTitle variants={fadeInUp}>İş Tecrübesi</SectionTitle>
          <List variants={staggerContainer} initial="hidden" animate="visible">
            <ListItem variants={fadeInUp}>
              <strong>Turkcell</strong><br />
              İç Kontrol ve Sürekli İyileştirme - Uzun Dönem Stajyer (Şubat 2025 - Devam Ediyor)
              <Paragraph variants={fadeInUp}>
                Turkcell'de İç Kontrol ve Sürekli İyileştirme biriminde aktif olarak staj yapmaktayım.
              </Paragraph>
            </ListItem>
            <ListItem variants={fadeInUp}>
              <strong>SM Otomasyon Mühendislik</strong><br />
              Junior Software Developer (Ekim 2024 - Ocak 2025)
              <Paragraph variants={fadeInUp}>
                SM Otomasyon Mühendislik'te Yazılım Departmanı bünyesinde .Net Framework geliştirici olarak çalışıyorum. Bu süreçte, 5 eksenli bir kesim makinesinin simülasyonu üzerine yoğun çalışmalar yaptım. .Net WPF ile kullanıcı dostu bir arayüz geliştirdim; backend için C# kullanıp simülasyon için HelixToolKit kütüphanesini tercih ettim. 5 eksenli simülasyonun işlevleri arasında çizim ekranı, çizilen şeklin özelliklerini gösteren bir ekran, çalışma prensiplerini anlattığım bir eğitim sayfası, simülasyon ekranı ve G-Code ile XML çıktıları yer alıyor.
              </Paragraph>
            </ListItem>
            <ListItem variants={fadeInUp}>
              <strong>SM Otomasyon Mühendislik</strong><br />
              Stajyer - Yazılım Geliştirici (Temmuz 2024 - Eylül 2024)
              <Paragraph variants={fadeInUp}>
                SM Otomasyon Mühendislik Yazılım ekibi ile üç aylık bir staj sürecinde çalıştım. Bu dönemde C# ve WPF ile arayüz tasarımı yaparak yapay zeka destekli bir raporlama programı geliştirdim. Ayrıca G-Code ve XML dosya okuma/yazma işlemleri üzerinde çalışarak veri görselleştirme ve simülasyon projelerinde görev aldım.
              </Paragraph>
            </ListItem>
          </List>
        </AnimatedSection>

        <AnimatedSection>
          <SectionTitle variants={fadeInUp}>Beceriler</SectionTitle>
          <List variants={staggerContainer} initial="hidden" animate="visible">
            <ListItem variants={fadeInUp}><strong>Programlama Dilleri:</strong> C#, Dart, JavaScript (React, Node.js), Python</ListItem>
            <ListItem variants={fadeInUp}><strong>Web Teknolojileri:</strong> React.js, Next.js, ASP.NET Core, HTML, CSS, TailwindCSS</ListItem>
            <ListItem variants={fadeInUp}><strong>Mobil Geliştirme:</strong> Flutter</ListItem>
            <ListItem variants={fadeInUp}><strong>Veritabanları:</strong> PostgreSQL, Firebase, MySQL</ListItem>
            <ListItem variants={fadeInUp}><strong>Diğer:</strong> Git & GitHub, Docker, Agile/Scrum, Yapay Zeka</ListItem>
          </List>
        </AnimatedSection>

        <AnimatedSection>
          <SectionTitle variants={fadeInUp}>Sertifikalar</SectionTitle>
          <List variants={staggerContainer} initial="hidden" animate="visible">
            <ListItem variants={fadeInUp}><strong>React.js Eğitimi - Üretken Akademi (2023)</strong></ListItem>
            <ListItem variants={fadeInUp}><strong>Python ile Makine Öğrenmesi - Udemy (2023)</strong></ListItem>
            <ListItem variants={fadeInUp}><strong>İleri Seviye SQL Eğitimi - Udemy (2024)</strong></ListItem>
          </List>
        </AnimatedSection>
      </PageContainer>
    </>
  );
};

const AnimatedSection = ({ children }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <Section
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: 'easeOut', when: 'beforeChildren', staggerChildren: 0.2 },
        },
      }}
    >
      {children}
    </Section>
  );
};

export default AboutPage;