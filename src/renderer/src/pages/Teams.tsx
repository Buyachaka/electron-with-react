import React from 'react';
import { ListItem, Teams as TeamsList } from '../types/index';
import { getTeams as fetchTeams } from '../api';
import Header from '../components/Header';
import List from '../components/List';
import { Container } from '../components/GlobalComponents';
import SearchBar from '../components/SearchBar';

const mapTeamsToItems = (teams: TeamsList[]) => {
  return teams.map((team) => {
    return {
      id: team.id,
      url: `/team/${team.id}`,
      columns: [
        {
          key: 'Name',
          value: team.name,
        },
      ],
      navigationProps: team,
    } as ListItem;
  });
};

function Teams() {
  const [teams, setTeams] = React.useState<TeamsList[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [searchTerm, setSearchTerm] = React.useState<string>('');

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  React.useEffect(() => {
    const fetchAndSetTeamsData = async () => {
      try {
        const teamData = await fetchTeams();
        setTeams(teamData);
      } catch (err) {
        setError('Failed to fetch teams, please reload the page to retry');
      } finally {
        setIsLoading(false);
      }
    };
    fetchAndSetTeamsData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <Header title="Teams" showBackButton={false} />
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isLoading={isLoading}
        foundUsers={filteredTeams.length > 0}
      />
      <List items={mapTeamsToItems(filteredTeams)} isLoading={isLoading} />
    </Container>
  );
}

export default Teams;
