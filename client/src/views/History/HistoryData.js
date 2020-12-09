
const getData = () => {
  let allHistoryData = [];
  let id = 1;
  
  let historyData = JSON.parse(localStorage.getItem("historyStorage"));

  historyData.forEach((element) => {
    if(element["userId"] == localStorage.getItem("userId")){
      element["id"] = id
      allHistoryData.push(element)
      id++;
    }
  });

  return allHistoryData
};

export { getData };
