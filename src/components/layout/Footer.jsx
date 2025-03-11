import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: #050505;
  color: #a5a5a5;
  padding: 40px 20px;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const FooterLinks = styled.div`
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const FooterLink = styled(Link)`
  color: #a5a5a5;
  font-size: 1rem;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #ff5a78;
  }
`;

const Copyright = styled.p`
  font-size: 0.9rem;
  margin-top: 10px;
  opacity: 0.8;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterLinks>
        <FooterLink to="/">Ana Sayfa</FooterLink>
        <FooterLink to="/about">Hakkımda</FooterLink>
        <FooterLink to="/projects">Projeler</FooterLink>
        <FooterLink to="/contact">İletişim</FooterLink>
      </FooterLinks>
      <Copyright>© {new Date().getFullYear()} Tüm hakları saklıdır.</Copyright>
    </FooterContainer>
  );
};

export default Footer;
