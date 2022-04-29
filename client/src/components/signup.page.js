import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { postUser } from '../api/profile.api';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [cityId, setCityId] = useState(0);

  const submitHandler = (event) => {
    event.preventDefault();
    setName('');
    setUsername('');
    setPassword('');
    setAddress('');
    setCityId(0);

    postUser({
      name,
      username,
      password,
      address,
      cityId,
    }).then(showAlert).catch(handleError);
  };

  const showAlert = () => {
    return alert('User created!');
  }
  const handleError = (error) => {
    return alert('An error ocurred: ' + error);
  }

  return(
    <Container>
      <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="form.Name">
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name"
            required/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="form.Username">
          <Form.Label>Username</Form.Label>
          <Form.Control 
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Your username"
            required/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="form.Password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="text"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Your password"
            required/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="form.Address">
          <Form.Label>Address</Form.Label>
          <Form.Control 
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            placeholder="Your address"
            required/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="form.City">
          <Form.Label>City</Form.Label>
          <Form.Select value={cityId} onChange={(event) => setCityId(Number(event.target.value))}>
            <option>Select you city</option>
            <option value={1}>Buenos Aires, Argentina</option>
            <option value={2}>Cordoba, Argentina</option>
            <option value={3}>Santa Fe, Argentina</option>
            <option value={4}>Montevideo, Uruguay</option>
            <option value={5}>Colonia, Uruguay</option>
            <option value={6}>Valparaiso, Chile</option>
            <option value={7}>Santiago, Chile</option>
            <option value={8}>La Paz, Bolivia</option>
            <option value={9}>Cochabamba, Bolivia</option>
            <option value={10}>Asunción, Paraguay</option>
            <option value={11}>Rio de Janeiro, Brasil</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">Signup</Button>
      </Form>
    </Container>
  );
}
export default SignupPage;