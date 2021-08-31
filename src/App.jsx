import React, { useState, createContext, useContext } from 'react'

const Context = createContext(null)

function App() {

  const [msg, setMsg] = useState('123')

  return (
    <Context.Provider value={{msg, setMsg}}>
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
    TWO <ModifyMsg />
  </section>
);
const Three = () => <section>THREE</section>;

const Msg = () => {
  const {msg} = useContext(Context)
  return <>{msg}</>
}

const ModifyMsg = () => {
  const {setMsg} = useContext(Context)
  const onChange = (e) => {
    setMsg(e.target.value)
  }
  return <input onChange={onChange} />
}
