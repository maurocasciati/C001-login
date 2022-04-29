import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import LoginPage from './components/login.page';
import SignupPage from './components/signup.page';

function App() {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="App">
      { toggle ? <LoginPage/> : <SignupPage></SignupPage> }
      <Button variant="primary" onClick={() => setToggle(!toggle)}>CHANGE</Button>
    </div>
  );
}

export default App;
