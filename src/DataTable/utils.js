export const initializeTable = (badges) => {
    const initialTable = [];
    if (badges.length > 0) {
        for (const v of badges) {
            initialTable.push([{value: v.firstName}, {value: v.lastName}, {value: v.jobTitle}])
        }
    }
    initialTable.push([
        {value: ""},
        {value: ""},
        {value: ""}
    ]);
    return initialTable
}

export const handleAdditions = (additions, dataGrid = []) => {
    if (additions) {
        additions.forEach(({row, col, value}) => {
            if (3 > col) {
                dataGrid[row] = dataGrid[row]
                    ? dataGrid[row]
                    : [{value: ""}, {value: ""}, {value: ""}];
                dataGrid[row][col] = {...dataGrid[row][col], row, col, value};
            }
        });
    }
    return dataGrid
}

export const handleChanges = (changes, dataGrid = []) => {
    changes.forEach(({row, col, value}) => {
        dataGrid[row][col] = {...dataGrid[row][col], value};
    });
    return dataGrid
}

export const dataGridToDataset = (dataGrid = []) => {
    const date = Date.now();
    return dataGrid.filter(v => {
            return v[0].value !== '' || v[1].value !== '' || v[2].value !== ''
        }
    ).map((v, i) => {
        return {firstName: v[0].value, lastName: v[1].value, jobTitle: v[2].value, created: date + i}
    })
}

export const addNewRow = (dataGrid = []) => {
    const lastRow = dataGrid[dataGrid.length - 1]
    if (lastRow[0].value !== '' || lastRow[1].value !== '' || lastRow[2].value !== '') {
        dataGrid.push([{value: ""}, {value: ""}, {value: ""}])
    }
    return dataGrid
}
