import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import LoginPage from './components/login.page';
import SignupPage from './components/signup.page';
import { ModalProvider } from './context/modal.context';

function App() {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="App">
      <Card body style={{ width: '70%', padding: '5rem', margin: 'auto' }}>
        <ModalProvider>
          { toggle ? <LoginPage/> : <SignupPage></SignupPage> }
        </ModalProvider>
        <Button variant="primary" onClick={() => setToggle(!toggle)}>CHANGE</Button>
      </Card>
    </div>
  );
}

export default App;
