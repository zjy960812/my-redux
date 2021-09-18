import React, { useContext } from 'react'
import {store, connect, Context} from './redux'

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