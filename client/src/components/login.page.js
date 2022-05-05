import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { postLogin } from '../api/profile.api';
import { ModalContext } from '../context/modal.context';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profileData, setProfileData] = useState();

  let { handleModal } = React.useContext(ModalContext);

  useEffect(() => {
    if (profileData) {
      handleModal(profileData);
    }
  }, [profileData]);

  const submitHandler = (event) => {
    event.preventDefault();

    setUsername('');
    setPassword('');
    
    postLogin(username, password).then(setProfileData).catch(handleError);
  };

  const handleError = (error) => {
    return alert('An error ocurred: ' + error);
  }

  return(
    <Container>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="form.Username">
          <Form.Label>User Name</Form.Label>
          <Form.Control 
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Your username"
            required/>
        </Form.Group>
        <Form.Group controlId="form.Password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="text"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Your password"
            required/>
        </Form.Group>
        <Button type='submit'>Login</Button>
      </Form>
    </Container>
  );
}
export default LoginPage;