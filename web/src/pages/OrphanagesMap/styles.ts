import styled from 'styled-components';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;

    position: relative;
    display: flex;

    aside {
        width: 440px;
        background: linear-gradient(329.54deg, #29B6D1 0%, #00C7C7 100%);
        padding: 80px;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        
        header {
            h2 {
                font-size: 40px;
                font-weight: 800;
                line-height: 42px;
                margin-top: 64px;
            }

            p {
                line-height: 28px;
                margin-top: 24px;
            }
        }

        footer {
            display :flex;
            flex-direction: column;

            line-height: 24px;
            margin-top: 24px;

            strong {
                font-weight: 800;
            }
        }
    }

    .leaflet-container { 
            z-index: 5;
        .leaflet-popup-content-wrapper {
            background: rgba(255,255,255,0.8);
            border-radius: 20;
            box-shadow: none;
        }

        .leaflet-popup-content {
            color: #0089a5;
            font-size: 20px;
            font-weight: bold;
            margin: 8px 12px;

            display: flex;
            justify-content: space-between; 
            align-items: center;
        }

        .leaflet-popup-tip-container {
            display: none;
        }

        a {
            width: 40px;
            height:40px;
            background-color: #15c3d6;
            box-shadow: 17.28px 27.65px 41.48px rgba(23, 142, 166, 0.16);
            border-radius: 12px;

            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
    
    .create-orphanage {
        position: absolute;
        z-index: 10;

        right: 40px;
        bottom: 40px;
        width: 64px;
        height: 64px;

        background-color: #15C3D6;
        transition: background-color 0.2s;
        border-radius: 20px;

        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
            background-color: #17D6EB;
        }
    }
`;