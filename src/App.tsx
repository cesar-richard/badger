import React from 'react'
import BadgeForm from "./BadgeForm"
import BadgeList from "./BadgeList";
import DataContext from "./DataContext"
import PDF from "./PDF";

const App = () => {
    const storedBadges = localStorage.getItem('badger_badges') ? JSON.parse(localStorage.getItem('badger_badges')) : [];
    const [badges, setBadges] = React.useState(storedBadges);

    const addBadge = (badge: { firstname: string; lastname: string; jobTitle: string, created: number }) => {
        const newList = [...badges, badge]
        setBadges(newList);
        localStorage.setItem('badger_badges', JSON.stringify(newList));
    }

    const removeBadge = (id: number) => {
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
            <BadgeForm/>
            <BadgeList/>
            <PDF/>
        </DataContext.Provider>
    );
}

export default App

