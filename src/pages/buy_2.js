import React from 'react';
import Helmet from '../components/helmet';
import Panel from '../components/panel';
import HeaderButton from '../components/header_button';
import BuyProgressBar from '../components/buy/buy_progress_bar';
import BuyHeader from '../components/buy/buy_header';
import BasicImage from '../images/Downtown-Basic_l.png';
import PremiumImage from '../images/Downtown-Premium_l.png';
import Level10Image from '../images/Downtown-Level-10_l.png';
import '../components/style.scss';

const IndexPage = () => <div>
    <Helmet />
    <Panel >
        <BuyHeader 
            title="downtown membership"
            leftAction={<HeaderButton to="/buy_1">Back</HeaderButton>}
            rightAction={<HeaderButton to="/">Exit</HeaderButton>}
        />
    </Panel>
    <Panel>
        <BuyProgressBar position={2} />
    </Panel>

    <Panel>
    </Panel>
</div>;

export default IndexPage;
