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
    font-size: 15px;
    letter-spacing: 0;
    color: #000000;
    max-width: 100%;
    margin-bottom: 5px;
    font-weight: 700;
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

function twoColumns(c1, c2) {
  return (
    <div class="columns is-mobile">
      <div class="column">
          {c1}
      </div>
      <div class="column">
          {c2}
      </div>
    </div>
  )
}

function fLayout(fieldName, inputField, error, comments) {
  return <div>
    <Label>{fieldName}</Label>
    {inputField}
    {error}
    {comments}
  </div>
}

function AboutYouFields() {
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
          <ErrorMessage name="email" component="div" />,
          "Emails are sent for account updates, membership agreements, receipts and promotional offers."),
        fLayout(
          "Verify Email",
          <StyledField type="text" name="verifyEmail" />,
          <ErrorMessage name="verifyEmail" component="div" />)
      )}

      {twoColumns(
        fLayout(
          "Mailing Address",
          <StyledField type="text" name="mailingAddress" />,
          <ErrorMessage name="fName" component="div" />,
          "(including apt or unit #)"),
        fLayout(
          "City",
          <StyledField type="text" name="city" />,
          <ErrorMessage name="fName" component="div" />)
      )}

      {twoColumns(
        fLayout(
          "Postal Code",
          <StyledField type="text" name="postalCode" />,
          <ErrorMessage name="fName" component="div" />),
        fLayout(
          "Date of Birth",
          <StyledField type="text" name="dob" />,
          <ErrorMessage name="fName" component="div" />,
          "(mm/dd/yyyy)")
      )}

    {twoColumns(
        fLayout(
          "Gender",
          <StyledField type="text" name="gender" />,
          <ErrorMessage name="fName" component="div" />),
        fLayout(
          "Mobile Phone",
          <StyledField type="text" name="primaryPhone" />,
          <ErrorMessage name="fName" component="div" />,
          "Text messages are sent for door access barcode, account updates, and offers.")
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
                    Please Tell Us About Yourself
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
                    render={({ errors, status, touched, isSubmitting }) => (
                        <Form>
                        {AboutYouFields()}
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
