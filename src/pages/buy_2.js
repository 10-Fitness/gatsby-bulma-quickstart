import React, { useContext } from 'react';
import Helmet from '../components/helmet';
import Panel from '../components/panel';
import HeaderButton from '../components/header_button';
import BuyProgressBar from '../components/buy/buy_progress_bar';
import BuyHeader from '../components/buy/buy_header';
import { SessionContext } from '../state/Session';
import '../components/style.scss';

function IndexPage() {

    const { session, dispatch } = useContext(SessionContext);

    return <div>
        <Helmet />
        <Panel >
            <BuyHeader 
                title={`${session.location} ${session.selected_plan} membership`}
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
}

export default IndexPage;
