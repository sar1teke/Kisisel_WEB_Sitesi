import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  background-color: ${props => (props.scrolled ? 'rgba(5, 5, 5, 0.95)' : 'transparent')};
  backdrop-filter: ${props => (props.scrolled ? 'blur(15px)' : 'none')};
  box-shadow: ${props => (props.scrolled ? '0 2px 10px rgba(0, 0, 0, 0.3)' : 'none')};

  @media (max-width: 1024px) {
    padding: 15px 20px;
  }

  @media (max-width: 768px) {
    padding: 10px 15px;
  }

  @media (max-width: 480px) {
    padding: 8px 10px;
  }
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  text-decoration: none;
  z-index: 102;
  background: linear-gradient(90deg, #7d5aff, #ff5a78);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  white-space: nowrap;

  @media (max-width: 1024px) {
    font-size: 1.6rem;
  }

  @media (max-width: 768px) {
    font-size: 1.4rem;
    display: ${props => (props.isHome ? 'block' : 'none')};
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const DesktopMenu = styled.div`
  display: flex;
  gap: 30px;

  @media (max-width: 1024px) {
    gap: 20px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  position: relative;
  padding: 5px 10px;
  transition: color 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #7d5aff, #ff5a78);
    transition: width 0.3s ease, left 0.3s ease;
  }

  &:hover::after,
  &.active::after {
    width: 100%;
    left: 0;
  }

  &:hover {
    color: #ff5a78;
  }

  &.active {
    color: #ff5a78;
  }
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.8rem;
  cursor: pointer;
  z-index: 102;
  display: none;
  position: absolute;
  top: 15px;
  right: 15px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    display: block;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    top: 10px;
    right: 10px;
  }
`;

const MobileMenuOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, rgba(5, 5, 5, 0.95), rgba(10, 10, 20, 0.95));
  z-index: 101;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  backdrop-filter: blur(10px);
  overflow: hidden;

  @media (max-width: 480px) {
    gap: 20px;
  }
`;

const MobileNavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 2rem;
  font-weight: 600;
  transition: color 0.3s ease;

  &:hover {
    color: #ff5a78;
  }

  &.active {
    color: #ff5a78;
  }
`;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
    document.body.style.overflow = mobileMenuOpen ? 'auto' : 'hidden';
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  const menuVariants = {
    hidden: { opacity: 0, x: '-100%' },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: 'easeInOut' }
    },
    exit: {
      opacity: 0,
      x: '-100%',
      transition: { duration: 0.4, ease: 'easeInOut' }
    }
  };

  const links = [
    { path: '/', label: 'Ana Sayfa' },
    { path: '/about', label: 'Hakkımda' },
    { path: '/projects', label: 'Projeler' },
    { path: '/contact', label: 'İletişim' },
  ];

  return (
    <NavContainer scrolled={scrolled}>
      <Logo to="/" isHome={isHomePage}>
        İsmail Sarıteke
      </Logo>

      <DesktopMenu>
        {links.map(link => (
          <NavLink key={link.path} to={link.path} className={location.pathname === link.path ? 'active' : ''}>
            {link.label}
          </NavLink>
        ))}
      </DesktopMenu>

      <MenuButton onClick={toggleMobileMenu}>
        {mobileMenuOpen ? '✕' : '☰'}
      </MenuButton>

      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenuOverlay variants={menuVariants} initial="hidden" animate="visible" exit="exit">
            {links.map(link => (
              <MobileNavLink key={link.path} to={link.path} onClick={closeMobileMenu}>
                {link.label}
              </MobileNavLink>
            ))}
          </MobileMenuOverlay>
        )}
      </AnimatePresence>
    </NavContainer>
  );
};

export default Navbar;
