
const getData = () => {
  let allHistoryData = [];
  

  let historyData = JSON.parse(localStorage.getItem("historyStorage"));

  historyData.forEach((element) => {

    allHistoryData.push(element)
    
  });

  return allHistoryData
};

export { getData };
