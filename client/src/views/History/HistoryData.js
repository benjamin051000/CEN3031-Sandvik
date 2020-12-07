import historyData from './HistoryData.json'

const getData = () => {
    let allHistoryData = [];
    let id = 1;
      historyData.forEach(element => {
          element["id"] = id
          allHistoryData.push(element)
          id++
          
      });
    return allHistoryData
  };
  
  export { getData };
  