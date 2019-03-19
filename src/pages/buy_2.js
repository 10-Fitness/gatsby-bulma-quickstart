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
import '../components/style.scss';


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

const Row = styled.div`
  padding-top: 0.5em;
`

const Message = styled.div`
  font-size: 0.9em;
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

    return <div>
        <Helmet />
        <Panel >
            <BuyHeader 
                title={`${session.location} membership`}
                leftAction={<BuyHeaderButton to="/buy_1">Back</BuyHeaderButton>}
                rightAction={<BuyHeaderButton to="/">Exit</BuyHeaderButton>}
            />
        </Panel>
        <Panel>
            <BuyProgressBar position={2} />
        </Panel>
        <Panel>
        <div className="columns is-multiline">
                <div className="column is-two-third">
                  <PageTitle>
                    Member Information
                  </PageTitle>
                  <Formik
                    initialValues={{}}
                    onSubmit={(values, actions) => {
                      // MyImaginaryRestApiCall(user.id, values).then(
                      //   updatedUser => {
                      //     actions.setSubmitting(false);
                      //     updateUser(updatedUser);
                      //     onClose();
                      //   },
                      //   error => {
                      //     actions.setSubmitting(false);
                      //     actions.setErrors(transformMyRestApiErrorsToAnObject(error));
                      //     actions.setStatus({ msg: 'Set some arbitrary status or data' });
                      //   }
                      // );
                    }}
                    render={({ values, errors, status, touched, isSubmitting }) => (
                        <Form>
                        {AboutYouFields(values, errors, status, touched, isSubmitting)}
                        {status && status.msg && <div>{status.msg}</div>}
                        <button type="submit" disabled={isSubmitting}>
                          Submit
                        </button>
                      </Form>
                    )}
                  />
                </div>
                <div className="column is-one-third">
                  <PageTitle>
                    Your Summary
                  </PageTitle>
                    <hr />
                    <div>
                      {session.selected_plan} membership @ {session.location}
                    </div>
                    <div>
                      <Link to="/buy_1">edit</Link>
                    </div>
                    
                    <hr />
                </div>
              </div>
      </Panel>
    </div>;
}

export default IndexPage;
