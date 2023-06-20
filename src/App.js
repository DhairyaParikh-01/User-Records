import './App.css';
import React,{ useState } from 'react';
import Home from './Components/Home';
import Alert from './Components/Alert';

function App() {
  const [alert, setAlert] = useState(null); // useState for alert 
  const showAlert = (type, strong, message)=>{ // showAlert() method for populating 'alert'. params given through Alert props
    setAlert({
      type: type,
      strong: strong,
      message: message
    })
    setTimeout(() => { // setTimeout() function for killing alert after particular point of time
      setAlert(null);
    }, 1500);
  }
  return (
    <div>
        <Alert alert={alert}/>
        <Home showAlert={showAlert}/>
    </div>
  );
}

export default App;
