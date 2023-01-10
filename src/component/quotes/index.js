import React from 'react'
import QuotesTable from './quotes-table';
import { useParams } from 'react-router-dom';
import './quotes.styles.css';

const Quotes = () => {
  const { symbol } = useParams();
  return (
    <div>
    
    <div className="quotesTable__container">

          <div className="quotesTable__header">
              <span className="quotesTable__header_span">Current Status of 
                <span className='magicColorsForText'>{" "}{symbol}{" "}</span>
              </span>
              <a href="/">
                Go Home
              </a>
          </div>


          <div className="quotesTable__Content">
              <QuotesTable symbol={symbol}/>
          </div>
        
        </div>
    
    </div>
  )
}

export default Quotes