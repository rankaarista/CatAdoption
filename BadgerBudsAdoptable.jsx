import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import BadgerBudsDataContext from '../../../contexts/BadgerBudsDataContext';
import BadgerBudSummary from './BaderBudSummary';


export default function BadgerBudsAdoptable(props) {
  const buddies = useContext(BadgerBudsDataContext);
  const [savedCatIds, setSavedCatIds] = useState([]);
  const [adoptedCatIds, setAdoptedCatIds] = useState([]);

  useEffect(() => {
    const handleStorageChange = () => {
      const savedIds = JSON.parse(sessionStorage.getItem('savedCatIds')) || [];
      const adoptedIds = JSON.parse(sessionStorage.getItem('adoptedCatIds')) || [];
      setSavedCatIds(savedIds);
      setAdoptedCatIds(adoptedIds);
    };

    // Initial load
    handleStorageChange();

    // Listen for changes in other tabs/windows
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleSave = (id, name) => {
    const updatedSavedIds = [...savedCatIds, id];
    sessionStorage.setItem('savedCatIds', JSON.stringify(updatedSavedIds));
    setSavedCatIds(updatedSavedIds);
    alert(`${name} has been added to your basket!`);
  };

  const availableBuddies = buddies.filter(buddy => 
    !savedCatIds.includes(buddy.id) && !adoptedCatIds.includes(buddy.id)
  );

  return (
    <Container>
      <h1>Available Badger Buds</h1>
      <p>The following cats are looking for a loving home! Could you help?</p>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {availableBuddies.map(buddy => (
          <Col key={buddy.id}>
            <BadgerBudSummary
              id={buddy.id}
              name={buddy.name}
              imgIds={buddy.imgIds}
              gender={buddy.gender}
              breed={buddy.breed}
              age={buddy.age}
              description={buddy.description}
              onSave={handleSave}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}