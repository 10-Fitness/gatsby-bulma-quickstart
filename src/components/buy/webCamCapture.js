import React, { useContext } from 'react';
import styled from 'styled-components';
import Webcam from 'react-webcam';
import { SessionContext } from '../../state/Session';

const ContinueButton = styled.a`
  clear: both;
  display: inline-block;
  border: 1px solid black;
  background-color: white;
  padding: 0.5em;
  text-transform: uppercase;
  color: black;
  
  margin-top: 1em;
  &:active {
    margin-top: 1.1em;
    margin-bottom: -1px;
    margin-left: 1px;
    margin-right: -1px;
  }
`

const WebcamContainer = styled.div`
  margin-top: 1em;
`

const ButtonContainer = styled.div`
  text-align: right;
  width: 700px;
`


class WebCamCapture extends React.Component {
    setRef = webcam => {
      this.webcam = webcam;
    };
   
    capture = ({session, dispatch}) => {
      const imageSrc = this.webcam.getScreenshot();
      dispatch({type: 'CAPTURE_PHOTO', imageSrc: imageSrc})
    };

    renderCapture = ({ session, dispatch }) => {
        const videoConstraints = {
            width: 1280,
            height: 720,
            facingMode: "user"
          };

        return (
        <div>
            <WebcamContainer>
                <Webcam
                    audio={false}
                    height={700}
                    ref={this.setRef}
                    screenshotFormat="image/jpeg"
                    width={700}
                    videoConstraints={videoConstraints}
                />
            </WebcamContainer>
            <ButtonContainer>
                <ContinueButton onClick={()=>this.capture({session, dispatch})}>Capture photo</ContinueButton>
            </ButtonContainer>
        </div>
        );
    }

    renderWithSession = ({ session, dispatch }) => {
        if (session.photo.mode == 'capture') {
            return this.renderCapture({ session, dispatch });
        } else {
            return null;
        }

    }
   
    render() {  
      return (
        <SessionContext.Consumer>
        {
            this.renderWithSession
        }
        </SessionContext.Consumer>          
      );
    }
  }


  function ConfirmCapture() {
    const { session, dispatch } = useContext(SessionContext);
    
    return <div>
      <WebcamContainer>
        <img src={session.photo.imageSrc} />
      </WebcamContainer>
      <ButtonContainer>
        <ContinueButton onClick={()=>dispatch({type: 'RETAKE'})}>Retake</ContinueButton>
      </ButtonContainer>
    </div>;
  }

  
export { WebCamCapture, ConfirmCapture }