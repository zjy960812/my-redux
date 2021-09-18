import React, { useState, createContext, useContext, useEffect } from 'react'

const Context = createContext(null)

const store = {
  state: {
    name: "liming",
    msg: "iam a doctor",
  },
  setState(newState) {
    store.state = newState
    store.listeners.forEach(fn => {fn()})
  },
  listeners: [],
  subscribe(fn) {
    store.listeners.push(fn)
    return () => {
      store.listeners = store.listeners.filter(f => f !== fn)
    }
  }
};

const connect = (Component) => {
  return (props) => {
    const { state: user, setState: setUser, subscribe } = useContext(Context);
    const [, update] = useState({})
    useEffect(() =>{
      subscribe(() => update({}))
    }, [])
    const dispatch = (action) => {
      setUser(reducer(user, action));
    };

    return <Component {...props} dispatch={dispatch} state={user} />;
  };
};

function App() {
  return (
    <Context.Provider value={store}>
      <One />
      <Two />
      <Three />
    </Context.Provider>
  );
}

export default App

const One = () => {
  console.log('render 1')
  return (<section>
    ONE <Msg />
  </section>)
};
const Two = () => {
  console.log('render 2')
  return <section>
    TWO <ModifyMsg label={'x'} />
  </section>
}
const Three = () => <section>THREE</section>;


const reducer = (state, { type, payload}) => {
  switch (type) {
    case 'updateUser':
      return {
        ...state,
        ...payload
      }
    default:
      return state
  }
}

const Msg = connect(() => {
  const { state: user } = useContext(Context);
  return (
    <>
      {user.name} + {user.msg}
    </>
  );
});

const _ModifyMsg = ({dispatch, state, label}) => {
  const onChange = (e) => {
    dispatch({ type: "updateUser", payload: { msg: e.target.value } });
  }
  return (
    <>
      <span>{label}</span>
      <input onChange={onChange} value={state.msg} placeholder={state.msg} />
    </>
  );
}

const ModifyMsg = connect(_ModifyMsg)