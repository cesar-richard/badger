import React, {useState} from 'react'
import DataContext from "./DataContext"
import {Tab} from "semantic-ui-react";
import './App.css'
import 'typeface-bebas-neue'
import Document from "./Document";
import BadgeList from "./BadgeList";
import DataTable from "./DataTable/DataTable";
import FileSelector from "./FileSelector";

const App = () => {
    const storedBadges = localStorage.getItem('badger_badges') ? JSON.parse(localStorage.getItem('badger_badges')) : [];
    const storedBackgrounds = localStorage.getItem('badger_backgrounds') ? JSON.parse(localStorage.getItem('badger_backgrounds')) : {
        recto: null,
        verso: null
    };
    const [badges, setBadges] = React.useState(storedBadges);
    const [rectoImg, setRectoImg] = useState(storedBackgrounds.recto)
    const [versoImg, setVersoImg] = useState(storedBackgrounds.verso)

    const panes = [
        {
            menuItem: 'Edit',
            render: () => <Tab.Pane attached={false}>
                <FileSelector/>
                <DataTable/>
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

    const updateBadges = (newList) => {
        setBadges(newList);
        localStorage.setItem('badger_badges', JSON.stringify(newList));
    }

    const updateBackgrounds = (recto, verso) => {
        setRectoImg(recto)
        setVersoImg(verso)
        localStorage.setItem('badger_backgrounds', JSON.stringify({recto, verso}));
    }

    return (
        <DataContext.Provider
            value={React.useMemo(() => ({
                badges,
                rectoImg,
                versoImg,
                addBadge,
                removeBadge,
                clearBadges,
                updateBadges,
                updateBackgrounds
            }), [badges, rectoImg, versoImg, addBadge, removeBadge, clearBadges, updateBadges, updateBackgrounds])}>
            <Tab menu={{pointing: true}} panes={panes}/>
        </DataContext.Provider>
    );
}

export default App

