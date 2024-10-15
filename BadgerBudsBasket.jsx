import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import BadgerBudsDataContext from '../../../contexts/BadgerBudsDataContext';

export default function BadgerBudsBasket(props) {
  const buddies = useContext(BadgerBudsDataContext);
  const [savedCatIds, setSavedCatIds] = useState([]);
  const [adoptedCatIds, setAdoptedCatIds] = useState([]);

  useEffect(() => {
    const savedIds = JSON.parse(sessionStorage.getItem('savedCatIds')) || [];
    const adoptedIds = JSON.parse(sessionStorage.getItem('adoptedCatIds')) || [];
    setSavedCatIds(savedIds);
    setAdoptedCatIds(adoptedIds);
  }, []);

  const handleUnselect = (id, name) => {
    const updatedSavedIds = savedCatIds.filter(catId => catId !== id);
    sessionStorage.setItem('savedCatIds', JSON.stringify(updatedSavedIds));
    setSavedCatIds(updatedSavedIds);
    alert(`${name} has been removed from your basket.`);
  };

  const handleAdopt = (id, name) => {
    const updatedAdoptedIds = [...adoptedCatIds, id];
    const updatedSavedIds = savedCatIds.filter(catId => catId !== id);
    sessionStorage.setItem('adoptedCatIds', JSON.stringify(updatedAdoptedIds));
    sessionStorage.setItem('savedCatIds', JSON.stringify(updatedSavedIds));
    setAdoptedCatIds(updatedAdoptedIds);
    setSavedCatIds(updatedSavedIds);
    alert(`${name} has been adopted!`);
  };

  const savedBuddies = buddies.filter(buddy => 
    savedCatIds.includes(buddy.id) && !adoptedCatIds.includes(buddy.id)
  );

  return (
    <Container>
      <h1>Badger Buds Basket</h1>
      <p>These cute cats could be all yours!</p>
      {savedBuddies.length === 0 ? (
        <p>Your basket is empty. Go save some cats!</p>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {savedBuddies.map(buddy => (
            <Col key={buddy.id}>
              <Card className="h-100">
                <Card.Img 
                  variant="top" 
                  src={`https://raw.githubusercontent.com/CS571-F24/hw5-api-static-content/main/cats/${buddy.imgIds[0]}`} 
                  alt={`A picture of ${buddy.name}`} 
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{buddy.name}</Card.Title>
                  <div className="mt-auto">
                    <Button
                      variant="warning"
                      onClick={() => handleUnselect(buddy.id, buddy.name)}
                      className="me-2"
                    >
                      Unselect
                    </Button>
                    <Button 
                      variant="success" 
                      onClick={() => handleAdopt(buddy.id, buddy.name)}
                    >
                      Adopt
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}