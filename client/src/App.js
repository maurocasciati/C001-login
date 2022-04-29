import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import LoginPage from './components/login.page';
import SignupPage from './components/signup.page';
import { ModalProvider } from './context/modal.context';

function App() {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="App">
      <ModalProvider>
        { toggle ? <LoginPage/> : <SignupPage></SignupPage> }
      </ModalProvider>
      <Button variant="primary" onClick={() => setToggle(!toggle)}>CHANGE</Button>
    </div>
  );
}

export default App;
