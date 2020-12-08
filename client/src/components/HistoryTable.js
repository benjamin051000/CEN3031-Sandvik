import React from "react";


/**
 * 
 * @param {*} props 
 * 
 */

const HistoryTable = (props) => {

    console.log(props.searchText.length)
    console.log(props.filteredEntries.length)
    const returnList = 
        props.filteredEntries.length === 0 && props.searchText.length === 0
        ? props.data.map((entry)=>{
            
            return (
                <tbody>
                    <tr>
                        <td data-label="Project">{entry.projectName}</td>
                        <td data-label="Company">{entry.company}</td>
                        <td data-label="Client Name">{entry.clientName}</td>
                        <td data-label="Date">{entry.date}</td>
                        <td class="right aligned">
                        <button class="ui icon button">
                        <i class="chevron circle right icon"></i>
                        </button>
                        </td>
                    </tr>
                </tbody>
            );
        })
        :
        (props.filteredEntries.length === 0 && props.searchText.length)
        ? 
            <tbody>
                <tr>
                    <td data-label="Project">{"No Results Found"}</td>
                    <td data-label="Company"></td>
                    <td data-label="Client Name"></td>
                    <td data-label="Date"></td>
                    <td class="right aligned"></td>
                </tr>
            </tbody>
        :
          props.filteredEntries.map((entry)=>{
            
            return(
                <tbody>
                    <tr>
                        <td data-label="Project">{entry.projectName}</td>
                        <td data-label="Company">{entry.company}</td>
                        <td data-label="Client Name">{entry.clientName}</td>
                        <td data-label="Date">{entry.date}</td>
                        <td class="right aligned">
                        <button class="ui icon button">
                        <i class="chevron circle right icon"></i>
                        </button>
                        </td>
                    </tr>
                </tbody>
            );
        });
            
    console.log(returnList)
    return returnList;
};

export default HistoryTable;