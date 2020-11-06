import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import HistoryTable from "../../components/HistoryTable"
import Search from "../../components/Search"
import {getData} from './HistoryData'
import './History.css'

function History() {
    const [data, setData] = useState(getData());
    const [filteredEntries, setFilteredEntries] = useState([]);


    return (
        <div>
            <h1 className="history-header">History</h1>
            <Search data={data} setFilteredEntries={setFilteredEntries}/>
            <div
                style={{ width: "55%", marginLeft:"450px"}}
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
                  />
                </table>
            </div>
            <Link to="/dashboard" className="button-history" >Back</Link>
        </div>
    );
}

export default History;
