import React from 'react'
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


const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

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
const Three = () => {
  console.log('render 3');
  return <section>THREE</section>;
};

const Msg = connect(mapStateToProps)(({user}) => {
  console.log('render Msg');
  return (
    <>
      {user.name} + {user.msg}
    </>
  );
});

const _ModifyMsg = ({dispatch, state, label}) => {
  console.log('render ModifyMsg');
  const onChange = (e) => {
    dispatch({ type: "updateUser", payload: { msg: e.target.value } });
  }
  return (
    <>
      <span>{label}</span>
      <input onChange={onChange} value={state.user.msg} placeholder={state.msg} />
    </>
  );
}

const ModifyMsg = connect()(_ModifyMsg)