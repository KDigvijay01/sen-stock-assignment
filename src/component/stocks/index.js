import React from 'react';
import StocksTable from './stocks-table';
import './stocks.styles.css'

const Stocks = () => {
        
  return (
        <div className="stocksTable__container">

          <div className="stocksTable__header">
          
            <span className='stocksTable__header_span'>
            Current
              <span className='magicColorsForText'>{" "}Stocks{" "}</span>
             Info
             </span>
          
          </div>

          <div className="stocksTable__Content">
              <StocksTable/>
          </div>
        
        </div>
  );
}

export default Stocks







