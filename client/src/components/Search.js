import React from "react";
import {historyFilter} from "../functions/HistoryFilter"

const Search = (props) => {
  
  const getFilterText = (event) =>{
    props.setSearchText(event.target.value)
    props.setFilteredEntries(historyFilter(event.target.value, props.data))
  }
  
  return (
    <div>
      <div style={{marginBottom:"20px"}} class="left aligned" >
        <div class="ui icon fluid input">
          <input
            onChange={getFilterText}
            class="prompt"
            type="text"
            placeholder="Type to search..."
          ></input>
          <i class="search icon"></i>
        </div>
      </div>
    </div>
  );
};

export default Search; 
