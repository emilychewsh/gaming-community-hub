import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Form, Button, Alert, Container } from 'react-bootstrap'
import { AppContext } from '../AppContext';
import './signUpPage.css';

export default function SignUpPage() {
    const [formData, setFormData] = useState({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: ""
    })

    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const { user, handleSignup  } = useContext(AppContext);

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
        fetch('/user/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        })
        .then((data) => {
            if (data.id) {
                handleSignup(data)
                navigate('/games')
            }
        })
        .catch((err) => setError(err.message)) 
        }


    return(
        <Container className="signup-container">
            <h2 className="signup-title">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit} className="signup-form">
                <Form.Group controlId="username">
                <Form.Label>Username*</Form.Label>
                <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                </Form.Group>

                <Form.Group controlId="first_name">
                <Form.Label>First Name*</Form.Label>
                <Form.Control
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                />
                </Form.Group>

                <Form.Group controlId="last_name">
                <Form.Label>Last Name*</Form.Label>
                <Form.Control
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                />
                </Form.Group>

                <Form.Group controlId="email">
                <Form.Label>Email*</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <Form.Text className="text-muted">
                 We'll never share your email with anyone else.
                </Form.Text>
                </Form.Group>

                <Form.Group controlId="password">
                <Form.Label>Password*</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                </Form.Group>
                
                <Button variant="primary" type="submit" className="mt-3">
                Register
                </Button>
            </Form>
        </Container>
    )
    
}