import React from 'react'
import BadgeForm from "./BadgeForm"
import BadgeList from "./BadgeList";
import DataContext from "./DataContext"
import Badge from "./Badge";
import {Grid, GridColumn} from "semantic-ui-react";
import './App.css'

const App = () => {
    const storedBadges = localStorage.getItem('badger_badges') ? JSON.parse(localStorage.getItem('badger_badges')) : [];
    const [badges, setBadges] = React.useState(storedBadges);

    const addBadge = (badge) => {
        const newList = [...badges, badge]
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
            <Grid columns={2} centered>
                <Grid.Column className={"badgeColumn"}>
                    <Badge jobTitle={"Pics'Art"} lastName={"Richard"} firstName={"César"} background={"/background.png"}/>
                    <Badge jobTitle={"Pics'Art"} lastName={"Richard"} firstName={"César"} background={"/background.png"}/>
                    <Badge jobTitle={"Pics'Art"} lastName={"Richard"} firstName={"César"} background={"/background.png"}/>
                    <Badge jobTitle={"Pics'Art"} lastName={"Richard"} firstName={"César"} background={"/background.png"}/>
                    <Badge jobTitle={"Pics'Art"} lastName={"Richard"} firstName={"César"} background={"/background.png"}/>
                </Grid.Column>
                <Grid.Column className={"badgeColumn"}>
                    <Badge jobTitle={"Pics'Art"} lastName={"Mention"} firstName={"Alice"} background={"/background.png"}/>
                    <Badge jobTitle={"Pics'Art"} lastName={"Mention"} firstName={"Alice"} background={"/background.png"}/>
                    <Badge jobTitle={"Pics'Art"} lastName={"Mention"} firstName={"Alice"} background={"/background.png"}/>
                    <Badge jobTitle={"Pics'Art"} lastName={"Mention"} firstName={"Alice"} background={"/background.png"}/>
                    <Badge jobTitle={"Pics'Art"} lastName={"Mention"} firstName={"Alice"} background={"/background.png"}/>
                </Grid.Column>
            </Grid>
            {/*<BadgeForm/>*/}
            {/*<BadgeList/>*/}
        </DataContext.Provider>
    );
}

export default App

