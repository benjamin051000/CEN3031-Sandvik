import { historyFilter } from "./HistoryFilter";

const addHistory = (historyObject, data) =>{
    data.push(historyObject);
}


const editHistory = (historyObject, data) =>{
    let index = data.indexOf(historyObject)
    data[index] = historyObject;
}


const deleteHistory = (id, data) =>{
    return data.filter((historyObject) => {
        return historyObject.id !== id;
      });
}

const getHistory = (id, data) => {
    return data.filter(historyObject =>  {
        return historyObject.id == id
      });
}

export {
    addHistory,
    deleteHistory,
    editHistory,
    getHistory,
};