import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "rsuite";
import SearchBox from './search-box';



const StocksTable = () => {
  const [stockList, setStockList]= useState([]);
  const [list, setList] = useState([]);
  const { Column, HeaderCell, Cell } = Table;
  const [searchVal, setSearchVal]=useState("")


  const getInstumentList = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const resp = await axios.get("https://prototype.sbulltech.com/api/v2/instruments");
        const data = resp.data;
        const my2DArray = data.split("\n").map((row) => row.split(","));
        const newArray = my2DArray.map((ele, index) => {
          if (ele && index > 0) {
            const tempObj = {};
            ele.forEach((it, i) => {
              if (it) {
                tempObj[my2DArray[0][i]] = it;
              }
            });

            return tempObj;
          } else {
            return null;
          }
        });
        newArray.splice(newArray.length-1, 1);
        newArray.splice(0, 1);
        setStockList(newArray);
        setList(newArray);
        resolve(true);
      } catch (err) {
        console.error("Error in getting the intrument list", err);
      }
    });
  };

  useEffect(() => {
    async function fetchData() {
      // You can await here
      await getInstumentList();
    }

    fetchData();
  }, []);

  const ImageCell = ({ rowData, dataKey, ...props }) => (
    <Cell {...props} style={{ padding: 0 }}>
      <div
       className="symbolContainerDiv"
      >
        <a href={`/quotes/${rowData.Symbol}`}>
            <span>{rowData.Symbol ? rowData.Symbol : "N/A"}</span>
        </a>
       
      </div>
    </Cell>
  );

  const handleChange=(e)=>{
    const word=e.target.value
    setSearchVal(word);
    const newList=stockList.filter(ele=>
      ele.Name.toLowerCase().substring(0, word.length)===word.toLowerCase()
      ||
      ele.Symbol.toLowerCase().substring(0, word.length)===word.toLowerCase()
      );
    setList(newList)
  };

  const handleClear=()=>{
    setSearchVal("")
  };

  return (
    <div>
    <SearchBox handleChange={handleChange} value={searchVal} handleClear={handleClear}/>
    <Table height={600} data={list} id="table">
      <Column width={200} align="center">
        <HeaderCell>Symbol</HeaderCell>
        <ImageCell dataKey="avartar" />
      </Column>
      <Column width={400}>
        <HeaderCell>Name</HeaderCell>
        <Cell>{(rowData) => `${rowData.Name ? rowData.Name : "N/A"}`}</Cell>
      </Column>

      <Column width={400} >
        <HeaderCell>Sector</HeaderCell>
        <Cell>{(rowData) => `${rowData.Sector ? rowData.Sector: "N/A" }`}</Cell>
      </Column>

      <Column width={400} align="center">
        <HeaderCell>Valid Till</HeaderCell>
        <Cell>{(rowData) => `${rowData.Validtill ?  rowData.Validtill : "N/A"}`}</Cell>
      </Column>
    </Table>
    </div>
  );
};

export default StocksTable;
