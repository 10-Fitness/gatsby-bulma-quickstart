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
import WebCamCapture from '../components/webCamCapture';
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

const Label = styled.label`
    font-family: 'Roboto',sans-serif;
    display: block;
    font-size: 14px;
    letter-spacing: 0;
    color: #000000;
    max-width: 100%;
    margin-bottom: 5px;
    font-weight: 550;
    padding-top: 5px;
    cursor: default;
`;

const StyledField = styled(Field)`
  border-radius: 0;
  box-shadow: none;
  width: 100%;
  height: 34px;
  margin: 0 0 5px 0;
  font-size: 17px;
  border: 1px solid #ccc;
  padding-left: 0.5em; 
`

const YourSummary = styled.div`
  background-color: #F8F8F8;
  padding: 1em;
`

const Row = styled.div`
  padding-top: 0.5em;
`

const Message = styled.div`
  font-size: 0.9em;
`

const SmallPageTitle = styled(PageTitle)`
  font-size: 1.5em;
`

function twoColumns(c1, c2, sharedMessage) {
  return (
    <Row>
      <div class="columns is-mobile" style={{'paddingBottom': '0px', 'marginBottom': '0px'}}>
        <div class="column" style={{'paddingBottom': '0px', 'marginBottom': '0px'}}>
            {c1}
        </div>
        <div class="column" style={{'paddingBottom': '0px', 'marginBottom': '0px'}}>
            {c2}
        </div>
        
      </div>
      <Message>{sharedMessage}</Message>
    </Row>
    
  )
}

function fLayout(fieldName, inputField, error, comments) {
  return <div>
    <Label>{fieldName}</Label>
    {inputField}
    {error}
    <Message>{comments}</Message>
  </div>
}

function AboutYouFields(values, errors, status, touched, isSubmitting) {
  return <div>
      {twoColumns(
        fLayout(
          "First Name",
          <StyledField type="text" name="fName" />,
          <ErrorMessage name="fName" component="div" />),
        fLayout(
          "Last Name",
          <StyledField type="text" name="lName" />,
          <ErrorMessage name="fName" component="div" />)
      )}

      {twoColumns(
        fLayout(
          "Email",
          <StyledField type="text" name="email" />,
          <ErrorMessage name="email" component="div" />),
        fLayout(
          "Verify Email",
          <StyledField type="text" name="verifyEmail" />,
          <ErrorMessage name="verifyEmail" component="div" />),
          "Emails are sent for account updates, membership agreements, receipts and promotional offers."
      )}

      {twoColumns(
        fLayout(
          "Mailing Address",
          <StyledField type="text" name="mailingAddress" />,
          <ErrorMessage name="mailingAddress" component="div" />,
          "(including apt or unit #)"),
        fLayout(
          "City",
          <StyledField type="text" name="city" />,
          <ErrorMessage name="city" component="div" />)
      )}

      {twoColumns(
        fLayout(
          "Postal Code",
          <StyledField type="text" name="postalCode" />,
          <ErrorMessage name="postalCode" component="div" />),
        fLayout(
          "Date of Birth",
          <StyledField type="text" name="dob" />,
          <ErrorMessage name="dob" component="div" />,
          "(mm/dd/yyyy)")
      )}

    {twoColumns(
        fLayout(
          "Mobile Phone",
          <StyledField type="text" name="primaryPhone" />,
          <ErrorMessage name="primaryPhone" component="div" />
          ),
        fLayout(
          "Gender",
          <StyledField type="text" name="gender" />,
          <ErrorMessage name="gender" component="div" />),
          "Your door access link will be sent via text along with updates and offers."
  
      )}  
  </div>

}

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
                leftAction={<BuyHeaderButton to="/buy_2">Back</BuyHeaderButton>}
                rightAction={<BuyHeaderButton to="/">Exit</BuyHeaderButton>}
            />
        </Panel>
        <Panel>
            <BuyProgressBar position={3} />
        </Panel>
        <Panel>
        <div className="columns is-multiline">
                <div className="column is-two-third">
                  <PageTitle>
                    Profile Picture
                  </PageTitle>
                  <WebCamCapture />
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
