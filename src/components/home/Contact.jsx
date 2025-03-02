import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ContactSection = styled.section`
  background-color: #0a0a0a;
  color: #ffffff;
  padding: 100px 20px;
  text-align: center;
`;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
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
  margin-bottom: 30px;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #555;
  border-radius: 5px;
  background: #151515;
  color: #fff;
  outline: none;
`;

const Textarea = styled.textarea`
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #555;
  border-radius: 5px;
  background: #151515;
  color: #fff;
  outline: none;
  resize: none;
  height: 120px;
`;

const SubmitButton = styled(motion.button)`
  padding: 12px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  background: linear-gradient(90deg, #7d5aff, #ff5a78);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: linear-gradient(90deg, #ff5a78, #7d5aff);
  }
`;

const Contact = () => {
  return (
    <ContactSection>
      <Container>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          İletişime Geç
        </Title>
        <Description
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Herhangi bir sorunuz veya projeniz hakkında konuşmak isterseniz, aşağıdaki formu doldurun!
        </Description>
        <ContactForm>
          <Input type="text" placeholder="Adınız" required />
          <Input type="email" placeholder="E-posta Adresiniz" required />
          <Textarea placeholder="Mesajınız" required />
          <SubmitButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Gönder
          </SubmitButton>
        </ContactForm>
      </Container>
    </ContactSection>
  );
};

export default Contact;
