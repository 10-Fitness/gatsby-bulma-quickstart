import React, { useContext } from 'react';
import styled from 'styled-components';
import Webcam from 'react-webcam';
import { SessionContext } from '../../state/Session';
import tracking from 'jstracking';

function crop(videoElement, options, face) {
  var cropWidth = options.width, cropHeight = options.height;
  var imageWidth = videoElement.width, imageHeight = videoElement.height;
  var faceX = face.x;
  var faceY = face.y;
  var faceWidth = face.width;
  var faceHeight = face.height;

  var result = {
    x: faceX + faceWidth / 2 - cropWidth / 2,
    y: faceY + faceHeight / 2 - cropHeight / 2,
    width: cropWidth,
    height: cropHeight,
  };
  if (result.x < 0) {
      result.x = 0;
  }
  if (result.y < 0) {
      result.y = 0;
  }
  if (result.x + result.width > imageWidth) {
      result.x = imageWidth - cropWidth;
  }
  if (result.y + result.height > imageHeight) {
      result.y = imageHeight - cropHeight;
  }
  return result;
}

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

const CapturedPhoto = styled.img`
  border: 1px solid black;
  width: 250px;
  height: 250px;
`

function cropPlusExport(img,cropX,cropY,cropWidth,cropHeight){
  // create a temporary canvas sized to the cropped size
  var canvas1=document.createElement('canvas');
  var ctx1=canvas1.getContext('2d');
  canvas1.width=cropWidth;
  canvas1.height=cropHeight;
  // use the extended from of drawImage to draw the
  // cropped area to the temp canvas
  ctx1.drawImage(img,cropX,cropY,cropWidth,cropHeight,0,0,cropWidth,cropHeight);
  // return the .toDataURL of the temp canvas
  return(canvas1.toDataURL());
}

class WebCamCapture extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        canCapture: 5
      }
      this.videoMonitor = null;
      this.faceObjects = new tracking.ObjectTracker(['face']);
    }

    componentWillMount() {
      const checkVideo = () => {
        var video = document.getElementsByTagName("video")[0];
        if (video) {
          if (this.state.canCapture > 0) {
            this.setState({ canCapture: this.state.canCapture - 1});
            this.videoMonitor = setTimeout(checkVideo, 1000);  
          }
        } else {
          this.videoMonitor = setTimeout(checkVideo, 1000);
        }
      }
      checkVideo();
    }

    componentWillUnmount() {
      clearTimeout(this.videoMonitor);
    }

    setRef = webcam => {
      this.webcam = webcam;
    };
   
    capture = ({ session, dispatch }) => {
      var video = document.getElementsByTagName("video")[0];
      this.faceObjects.on('track', (event) => {
        if(event.data.length > 0) {
          let face = event.data[0];
          let { x, y, width, height } = crop(video, { width: 250, height: 250 }, face);
          dispatch({
            type: "CAPTURE_PHOTO",
            imageSrc: cropPlusExport(video, x*1.828, y*1.828, width*1.828, height*1.828)
          })
        }
      });
      tracking.track(video, this.faceObjects, {
        camera: false,
        fps: 10,
        scaled: true
    });
    }

    renderCapture = ({ session, dispatch }) => {
        const videoConstraints = {
            width: 1280,
            height: 720,
            facingMode: "user"
          };
        if(this.state.canCapture === 0) {
          this.capture({session, dispatch});
        }

        return (
        <div>
            <WebcamContainer>
                <Webcam
                    audio={false}
                    height={393}
                    ref={this.setRef}
                    screenshotFormat="image/jpeg"
                    width={700}
                    videoConstraints={videoConstraints}
                />
            </WebcamContainer>
            <ButtonContainer>
                <ContinueButton onClick={()=>this.capture({session, dispatch})}>
                  Capture photo {this.state.canCapture}
                </ContinueButton>
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
        <CapturedPhoto src={session.photo.imageSrc} />
      </WebcamContainer>
      <ButtonContainer>
        <ContinueButton onClick={()=>dispatch({type: 'RETAKE'})}>Retake</ContinueButton>
      </ButtonContainer>
    </div>;
  }

  
export { WebCamCapture, ConfirmCapture }