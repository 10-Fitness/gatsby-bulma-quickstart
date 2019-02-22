// https://levelup.gitconnected.com/implementing-redux-style-state-management-with-reacts-usecontext-usereducer-hooks-c1c5596d9619

import React from 'react';
import { createContext, useReducer } from "react";
import produce from 'immer';

let SessionContext = createContext();

const initialState = {
    location: 'downtown',
    user: null,
    selected_plan: null,
}

const reducer = (state, action) => {
    produce(state, draft => {
        switch (action.type) {
            case 'SELECT_PLAN':
                draft.selected_plan = action.plan;
                return;
            default:
                return;
        }
    });
};

function SessionProvider(props) {
    let [session, dispatch] = useReducer(reducer, initialState);
    let value = { session, dispatch };
    return (
      <SessionContext.Provider value={value}>
        {props.children}
      </SessionContext.Provider>
    );
  }

let SessionConsumer = SessionContext.Consumer;
export { SessionContext, SessionProvider, SessionConsumer };
