import React from 'react';
import { useLocation } from 'react-router-dom';
import { UserData } from '../types';
import Card from '../components/Card';
import { Container } from '../components/GlobalComponents';
import Header from '../components/Header';

const mapUserDataToCard = (user: UserData) => {
  const { firstName, lastName, displayName, location } = user;
  return [
    {
      key: 'Name',
      value: `${firstName} ${lastName}`,
    },
    {
      key: 'Display Name',
      value: displayName,
    },
    {
      key: 'Location',
      value: location,
    },
  ];
};

function UserOverview() {
  const { state } = useLocation();

  if (!state) {
    return <div>User not found</div>;
  }

  const { firstName, lastName } = state;

  return (
    <Container>
      <Header title={`User ${firstName} ${lastName}`} />
      <Card
        columns={mapUserDataToCard(state)}
        hasNavigation={false}
        navigationProps={state}
      />
    </Container>
  );
}

export default UserOverview;
