import './App.css';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { TimeProvider } from './helpers/TimeContext';

// import Home from './layout/Home';
import MinhWorkSpace from './layout/MinhWorkSpace/index.js';
import Home from './layout/Home';
import Hieuworkspace from './layout/HieuWorkSpace';
import PhuTho from "./layout/MinhWorkSpace/phutho.js";
import NinhBinh from "./layout/MinhWorkSpace/ninhbinh.js";
import ThanhHoa from "./layout/MinhWorkSpace/thanhhoa.js";
import Hue from "./layout/MinhWorkSpace/hue.js";

import WebHome from './web/Layouts/Home';
import WebLayoutDefault from './web/Layouts/LayoutDefault';
import WebListSpace from './web/Layouts/ListSpace';
import WebAboutUs from './web/Layouts/AboutUs';
import WebContact from './web/Layouts/Contact';
import WebSpace from './web/Layouts/Space';
import WebUser from './web/Layouts/User';
import WebScrolltoTop from './web/Components/ScrollToTop';

function App() {
  return (
    <>
      <WebScrolltoTop />
      <TimeProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/hanoi' element={<MinhWorkSpace/>}/>
            <Route path='/' element={<PhuTho/>}/>
            <Route path='/ninhbinh' element={<NinhBinh/>}/>
            <Route path='/thanhhoa' element={<ThanhHoa/>}/>
            <Route path='/hue' element={<Hue/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/hieu' element={<Hieuworkspace/>}/>
          </Routes>
        </Suspense>
      </TimeProvider>
      
    </>
  );
}

export default App;
