import React, { useContext } from 'react';
import { Link } from 'gatsby';
import styled from "styled-components"
import Helmet from '../components/helmet';
import Panel from '../components/panel';
import HeaderButton from '../components/header_button';
import BuyProgressBar from '../components/buy/buy_progress_bar';
import BuyHeader from '../components/buy/buy_header';
import { SessionContext } from '../state/Session';
import BasicImage from '../images/Downtown-Basic_l.png';
import PremiumImage from '../images/Downtown-Premium_l.png';
import Level10Image from '../images/Downtown-Level-10_l.png';
import '../components/style.scss';

const Menu = styled(Link)`
    &:active {
        margin-top: 3px;
        margin-bottom: -3px;
        margin-left: 3px;
        margin-right: -3px;
    }
`;

function IndexPage() {

    const { session, dispatch } = useContext(SessionContext);

    return <div>
        <Helmet />
        <Panel >
            <BuyHeader 
                title={`${session.location} membership`}
                rightAction={<HeaderButton to="/">Exit</HeaderButton>} />
        </Panel>
        <Panel>
            <BuyProgressBar position={1} />
        </Panel>

        <Panel>
            <div className="columns is-multiline">
                <div className="column is-one-third">
                    <Menu to="/buy_2?plan=basic" 
                        onClick={()=>dispatch({type: 'SELECT_PLAN', plan: 'basic'})}>
                        <img src={BasicImage} />
                    </Menu>
                </div>
                <div className="column is-one-third">
                    <Menu to="/buy_2?plan=premium"
                        onClick={()=>dispatch({type: 'SELECT_PLAN', plan: 'premium'})}>
                        <img src={PremiumImage} />
                    </Menu>
                </div>
                <div className="column is-one-third">
                    <Menu to="/buy_2?plan=Level%2010"
                        onClick={()=>dispatch({type: 'SELECT_PLAN', plan: 'level 10'})}>
                        <img src={Level10Image} />
                    </Menu>
                </div>
            </div>              
        </Panel>
    </div>
}

export default IndexPage;
