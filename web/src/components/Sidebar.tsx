import React from 'react';
import styled from 'styled-components';

import { FiArrowLeft } from "react-icons/fi";
import mapMarkerImg from '../images/map-marker.svg';
import { useHistory } from "react-router-dom";

const Container = styled.aside`
    position: fixed;
    height: 100%;
    padding: 32px 24px;
    background: linear-gradient(329.54deg, #15B6D6 0%, #15D6D6 100%);
  
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    img {
      width: 48px;
    }
    
    footer {
      a, button {
        width: 48px;
        height: 48px;
      
        border: 0;
      
        background: #12AFCB;
        border-radius: 16px;
      
        cursor: pointer;
      
        transition: background-color 0.2s;
      
        display: flex;
        justify-content: center;
        align-items: center;
          
        &:hover {
          background: #17D6EB;
        }
      }
  }
`;

export const SideBar: React.FC = () => {
    const { goBack } = useHistory();

    return (
        <Container>
            <img src={mapMarkerImg} alt="Happy" />

            <footer>
                <button type="button" onClick={goBack}>
                    <FiArrowLeft size={24} color="#FFF" />
                </button>
            </footer>
        </Container>
    );
}