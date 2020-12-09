import React from "react";


/**
 * 
 * @param {*} props 
 * 
 */

const HistoryTable = (props) => {

    // const goToOutputPage = (id) => {
        
    // }

    const returnList = 
        props.filteredEntries.length === 0 && props.searchText.length === 0
        ? props.data.map((entry)=>{
            
            return (
                
                <tr>
                    <td data-label="Project">{entry.projName}</td>
                    <td data-label="Company">{entry.companyName}</td>
                    <td data-label="Client Name">{entry.custName}</td>
                    <td data-label="Date">{entry.date}</td>
                    <td class="right aligned">
                        <button class="ui icon button">
                            <i class="chevron circle right icon"></i>
                        </button>
                    </td>
                </tr>
                
            );
        })
        :
        (props.filteredEntries.length === 0 && props.searchText.length)
        ? 
            
            <tr>
                <td data-label="Project">{"No Results Found"}</td>
                <td data-label="Company"></td>
                <td data-label="Client Name"></td>
                <td data-label="Date"></td>
                <td class="right aligned"></td>
            </tr>
            
        :
          props.filteredEntries.map((entry)=>{
            
            return(
                
                <tr>
                    <td data-label="Project">{entry.projName}</td>
                    <td data-label="Company">{entry.companyName}</td>
                    <td data-label="Client Name">{entry.custName}</td>
                    <td data-label="Date">{entry.date}</td>
                    <td class="right aligned">
                        <button class="ui icon button">
                            <i class="chevron circle right icon"></i>
                        </button>
                    </td>
                </tr>
            );
        });
            
    return <tbody>{returnList}</tbody>;
};

export default HistoryTable;