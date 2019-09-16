import React, { useContext } from 'react'
import { Tabs, Tab } from 'react-bootstrap';
import GroupManagement from '../GroupManagement/GroupManagement';
import TradeTable from '../TradeTable/TradeTable';
import StatsComponent from "../StatsComponent/StatsComponent";
import { Store } from '../../store';

const MainNav: React.FC = () => {
  const { dispatch, state } = useContext(Store);

  return (
    <>
      <Tabs defaultActiveKey="trades" id="main-tabs">
        <Tab eventKey="trades" title="Trades">
          <TradeTable Trades={state.trades} />
        </Tab>
        <Tab eventKey="stats" title="Statistics">
          <StatsComponent />
        </Tab>
        <Tab eventKey="groups" title="Trade Groups">
          <GroupManagement />
        </Tab>
      </Tabs>
    </>)
}

export default MainNav;