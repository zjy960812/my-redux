import React, { useState, createContext, useContext, useEffect } from "react";

export const Context = createContext(null);

export const store = {
  state: {
    user: {
      name: "liming",
      msg: "iam a doctor",
    },
    group: 'frontEnd'
  },
  setState(newState) {
    store.state = newState;
    store.listeners.forEach((fn) => {
      fn();
    });
  },
  listeners: [],
  subscribe(fn) {
    store.listeners.push(fn);
    return () => {
      store.listeners = store.listeners.filter((f) => f !== fn);
    };
  },
};


const reducer = (state, { type, payload }) => {
  switch (type) {
    case "updateUser":
      return {
        ...state,
        user: {
          ...state.user,
          ...payload,
        },
      };
    default:
      return state;
  }
};

export const connect = (selector) => (Component) => {
  return (props) => {
    const { state, setState, subscribe } = useContext(Context);
    const data = selector ? selector(state) : { state };
    const [, update] = useState({});
    useEffect(() => {
      subscribe(() => update({}));
    }, []);
    const dispatch = (action) => {
      setState(reducer(state, action));
    };

    return <Component {...props} dispatch={dispatch} {...data} />;
  };
};