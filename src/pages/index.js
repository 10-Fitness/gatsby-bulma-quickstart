import React from 'react';
import styled from "styled-components"
import Logo from '../images/10 Fitness Logo.png';
import { Link } from "gatsby";
import IndexHeaderButton from '../components/index/indexHeaderButton';
import Helmet from '../components/helmet';

import '../components/style.scss';

const KioskButton = styled(Link)`
  display: block;
  text-align: center;
  background-color: blue;
  height: 300px;
  h1 {
	padding-top: 5.5rem;
	color: white;
	font-size: 2.5rem;
	font-weight: bold;
  }
  p {
	  color: white;
  }
  &:active {
    margin-top: 3px;
    margin-bottom: -3px;
    margin-left: 3px;
    margin-right: -3px;
  }
`

const BuyButton = styled(KioskButton)`
	background-color: #9b3426;
`

const ActivateButton = styled(KioskButton)`
	background-color: #26639b;
`

const TalkButton = styled(KioskButton)`
	background-color: #459b26;
`
const BannerButton = styled(KioskButton)`
    background-color: #515151;
    height: 150px;
    h1 {
        padding-top: 2.5rem;
    }
`
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
                    <IndexHeaderButton to="/login">
                        <em>HAVE AN ACCOUNT?</em>
                        SIGN IN
                    </IndexHeaderButton>
                </div>
            </div>
        </div>
    </section>;

const MidSection = () => 
    <section className="section has-background-light is-large">
        <div className="container">
            <div className="columns is-multiline">
                <div className="column is-one-third">
                    <BuyButton to="buy_1">
                        <h1>buy</h1>
                        <p>NEW MEMBERSHIP</p>
                    </BuyButton>
                </div>
                <div className="column is-one-third">
                    <ActivateButton to="/">
                        <h1>activate</h1>
                        <p>ONLINE-PURCHASED MEMBERSHIP</p>
                    </ActivateButton>
                </div>
                <div className="column is-one-third">
                    <TalkButton to="/">
                        <h1>talk</h1>
                        <p>TO A HUMAN</p>
                    </TalkButton>
                </div>
                <div className="column">
                    <BannerButton to="/">
                        <h1>discover</h1>
                        <p>WHY 10 FITNESS</p>
                    </BannerButton>
                </div>
            </div>
        </div>
    </section>;

const IndexPage = () => <div>
    <Helmet />
    <HeaderSection />
    <MidSection />
</div>;

export default IndexPage;
