import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaInstagram, FaLinkedin, FaGithub, FaYinYang } from 'react-icons/fa';
import { SiKaggle } from 'react-icons/si';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 20px;
  color: white;
  min-height: 100vh;
  background: #050505;

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

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 40px;
  background: linear-gradient(90deg, #7d5aff, #ff5a78);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;

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

const ContactContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  gap: 30px;

  @media (max-width: 1024px) {
    gap: 20px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const ContactForm = styled.div`
  background: rgba(20, 20, 20, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px;
  flex: 2;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 1024px) {
    padding: 30px;
  }

  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 15px;
  }

  @media (max-width: 480px) {
    padding: 15px;
    border-radius: 10px;
  }
`;

const SocialSidebar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  flex: 1;

  @media (max-width: 1024px) {
    gap: 15px;
  }

  @media (max-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

const SocialIcon = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  text-decoration: none;
  padding: 12px 20px;
  border-radius: 50px;
  background: linear-gradient(90deg, rgba(125, 90, 255, 0.2), rgba(255, 90, 120, 0.2));
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    background: linear-gradient(90deg, rgba(125, 90, 255, 0.4), rgba(255, 90, 120, 0.4));
    transform: translateY(-2px);
  }

  @media (max-width: 1024px) {
    padding: 10px 18px;
    font-size: 0.95rem;
  }

  @media (max-width: 768px) {
    padding: 8px 15px;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 6px 12px;
    font-size: 0.85rem;
    gap: 8px;
  }
`;

const CVButton = styled(motion.a)`
  display: inline-block;
  padding: 14px 32px;
  background: linear-gradient(90deg, #7d5aff, #ff5a78);
  color: white;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(125, 90, 255, 0.4);

  &:hover {
    box-shadow: 0 6px 20px rgba(125, 90, 255, 0.6);
  }

  @media (max-width: 1024px) {
    padding: 12px 28px;
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    padding: 10px 24px;
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    padding: 8px 20px;
    font-size: 0.9rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 25px;

  @media (max-width: 1024px) {
    margin-bottom: 20px;
  }

  @media (max-width: 768px) {
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    margin-bottom: 12px;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);

  @media (max-width: 768px) {
    margin-bottom: 6px;
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 5px;
    font-size: 0.9rem;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 14px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #7d5aff;
  }

  @media (max-width: 1024px) {
    padding: 12px;
    font-size: 0.95rem;
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 8px;
    font-size: 0.85rem;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 14px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #7d5aff;
  }

  @media (max-width: 1024px) {
    padding: 12px;
    font-size: 0.95rem;
    min-height: 120px;
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 0.9rem;
    min-height: 100px;
  }

  @media (max-width: 480px) {
    padding: 8px;
    font-size: 0.85rem;
    min-height: 80px;
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 14px 32px;
  background: linear-gradient(90deg, #7d5aff, #ff5a78);
  color: white;
  border-radius: 50px;
  border: none;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(125, 90, 255, 0.4);

  &:hover {
    box-shadow: 0 6px 20px rgba(125, 90, 255, 0.6);
  }

  @media (max-width: 1024px) {
    padding: 12px 28px;
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    padding: 10px 24px;
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    padding: 8px 20px;
    font-size: 0.9rem;
  }
`;

const socialLinks = [
  { icon: <FaEnvelope size={20} />, text: "Email", href: "mailto:issariteke@hotmail.com" },
  { icon: <FaPhone size={20} />, text: "Phone", href: "tel:+905511382743" },
  { icon: <FaInstagram size={20} />, text: "Instagram", href: "https://instagram.com/ismail_sari._" },
  { icon: <FaLinkedin size={20} />, text: "LinkedIn", href: "https://www.linkedin.com/in/ismail-sariteke-501357226/" },
  { icon: <SiKaggle size={20} />, text: "Kaggle", href: "https://www.kaggle.com/smailsariteke" },
  { icon: <FaGithub size={20} />, text: "GitHub", href: "https://github.com/sar1teke" },
  { icon: <FaYinYang size={20} />, text: "Blog", href: "https://ismailsariteke.site" },
];

const ContactPage = () => {
  const iconVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { scale: 1.05 }
  };

  const formVariants = {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  const buttonVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { delay: 0.4 } },
    hover: { scale: 1.05, transition: { duration: 0.2 } }
  };

  return (
    <PageContainer>
      <Title>İletişime Geçin</Title>
      <ContactContainer>
        <motion.div
          variants={formVariants}
          initial="initial"
          animate="animate"
          style={{ flex: 2 }}
        >
          <ContactForm>
            <FormGroup>
              <Label>Ad Soyad</Label>
              <Input type="text" placeholder="Ad Soyad" />
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input type="email" placeholder="E-mail Adresiniz" />
            </FormGroup>
            <FormGroup>
              <Label>Mesaj</Label>
              <TextArea placeholder="Nasıl Yardımcı Olabilirim?" />
            </FormGroup>
            <SubmitButton
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
            >
              Gönder
            </SubmitButton>
          </ContactForm>
        </motion.div>

        <SocialSidebar>
          {socialLinks.map((link, index) => (
            <SocialIcon
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={iconVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              transition={{ delay: 0.1 * index }}
            >
              {link.icon}
              <span>{link.text}</span>
            </SocialIcon>
          ))}
          <CVButton
            href="src/assets/Ismail_Sariteke_CV_2025.pdf"
            download="Ismail_Sariteke_CV_2025.pdf"
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
          >
            CV İndir
          </CVButton>
        </SocialSidebar>
      </ContactContainer>
    </PageContainer>
  );
};

export default ContactPage;