import React, {useEffect, useState} from 'react';
import { Table } from "rsuite";

const QuotesTable = ({symbol}) => {

    const [quotesList, setQuotesList]= useState([]);
    const { Column, HeaderCell, Cell } = Table;

    useEffect(()=>{
        const getQuotes=async()=>{
            await getQuotesDataList();
        }
        getQuotes();
    }, );

    console.log("company symbol", symbol)

    const  getQuotesDataList=()=>{
        return new Promise(async (resolve, reject) => {
            try{
                let resp=await fetch(`https://prototype.sbulltech.com/api/v2/quotes/${symbol}`);
                let response= await resp.json();
                console.log("calling the real time data  ");
    
                if(!response.success) return;
                
                const companySymbol= Object.keys(response.payload)[0];
                const data=response.payload[companySymbol];
                setQuotesList(data);
                checkerForValidTillExpirationTime(data);
                resolve(true)
            }
            catch(err){
                console.error("Error in fetting quotes", err)
            }
       
        })
    };

    const checkerForValidTillExpirationTime=(quotesList)=>{
      const lastTimeValue = quotesList.reduce(function(prev, current) {
        return (new Date(prev.valid_till) > new Date(current.valid_till)) ? prev : current
      });

      const timeouts = [];
      const delay = new Date(lastTimeValue.valid_till).getTime() - Date.now();
      if(delay>=0){
        timeouts.push(setTimeout(getQuotesDataList, delay));
      return () => timeouts.forEach((timeout) => window.clearTimeout(timeout));
      }
    }

  return (

    <Table height={280} data={quotesList} id="table">

    <Column width={200}>
    <HeaderCell>S.no.</HeaderCell>
    <Cell>{(rowData, index) => `${index+1}`}</Cell>
  </Column>
    
    <Column width={400}>
      <HeaderCell>Price</HeaderCell>
      <Cell>{(rowData) => `${rowData.price}`}</Cell>
    </Column>

    <Column width={400}>
      <HeaderCell>Time</HeaderCell>
      <Cell>{(rowData) => `${rowData.time}`}</Cell>
    </Column>

    <Column width={400}>
      <HeaderCell>Valid Till</HeaderCell>
      <Cell>{(rowData) => `${rowData.valid_till}`}</Cell>
    </Column>
  </Table>
  )
}

export default QuotesTable