import React from 'react';
import styled from 'styled-components';
import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Projects from '../components/home/Projects';
import Contact from '../components/home/Contact';

const HomeContainer = styled.div`
  background-color: #050505;
  color: #ffffff;
`;

const HomePage = () => {
  return (
    <HomeContainer>
      <Hero />
      <About />
      <Projects />
      {/* <Contact /> */}
    </HomeContainer>
  );
};

export default HomePage;