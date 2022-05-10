import React, {useContext} from "react";
import ReactDataSheet from "react-datasheet";
import "react-datasheet/lib/react-datasheet.css";
import {Table} from "semantic-ui-react";
import DataContext from "../DataContext";
import {addNewRow, dataGridToDataset, handleAdditions, handleChanges, initializeTable} from "./utils";

export default function DataTable() {
    const {badges, updateBadges} = useContext(DataContext);
    const [dataGrid, setDataGrid] = React.useState(initializeTable(badges));

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
                let tmpDatagrid = [...dataGrid]
                tmpDatagrid = handleChanges(changes, tmpDatagrid)
                tmpDatagrid = handleAdditions(additions, tmpDatagrid)
                tmpDatagrid = addNewRow(tmpDatagrid)
                updateBadges(dataGridToDataset(tmpDatagrid))
                setDataGrid(tmpDatagrid);
            }}
        />
    );
}
