const historyFilter = (filterText, data) => {
    //Search for company
    let results = [];
    results = data.filter((entry) => {
      return (
        filterText.length > 0 &&
        entry.company
          .toLowerCase()
          .indexOf(filterText.toLowerCase().trim()) !== -1
      );
    });
    
    //If no matching companies found, search for client name
    if (results.length === 0) {
        results = data.filter((entry) => {
            return (
              filterText.length > 0 &&
              entry.clientName
                .toLowerCase()
                .indexOf(filterText.toLowerCase().trim()) !== -1
            );
          });
  };
  return results;
};

export {historyFilter}