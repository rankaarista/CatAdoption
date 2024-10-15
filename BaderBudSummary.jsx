import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

const BadgerBudSummary = ({ id, name, imgIds, gender, breed, age, description, onSave }) => {
    const [showMore, setShowMore] = useState(false);
    const imageUrl = `https://raw.githubusercontent.com/CS571-F24/hw5-api-static-content/main/cats/${imgIds[0]}`;

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    return (
        <Card className="h-100">
            <Card.Img variant="top" src={imageUrl} alt={`A picture of ${name}`} />
            <Card.Body className="d-flex flex-column">
                <Card.Title>{name}</Card.Title>
                {showMore && (
                    <div className="mb-3">
                        <p><strong>Gender:</strong> {gender}</p>
                        <p><strong>Breed:</strong> {breed}</p>
                        <p><strong>Age:</strong> {age}</p>
                        {description && <p><strong>Description:</strong> {description}</p>}
                    </div>
                )}
                <div className="mt-auto">
                    <Button 
                        variant="primary" 
                        onClick={toggleShowMore} 
                        className="me-2"
                    >
                        {showMore ? "Show Less" : "Show More"}
                    </Button>
                    <Button variant="secondary" onClick={() => onSave(id, name)}>Save</Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default BadgerBudSummary;