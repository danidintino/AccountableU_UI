import logo from './logo.svg';
import './App.css';
import * as FirestoreService from './services/firestore';
import { getActivity } from "./services/firestore";
import { useState, useEffect } from 'react';



function App() {
  const [activityName, setActivityName] = useState("");
  const activityId = "UtbkRmd8E10uM24nzeSL";

  useEffect(() => {
    if (activityId) {
      FirestoreService.getActivity(activityId)
        .then(activity => {
          if (activity.exists) {
            setActivityName(activity.data().name);
            console.log(activity.data());
          } else {
            // throw some error
          }
        });
    }
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        HIIII
        {activityName}
      </header>
    </div>
  );
}

export default App;
