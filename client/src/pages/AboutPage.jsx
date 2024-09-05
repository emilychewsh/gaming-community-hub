import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './aboutPage.css';

export default function AboutPage() {
    return (
        <Container className="about-container">
            <Row>
                <Col>
                    <h1>Welcome to Quest Games</h1>
                    <p>
                        Quest Games is a gaming community hub designed for gamers who love exploring new and exciting games. 
                        Whether you’re searching for your next adventure, managing your favourite games, or looking for 
                        recommendations from fellow gamers, Quest Games has it all!
                    </p>
                    <p>
                        Users can create accounts to manage their favourite games, write reviews, and even add games to a wishlist.
                        You can browse games by genre or title, and get detailed information, trailers, and more. 
                        Whether you're a casual player or a dedicated gamer, Quest Games is the perfect space to connect with others 
                        and discover your next game quest!
                    </p>
                    <p>
                        Join the community today, start tracking your favourite games, and be a part of the ever-expanding world of gaming!
                    </p>
                    <img src='/images/quest-logo.png' style={{width: "300px", height: "auto", marginTop: "20px"}}/>
                </Col>
            </Row>
        </Container>
    );
}