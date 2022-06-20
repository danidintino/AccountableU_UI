import './App.css';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Content from './components/Content';
import { getUser } from './services/firestore';


const App = () => {
  const [user, setUser] = useState({});
  const userId = "sr1Lr2xL6X0hlJ1VhDAO";

  useEffect(() => {
    if (userId) {
      getUser(userId).then((userObject) => {
        if (userObject) {
          setUser(userObject);
          console.log(user);
        }
      });
    }
    console.log(user);
  }, []);
  return (
    <div className="App">
      <Header/>
      <Content/>
      {/* {user.firstName} {user.lastName} */}
    </div>
  );
}

export default App;
