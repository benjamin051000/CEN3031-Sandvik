const historyFilter = (filterText, data) => {
    //Search for project
    let results = [];
    results = data.filter((entry) => {
      return (
        filterText.length > 0 &&
        entry.projectName
          .toLowerCase()
          .indexOf(filterText.toLowerCase().trim()) !== -1
      );
    });
    
    //If no matching projects found, search for company
    if (results.length === 0) {
        results = data.filter((entry) => {
            return (
              filterText.length > 0 &&
              entry.company
                .toLowerCase()
                .indexOf(filterText.toLowerCase().trim()) !== -1
            );
          });
  };

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

  //If no matching clients found, search for date
  if (results.length === 0) {
    results = data.filter((entry) => {
        return (
          filterText.length > 0 &&
          entry.date
            .toLowerCase()
            .indexOf(filterText.toLowerCase().trim()) !== -1
        );
      });
  };

  return results;
};

export {historyFilter}