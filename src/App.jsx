import * as React from 'react';
import { BrowserRouter as Router, Route, Routes  } from "react-router-dom";
import history from './components/history';
import Charts from './pages/Charts';
import Home from './pages/Home';
import Overview from './pages/Overview';
import NFTS from './pages/NFTS';
import CryptoPunks from './pages/nfts/CryptoPunks';
import About from './pages/About';

export default function App() {
  return (
    <div style={{height:'100%'}}>
    <Router history={history}>
    <Routes>
    <Route exact path='/' element={<Home/>} />
    <Route exact path='/charts' element={<Charts/>} />
    <Route exact path='/overview' element={<Overview/>} />
    <Route path="nft" >
    <Route path=":id/:name" element={<CryptoPunks />} />
    </Route>
    <Route exact path='/nfts' element={<NFTS />} />
    <Route exact path='/about' element={<About />} />
    </Routes>
    </Router>
    </div>
  );
}
