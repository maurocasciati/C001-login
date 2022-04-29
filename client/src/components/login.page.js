import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (event) => {
    event.preventDefault();
    setUsername('');
    setPassword('');
    return alert('Entered Values are: '+ username +','+password)
  };

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