import React from 'react';
import { ListItem } from '../../types';
import Card from '../Card';
import { Spinner } from '../Spinner';
import { Container, LoadingContainer } from './styles';

interface Props {
  items?: ListItem[];
  hasNavigation?: boolean;
  isLoading: boolean;
}

function List({ items = [], hasNavigation = true, isLoading = true }: Props) {
  if (isLoading) {
    return (
      <LoadingContainer>
        <Spinner />
      </LoadingContainer>
    );
  }

  return (
    <Container>
      {items.map(({ url, id, columns, navigationProps }) => (
        <Card
          key={id}
          id={id}
          columns={columns}
          navigationProps={navigationProps}
          hasNavigation={hasNavigation}
          url={url}
        />
      ))}
    </Container>
  );
}

export default List;
