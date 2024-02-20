export const sortAlphabetically = (array) => {
    array.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        }
        return 0;
    });
}

// remove this once the backend is refactored so there is only a property "name"
export const sortAlphabeticallyTitle = (array) => {
    array.sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return -1;
        }
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return 1;
        }
        return 0;
    });
}

export const sortByDate = (array) => {
    array.sort((a, b) => {
        if (a.createdAt < b.createdAt) {
          return -1;
        }
        if (a.createdAt > b.title.createdAt) {
          return 1;
        }
        return 0;
    });
}