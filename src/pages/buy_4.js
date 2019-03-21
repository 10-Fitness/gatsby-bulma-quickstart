import React, { useContext } from 'react';
import styled from "styled-components"
import { Link } from 'gatsby';
import Helmet from '../components/helmet';
import Panel from '../components/panel';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import PageTitle from '../components/pageTitle';
import BuyHeaderButton from '../components/buy/buyHeaderButton';
import BuyProgressBar from '../components/buy/buyProgressBar';
import BuyHeader from '../components/buy/buyHeader';
import { SessionContext } from '../state/Session';
import { WebCamCapture, ConfirmCapture } from '../components/buy/webCamCapture';
import '../components/style.scss';
import Webcam from "react-webcam";

const ContinueButton = styled(Link)`
  display: inline-block;
  border: 1px solid black;
  background-color: white;
  padding: 0.5em;
  text-transform: uppercase;
  color: black;
  float: right;
  margin-top: 1em;
  &:active {
    margin-top: 1.1em;
    margin-bottom: -1px;
    margin-left: 1px;
    margin-right: -1px;
  }
`


const YourSummary = styled.div`
  background-color: #F8F8F8;
  padding: 1em;
`

const SmallPageTitle = styled(PageTitle)`
  font-size: 1.5em;
`

function IndexPage() {

    const { session, dispatch } = useContext(SessionContext);
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };
    return <div>
        <Helmet />
        <Panel >
            <BuyHeader 
                title={`${session.location} membership`}
                leftAction={<BuyHeaderButton to="/buy_3">Back</BuyHeaderButton>}
                rightAction={<BuyHeaderButton to="/">Exit</BuyHeaderButton>}
            />
        </Panel>
        <Panel>
            <BuyProgressBar position={4} />
        </Panel>
        <Panel>
        <div className="columns is-multiline">
                <div className="column is-two-third">
                  <PageTitle>
                    Secure Payment
                  </PageTitle>
                  
                </div>
                <div className="column is-one-third">
                  <YourSummary>
                    <SmallPageTitle>
                      Your Summary
                    </SmallPageTitle>
                      <hr />
                      <div>
                        {session.selected_plan} membership @ {session.location}
                      </div>
                      <div>
                        <Link to="/buy_1">edit</Link>
                      </div>
                      
                      <hr />
                  </YourSummary>                  
                </div>
              </div>
      </Panel>
    </div>;
}

export default IndexPage;
