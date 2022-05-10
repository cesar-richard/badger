import React from 'react';

export interface ContextState {
    badges: [{ firstname: string, lastname: string, jobTitle: string }] | [],
    addBadge: (data: { created: number, firstname: string; lastname: string; jobTitle: string }, count: number) => void;
    updateBadges: (data: [{ created: number, firstname: string; lastname: string; jobTitle: string }]) => void;
    removeBadge: (id: number) => void;
    clearBadges: () => void;
}

const DataContext = React.createContext<ContextState>({
    badges: [],
    addBadge: (data) => {
        // eslint-disable-next-line no-console
        console.error('addBadge not implemented', data);
    },
    clearBadges: () => {
        // eslint-disable-next-line no-console
        console.error('clearBadges not implemented');
    },
    removeBadge(id: number): void {
        // eslint-disable-next-line no-console
        console.error('removeBadge not implemented', id);
    },
    updateBadges: (data) => {
        // eslint-disable-next-line no-console
        console.error('updateBadges not implemented', data);
    },
});

export default DataContext;