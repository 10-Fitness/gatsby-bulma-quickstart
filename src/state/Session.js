// https://levelup.gitconnected.com/implementing-redux-style-state-management-with-reacts-usecontext-usereducer-hooks-c1c5596d9619

import React from 'react';
import { createContext, useReducer } from "react";
import produce from 'immer';

let SessionContext = createContext();

const initialState = {
    location: 'downtown',
    user: null,
    selected_plan: null,
    login: {
        mobilePhone: null,
        canSubmitPhone: false,
        isSubmittingMobilePhone: false,
    },
    memberInfo: {

    },
    photo: {
        mode: 'capture',
    }
    
}

const reducer = (state, action) => {
    const newState = produce(state, draft => {
        switch (action.type) {
            case 'SELECT_PLAN':
                draft.selected_plan = action.plan;
                return draft;
            case 'CHANGE_MOBILE_PHONE':
                draft.login.mobilePhone = action.phone;
                if (draft.login.mobilePhone != null && draft.login.mobilePhone.length == 14) {
                    draft.login.canSubmitPhone = true;
                } else {
                    draft.login.canSubmitPhone = false;
                }
                return draft;
            case 'SUBMIT_MOBILE_PHONE':
                draft.login.isSubmittingMobilePhone = true;
                draft.login.canSubmitPhone = false;
                setTimeout(()=>
                {
                    action.dispatch({type: 'HANDLE_MOBILE_PHONE_RESPONSE', result: 'success'})
                }, 2000);
                return draft;
            case 'HANDLE_MOBILE_PHONE_RESPONSE':
                if (action.result=="success") {
                    draft.login.isSubmittingMobilePhone = false;
                    draft.login.canSubmitPhone = true;   
                }
                return draft;
            case 'CAPTURE_PHOTO':
                draft.photo.mode = 'confirm_capture';
                draft.photo.imageSrc = action.imageSrc;                
                return draft
            case 'RETAKE':
                draft.photo.mode = 'capture';
                return draft
            default:
                return draft;
        }
    });
    return newState
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
