import React, { useState, createContext, useContext, useEffect } from "react";

export const Context = createContext(null);

export const store = {
  state: {
    name: "liming",
    msg: "iam a doctor",
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
        ...payload,
      };
    default:
      return state;
  }
};

export const connect = (Component) => {
  return (props) => {
    const { state: user, setState: setUser, subscribe } = useContext(Context);
    const [, update] = useState({});
    useEffect(() => {
      subscribe(() => update({}));
    }, []);
    const dispatch = (action) => {
      setUser(reducer(user, action));
    };

    return <Component {...props} dispatch={dispatch} state={user} />;
  };
};