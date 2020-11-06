import React from "react";


/**
 * 
 * @param {*} props 
 * 
 */

const HistoryTable = (props) => {

    console.log(props.filteredEntries)
    const returnList = 
        props.filteredEntries.length === 0
        ? props.data.map((entry)=>{
            return (
                <tbody>
                    <tr>
                        <td></td>
                        <td data-label="Company">{entry.company}</td>
                        <td data-label="Client Name">{entry.clientName}</td>
                        <td></td>
                        <td class="right aligned">
                        <button class="ui icon button">
                        <i class="chevron circle right icon"></i>
                        </button>
                        </td>
                    </tr>
                </tbody>
            );
        })
        : props.filteredEntries.map((entry)=>{
            return(
                <tbody>
                    <tr>
                        <td></td>
                        <td data-label="Company">{entry.company}</td>
                        <td data-label="Client Name">{entry.clientName}</td>
                        <td></td>
                        <td class="right aligned">
                        <button class="ui icon button">
                        <i class="chevron circle right icon"></i>
                        </button>
                        </td>
                    </tr>
                </tbody>
            );
        });
            
    return returnList;
};

export default HistoryTable;