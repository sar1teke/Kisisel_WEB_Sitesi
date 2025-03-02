// src/contexts/ScrollContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const ScrollContext = createContext();

export const useScroll = () => useContext(ScrollContext);

export const ScrollProvider = ({ children }) => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('down');
  const [sections, setSections] = useState([]);
  const [activeSection, setActiveSection] = useState(null);

  // Scroll pozisyonunu ve yönünü izle
  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      const direction = currentScrollY > lastScrollY ? 'down' : 'up';
      
      setScrollY(currentScrollY);
      setScrollDirection(direction);
      lastScrollY = currentScrollY;

      // Aktif bölümü belirle
      if (sections.length > 0) {
        // Viewport'un ortasının pozisyonu
        const viewportMiddle = currentScrollY + window.innerHeight / 2;
        
        // Hangi bölümün içinde olduğumuzu bul
        for (let i = 0; i < sections.length; i++) {
          const section = sections[i];
          if (section && viewportMiddle >= section.offsetTop && 
              viewportMiddle < (section.offsetTop + section.offsetHeight)) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  // Bölümleri kaydet
  const registerSection = (sectionRef) => {
    if (sectionRef && sectionRef.current && !sections.find(s => s.id === sectionRef.current.id)) {
      setSections(prev => [...prev, {
        id: sectionRef.current.id,
        offsetTop: sectionRef.current.offsetTop,
        offsetHeight: sectionRef.current.offsetHeight
      }]);
    }
  };

  // Pencere boyutunu izle ve bölüm pozisyonlarını güncelle
  useEffect(() => {
    const handleResize = () => {
      setSections(prev => prev.map(section => {
        const elem = document.getElementById(section.id);
        if (elem) {
          return {
            ...section,
            offsetTop: elem.offsetTop,
            offsetHeight: elem.offsetHeight
          };
        }
        return section;
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sections]);

  // Belirli bir bölüme kaydır
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const value = {
    scrollY,
    scrollDirection,
    activeSection,
    registerSection,
    scrollToSection
  };

  return (
    <ScrollContext.Provider value={value}>
      {children}
    </ScrollContext.Provider>
  );
};