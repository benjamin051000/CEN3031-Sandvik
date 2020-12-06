import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import HistoryTable from "../../components/HistoryTable"
import Search from "../../components/Search"
import {getData} from './HistoryData'
import './History.css'

function History() {
    const [data, setData] = useState(getData());
    const [filteredEntries, setFilteredEntries] = useState([]);
    const [searchText, setSearchText] = useState([]);

    return (
        <div>
          <div class="ui centered container">
            <h1 style={{color:"#009aff", fontSize:"26pt", marginBottom:"35px"}} class="ui header">History</h1>
            <Search 
              data={data} 
              setFilteredEntries={setFilteredEntries} 
              setSearchText={setSearchText}
            />
            
            <div
                class="table-responsive"
                className="table-wrapper"

              >
                <table class="ui inverted stackable single line fixed striped selectable table padded">
                  <thead>
                    <tr>
                      <th>Project</th>
                      <th>Company</th>
                      <th>Client Name</th>
                      <th>Date</th>
                      <th class="two wide" colSpan="1"></th>
                    </tr>
                  </thead>
                  <HistoryTable
                    data={data}
                    filteredEntries={filteredEntries}
                    searchText={searchText}
                  />
                </table>
            </div>
            <Link to="/dashboard" style={{margin:"20px 0 40px 0"}} class="ui blue huge padded button" >Back</Link>
          </div>
        </div>
    );
}

export default History;
