import React from 'react'
import BadgeForm from "./BadgeForm"
import BadgesTable from "./BadgesTable";
import DataContext from "./DataContext"
import {Tab} from "semantic-ui-react";
import './App.css'
import 'typeface-bebas-neue'
import Document from "./Document";
import BadgeList from "./BadgeList";

const App = () => {
    const storedBadges = localStorage.getItem('badger_badges') ? JSON.parse(localStorage.getItem('badger_badges')) : [];
    const [badges, setBadges] = React.useState(storedBadges);

    const panes = [
        {
            menuItem: 'Edit',
            render: () => <Tab.Pane attached={false}>
                <BadgeForm/>
                <BadgesTable/>
            </Tab.Pane>,
        },
        {
            menuItem: 'Preview',
            render: () => <Tab.Pane attached={false}>
                <BadgeList badges={badges}/>
            </Tab.Pane>,
        },
        {
            menuItem: 'Print',
            render: () => <Tab.Pane attached={false}>
                <Document/>
            </Tab.Pane>,
        },
    ]

    const addBadge = (badge, count) => {
        const toAdd = [];
        for (let i = 0; i < count; i++) {
            toAdd.push({...badge, created: badge.created + i})
        }
        const newList = [...badges, ...toAdd]
        setBadges(newList);
        localStorage.setItem('badger_badges', JSON.stringify(newList));
    }

    const removeBadge = (id) => {
        const newList = badges.filter(x => x.created !== id);
        setBadges(newList);
        localStorage.setItem('badger_badges', JSON.stringify(newList));
    }

    const clearBadges = () => {
        setBadges([]);
        localStorage.removeItem('badger_badges');
    }

    return (
        <DataContext.Provider
            value={React.useMemo(() => ({
                badges,
                addBadge,
                removeBadge,
                clearBadges
            }), [badges, addBadge, removeBadge, clearBadges])}>
            <Tab menu={{pointing: true}} panes={panes}/>
        </DataContext.Provider>
    );
}

export default App

