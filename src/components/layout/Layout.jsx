import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import Footer from './Footer';

const Main = styled.main`
  min-height: 100vh;
`;

const LoadingScreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #050505;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  transition: opacity 0.5s ease-out;
  opacity: ${props => (props.isLoading ? 1 : 0)};
  pointer-events: ${props => (props.isLoading ? 'all' : 'none')};
`;

const LoadingContent = styled.div`
  text-align: center;
`;

const LoadingText = styled.h2`
  font-size: 2rem;
  color: white;
  margin-bottom: 20px;
`;

const ProgressBar = styled.div`
  width: 200px;
  height: 4px;
  background-color: #1a1a1a;
  border-radius: 4px;
  overflow: hidden;
  margin: 0 auto;
`;

const Progress = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #7d5aff, #ff5a78);
  width: ${props => props.value}%;
  transition: width 0.3s ease;
`;

const Layout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <LoadingScreen isLoading={isLoading}>
        <LoadingContent>
          <LoadingText>Evren Yükleniyor</LoadingText>
          <ProgressBar>
            <Progress value={progress} />
          </ProgressBar>
        </LoadingContent>
      </LoadingScreen>
      <Navbar />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

export default Layout;