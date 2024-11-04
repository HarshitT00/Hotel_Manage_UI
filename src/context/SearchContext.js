import { createContext, useReducer, useEffect } from "react";

// Load initial state from local storage
const loadState = () => {
    try {
        const serializedState = localStorage.getItem("searchState");
        return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (err) {
        console.error("Could not load state from local storage", err);
        return undefined;
    }
};

const INITIAL_STATE = loadState() || {
    city: undefined,
    dates: [],
    options: {
        adult: undefined,
        children: undefined,
        room: undefined,
    },
};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
    switch (action.type) {
        case "NEW_SEARCH":
            return action.payload;
        case "RESET_SEARCH":
            return INITIAL_STATE;
        default:
            return state;
    }
};

export const SearchContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

    useEffect(() => {
        try {
            const serializedState = JSON.stringify(state);
            localStorage.setItem("searchState", serializedState);
        } catch (err) {
            console.error("Could not save state to local storage", err);
        }
    }, [state]);

    return (
        <SearchContext.Provider
            value={{
                city: state.city,
                dates: state.dates,
                options: state.options,
                dispatch,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};
