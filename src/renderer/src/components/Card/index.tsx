import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ListItemColumn, Teams, UserData } from '../../types';
import { Container } from './styles';

interface Props {
  id?: string;
  url?: string;
  columns: ListItemColumn[];
  hasNavigation?: boolean;
  navigationProps?: UserData | Teams;
}

function Card({
  id,
  columns,
  url,
  hasNavigation = true,
  navigationProps,
}: Props) {
  const navigate = useNavigate();
  const handleNavigation = (event: React.MouseEvent) => {
    if (hasNavigation && url) {
      navigate(url, {
        state: navigationProps,
      });
    }
    event.preventDefault();
  };

  return (
    <Container
      data-testid={`cardContainer-${id}`}
      hasNavigation={hasNavigation}
      onClick={handleNavigation}
    >
      {columns.map(({ key: columnKey, value }) => (
        <p key={columnKey}>
          <strong>{columnKey}</strong>&nbsp;{value}
        </p>
      ))}
    </Container>
  );
}

export default Card;
