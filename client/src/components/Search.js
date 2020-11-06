import React from "react";
import {historyFilter} from "../functions/HistoryFilter"

const Search = (props) => {

  const getFilterText = (event) =>{
 
    props.setFilteredEntries(historyFilter(event.target.value, props.data))
  }
  
  return (
    <div>
      <div  style={{ marginTop: "1rem" , marginLeft:"450px", marginBottom:"20px"}} >
        <div class="ui icon input">
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
