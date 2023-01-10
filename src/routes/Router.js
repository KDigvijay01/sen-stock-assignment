import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Stock from '../component/stocks';
import Quotes from '../component/quotes';

const RouterComp=()=>{

    console.log("RouterComp called")
    return(
            <Router>
            
                <Routes>
                    <Route exact path="/" element={<Stock/>}/>
                    <Route path="/quotes/:symbol" element={<Quotes/>}/>
                </Routes>
            </Router>
    )
}

export default RouterComp;