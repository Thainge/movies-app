import React, { useContext, useState, useEffect } from 'react';
import ls from 'local-storage';

const Context = React.createContext();

export function ContextFunction() {
    return useContext(Context)
}

export function InputProvider({ children }) {
    const storedFolders = ls.get('movies');
    let allFoldersDefault = [];
    if (storedFolders) {
        allFoldersDefault = storedFolders;
    }
    const [allFolders, setAllFolders] = useState(allFoldersDefault);

    let obj = {
        allFolders: allFolders,
        setAllFolders: setAllFolders,
    }

    return (
        <Context.Provider value={obj}>
            {children}
        </Context.Provider>
    )
}