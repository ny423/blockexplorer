import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';
import { Route, Switch, Router } from "react-router-dom";
import BlockTransactions from './pages/Block';
import Home from './pages/Home';
import history from './router/history';
import Transaction from './pages/Transaction';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();

  async function getBlockNumber() {
    setBlockNumber(await alchemy.core.getBlockNumber());
  }

  useEffect(() => {
    getBlockNumber();
  });

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/blocknumber/:blockNumber">
          <BlockTransactions alchemy={alchemy} latestBlock={blockNumber} />
        </Route>
        <Route path="/blocknumber/">
          <BlockTransactions alchemy={alchemy} latestBlock={blockNumber} />
        </Route>
        <Route path="/tx/:hash">
          <Transaction alchemy={alchemy} />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
