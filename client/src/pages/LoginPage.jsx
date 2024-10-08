import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Form, Button, Alert, Container } from 'react-bootstrap'
import { AppContext } from '../AppContext';
import './loginPage.css';

export default function LoginPage() {
    const [formData, setFormData] = useState({username: "", password: ""})
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const { user, handleLogin } = useContext(AppContext);

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user, navigate])

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
        .then((response) => {
            if(!response.ok){
                throw new Error('Login failed')
            }
            return response.json()
        })
        .then((data) =>{
            if (data.id) {
                handleLogin(data)
                navigate('/games')
            } else {
                //handle errors
                setError(data.error || "an error occurred")
            }
        })
        .catch((err) => setError(err.message))
    }

    return(
        <Container className="login-container">
            <h2 className="login-title">Login</h2>
            <Form onSubmit={handleSubmit} className="login-form">
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                    Login
                </Button>

            </Form>
        </Container>
    )
}