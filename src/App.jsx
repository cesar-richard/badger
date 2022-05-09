import React from 'react'
import BadgeForm from "./BadgeForm"
import BadgeList from "./BadgeList";
import DataContext from "./DataContext"
import Badge from "./Badge";
import {Grid} from "semantic-ui-react";
import './App.css'
import 'typeface-bebas-neue'

const App = () => {
    const storedBadges = localStorage.getItem('badger_badges') ? JSON.parse(localStorage.getItem('badger_badges')) : [];
    const [badges, setBadges] = React.useState(storedBadges);

    const addBadge = (badge, count) => {
        const toAdd = [];
        for (let i = 0; i < count; i++) {
            toAdd.push({...badge, created: badge.created+i})
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

    const rightColumn = badges.filter((v, i) => {
        return i % 2 === 1
    }).map(v => <Badge jobTitle={v.jobTitle} lastName={v.lastName} firstName={v.firstName} background={"/bg.png"}/>)
    const leftColumn = badges.filter((v, i) => {
        return i % 2 === 0
    }).map(v => <Badge jobTitle={v.jobTitle} lastName={v.lastName} firstName={v.firstName} background={"/bg.png"}/>)

    return (
        <DataContext.Provider
            value={React.useMemo(() => ({
                badges,
                addBadge,
                removeBadge,
                clearBadges
            }), [badges, addBadge, removeBadge, clearBadges])}>
            <Grid columns={2} centered>
                <Grid.Column className={"badgeColumn"}>
                    {leftColumn}
                </Grid.Column>
                <Grid.Column className={"badgeColumn"}>
                    {rightColumn}
                </Grid.Column>
            </Grid>
            <BadgeForm/>
            <BadgeList/>
        </DataContext.Provider>
    );
}

export default App

