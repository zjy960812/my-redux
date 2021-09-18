import React, { useState, createContext, useContext } from 'react'

const Context = createContext(null)

function App() {

  const [user, setUser] = useState({
    name: 'liming',
    msg: 'iam a doctor'
  })

  return (
    <Context.Provider value={{ user, setUser }}>
      <One />
      <Two />
      <Three />
    </Context.Provider>
  );
}

export default App

const One = () => (
  <section>
    ONE <Msg />
  </section>
);
const Two = () => (
  <section>
    TWO <ModifyMsg label={'x'} />
  </section>
);
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

const Msg = () => {
  const {user} = useContext(Context)
  return (
    <>
      {user.name} + {user.msg}
    </>
  );
}

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

const connect = (Component) => {
  return (props) => {
    const { user, setUser } = useContext(Context);
    const dispatch = (action) => {
      setUser(reducer(user, action));
    };

    return <Component {...props} dispatch={dispatch} state={user} />;
  };
}

const ModifyMsg = connect(_ModifyMsg)