import { useState } from 'react';

import db from '../firebase';
import { collection, addDoc } from "firebase/firestore"; 

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const ContacsForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    console.log(name, email, message)

    const handleSubmit = async (e) => {
        e.preventDefault();

        //patikrinti ar laukai uzpildyti
        if (name.length < 3) {
            alert('Name cant be blank!')
            return
        }
        if (email === "") {
            alert('Email cant be blank!')
            return
        }

        if (message.length < 5) {
            alert('Message cant be blank!')
            return
        }
        //irasyti i db
        try {
            const docRef = await addDoc(collection(db, "contacts"), {
                client_name: name,
                client_email: email,
                client_message: message,
                created: new Date()
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (error) {
            console.log(error)
        }
        //isvalyti laukus
        setName('');
        setEmail('');
        setMessage('');
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="forText">
                <Form.Label>Question</Form.Label>
                <Form.Control
                    as="textarea"
                    placeholder="Enter your email"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </Form.Group>


            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default ContacsForm
