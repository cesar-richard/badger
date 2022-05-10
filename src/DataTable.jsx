import React, {useContext} from "react";
import ReactDataSheet from "react-datasheet";
import "react-datasheet/lib/react-datasheet.css";
import {Table} from "semantic-ui-react";
import DataContext from "./DataContext";

export default function DataTable() {
    const {badges, updateBadges} = useContext(DataContext);
    const initialTable = [];
    if (badges.length > 0) {
        for (const v of badges) {
            initialTable.push([{value: v.firstName}, {value: v.lastName}, {value: v.jobTitle}])
        }
    } else {
        for (let i = 0; i < 25; i++) {
            initialTable.push([
                {value: ""},
                {value: ""},
                {value: ""}
            ]);
        }
    }

    const [dataGrid, setDataGrid] = React.useState(initialTable);
    return (
        <ReactDataSheet
            data={dataGrid}
            valueRenderer={cell => cell.value}
            sheetRenderer={props => (
                <Table className={props.className} striped bordered hover>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Prénom</Table.HeaderCell>
                            <Table.HeaderCell>Nom</Table.HeaderCell>
                            <Table.HeaderCell>Poste</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>{props.children}</Table.Body>
                </Table>
            )}
            onCellsChanged={(changes, additions) => {
                changes.forEach(({cell, row, col, value}) => {
                    dataGrid[row][col] = {...dataGrid[row][col], value};
                });
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
                const date = Date.now();

                updateBadges(
                    dataGrid.filter(v => {
                            return v[0].value !== '' || v[1].value !== '' || v[2].value !== ''
                        }
                    ).map((v, i) => {
                        return {firstName: v[0].value, lastName: v[1].value, jobTitle: v[2].value, created: date + i}
                    })
                )
                setDataGrid(dataGrid);
            }}
        />
    );
}
