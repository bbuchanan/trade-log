import React from 'react'
import { Tabs, Tab } from 'react-bootstrap';
import GroupManagement from '../GroupManagement/GroupManagement';
import TradeTable from '../TradeTable/TradeTable';
import StatsComponent from "../StatsComponent/StatsComponent";

const MainNav: React.FC = () => {
  return (
    <>
      <Tabs defaultActiveKey="trades" id="main-tabs">
        <Tab eventKey="trades" title="Trades">
          <TradeTable />
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