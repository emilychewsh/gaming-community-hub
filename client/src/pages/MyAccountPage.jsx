import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Container, Form, Button, Modal } from "react-bootstrap"
import { AppContext } from "../AppContext"
import './myAccountPage.css'


export default function MyAccountPage() {
    const [user, setUser] = useState(null)
    const [edit, setEdit] = useState(false)
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
    })
    const [modal, setModal] = useState(false)
    const { user: loggedInUser } = useContext(AppContext)
    const navigate = useNavigate()

    useEffect(() => {
        fetch('/user/account')
        .then(resp => resp.json())
        .then(data => {
            setUser(data)
            setFormData({
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email
            })
        })
    }, [])

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleEditToggle = () => {
        // reset form data to user data when exiting edit mode
        if (edit) {
            setFormData({
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email
            })
        }
        setEdit(!edit)
    }

    const handleSaveChanges = () => {
        //filter the unchanged field values
        const updatedData = Object.keys(formData).reduce((acc, key) => {
            if (formData[key] !== user[key]){
                acc[key] = formData[key]
            }
            return acc
        }, {})


        if (Object.keys(updatedData).length > 0) {
            fetch('/user/account', {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(updatedData)
            })
            .then(resp => resp.json())
            .then(data => {
                setUser(data)
                setEdit(false)
            })
        } else {
            //meaning no changes to be submitted
            setEdit(false)
        }
    }

    const handleDeleteAccount = () => {
        fetch('/user/delete', {
            method: 'DELETE',
        })
        .then(resp => {
            if (resp.ok) {
                navigate('/signup')}
        })
    }

    if (!user) return <div>Loading user details...</div>;

    return(
        
        <Container className='myaccount-container'>
            <h2 className="myaccount-title">My Account</h2>
            <Form className="myaccount-form">
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" value={user.username} disabled />
                </Form.Group>

                <Form.Group controlId="first_name" className="mt-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        disabled={!edit}
                    />
                </Form.Group>

                <Form.Group controlId="last_name" className="mt-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        disabled={!edit}
                    />
                </Form.Group>

                <Form.Group controlId="email" className="mt-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!edit}
                    />
                </Form.Group>

                <Button variant="primary" className="mt-4" onClick={handleEditToggle}>
                {edit ? 'Cancel' : 'Edit'}
            </Button>
            {edit && (
                <Button variant="success" className="mt-4 ms-3" onClick={handleSaveChanges}>
                    Save Changes
                </Button>
            )}

            <Button variant="danger" className="mt-4 ms-3" onClick={() => setModal(true)}>
                Delete Account
            </Button>

            <Modal show={modal} onHide={() => setModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Account Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure? This action cannot be undone.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteAccount}>
                        Yes, Delete My Account
                    </Button>
                </Modal.Footer>
            </Modal>
            </Form>
        </Container>
    )
}