import React, { useContext, useEffect } from 'react';
import styled from "styled-components"
import Logo from '../images/10 Fitness Logo.png';
import { Link } from "gatsby";
import PhoneInput from "react-phone-input-auto-format";
import IndexHeaderButton from '../components/index/indexHeaderButton';
import Helmet from '../components/helmet';
import { SessionContext } from '../state/Session';


import '../components/style.scss';

const HeaderSection = () =>     
    <section className="section">
        <div className="container">
            <div className="columns">
                <div className="column is-one-third">
                    <img src={Logo} style={{height: '80px'}} alt="gatsby-logo" />
                </div>
                <div className="column is-one-third">
                </div>
                <div className="column is-one-third">
                    <IndexHeaderButton to="/">
                        exit
                    </IndexHeaderButton>
                </div>
            </div>
        </div>
    </section>;

function LoginSection() {
    const { session, dispatch } = useContext(SessionContext);
    
    // useEffect(() => {
    //     if (session.login.isSubmittingMobilePhone == true) {
    //         setTimeout(()=>{
    //             dispatch({type: "HANDLE_MOBILE_PHONE_RESPONSE", result: "success"})
    //         }, 2000);
    //     }
    //   },
    //   [session.login.isSubmittingMobilePhone]
    // );

    return <section className="section has-background-light">
        <div className="hero-body">
            <div className="container has-text-centered">
                <div className="column is-4 is-offset-4">
                    <h3 className="title">SIGN IN</h3>
                    <div className="box">
                        <form>
                            <div className="field">
                                <div className="control">
                                    <label>Enter Mobile Phone</label>
                                    <PhoneInput className="input is-large" onChange={(v)=>dispatch(
                                        {
                                            type: "CHANGE_MOBILE_PHONE", 
                                            phone: v
                                        }
                                    )} />
                                </div>
                            </div>
                            <button disabled={!session.login.canSubmitPhone} 
                                className="button is-block is-info is-large is-fullwidth"
                                onClick={
                                    (e)=> {
                                        e.preventDefault();
                                        dispatch(
                                        {
                                            type: "SUBMIT_MOBILE_PHONE",
                                            dispatch: dispatch
                                        }, dispatch);
                                    return false;
                                    }}
                                >
                                Next
                            </button>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </section>;
    }

function LoginPage() {
    return <div>
        <Helmet />
        <HeaderSection />
        <LoginSection />
    </div>
    }
export default LoginPage;
