import _ from 'lodash'
import React, {useContext} from 'react'
import {Button, Table} from 'semantic-ui-react'
import DataContext from "./DataContext";


function tableReducer(state, action) {
    switch (action.type) {
        case 'CHANGE_SORT':
            if (state.column === action.column) {
                return {
                    ...state,
                    data: state.data.slice().reverse(),
                    direction:
                        state.direction === 'ascending' ? 'descending' : 'ascending',
                }
            }

            return {
                column: action.column,
                data: _.sortBy(state.data, [action.column]),
                direction: 'ascending',
            }
        case 'REFRESH':
            return {
                ...state,
                data: action.data,
            }
        default:
            throw new Error()
    }
}

function BadgeList() {
    const context = useContext(DataContext);
    const [state, dispatch] = React.useReducer(tableReducer, {
        column: null,
        data: context.badges,
        direction: null,
    })
    const {column, data, direction} = state
    React.useEffect(() => {
        dispatch({type: 'REFRESH', data: context.badges})
        console.log('refresh')
    }, [context.badges]);

    return (
        <Table sortable celled fixed>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell
                        sorted={column === 'firstName' ? direction : null}
                        onClick={() => dispatch({type: 'CHANGE_SORT', column: 'firstName'})}
                    >
                        Prénom
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={column === 'lastName' ? direction : null}
                        onClick={() => dispatch({type: 'CHANGE_SORT', column: 'lastName'})}
                    >
                        Nom
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={column === 'jobTitle' ? direction : null}
                        onClick={() => dispatch({type: 'CHANGE_SORT', column: 'jobTitle'})}
                    >
                        Poste
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        Supprimer
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {data.map(({firstName, lastName, jobTitle, created}) => (
                    <Table.Row key={firstName}>
                        <Table.Cell>{firstName}</Table.Cell>
                        <Table.Cell>{lastName}</Table.Cell>
                        <Table.Cell>{jobTitle}</Table.Cell>
                        <Table.Cell>
                            <Button color={"red"} onClick={() => {
                                context.removeBadge(created)
                            }}>
                                X
                            </Button>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    )
}

export default BadgeList