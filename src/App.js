import React, {createContext, useState} from "react";
import Navigation from "./navigation";

export const StateContext = createContext({})

function App() {
  const [fixtures, setFixtures] = useState([])
  const [pendingfixtures, setPendingfixtures] = useState([])
  return (
    <StateContext.Provider value={{fixtures, setFixtures, pendingfixtures, setPendingfixtures}}>
      <Navigation/>
    </StateContext.Provider>
  );
}

export default App;
