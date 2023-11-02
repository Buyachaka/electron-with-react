import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ListItem, UserData } from '../types';
import { getTeamOverview, getUserData } from '../api';
import Card from '../components/Card';
import { Container } from '../components/GlobalComponents';
import Header from '../components/Header';
import List from '../components/List';
import SearchBar from '../components/SearchBar';

const mapUserDataToColumn = (user: UserData, isTeamLead = false) => {
  const { firstName, lastName, displayName, location } = user;
  const column = [
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
  if (isTeamLead) {
    const teamLeadColumn = {
      key: 'Team Lead 👑',
      value: '',
    };
    column.unshift(teamLeadColumn);
  }
  return column;
};
const mapUserToListItemArray = (users: UserData[]) => {
  return users.map((user) => {
    return {
      id: user.id,
      url: `/user/${user.id}`,
      columns: mapUserDataToColumn(user),
      navigationProps: user,
    };
  }) as ListItem[];
};

interface PageState {
  teamLead?: UserData;
  teamMembers?: UserData[];
}

function TeamOverview() {
  const location = useLocation();
  const { teamId } = useParams();
  const [pageData, setPageData] = React.useState<PageState>({
    teamMembers: [],
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [searchTerm, setSearchTerm] = React.useState<string>('');

  React.useEffect(() => {
    const getTeamUsers = async () => {
      try {
        const { teamLeadId, teamMemberIds = [] } =
          await getTeamOverview(teamId);
        const teamLead = await getUserData(teamLeadId);
        const teamMembers = await Promise.all(
          teamMemberIds.map((id) => getUserData(id)),
        );

        setPageData({
          teamLead,
          teamMembers,
        });
      } catch (err) {
        setError('Failed to fetch team users, please reload the page to retry');
      } finally {
        setIsLoading(false);
      }
    };
    getTeamUsers();
  }, [teamId]);

  if (error) {
    return <div>{error}</div>;
  }
  const { teamLead } = pageData || null;

  const isUserMatchingSearchTerm = (user: UserData) => {
    const userFullName = `${user.firstName} ${user.lastName}`;
    return userFullName.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const getFoundAnyUser = (
    filteredUsers: UserData[],
    isTeamLeadMatching: boolean,
  ) => {
    return filteredUsers.length > 0 || isTeamLeadMatching;
  };

  const filteredUsers =
    pageData && pageData.teamMembers
      ? pageData.teamMembers.filter(isUserMatchingSearchTerm)
      : [];
  const isTeamLeadMatching = teamLead
    ? isUserMatchingSearchTerm(teamLead)
    : false;

  return (
    <Container>
      <Header title={`Team ${location.state.name}`} />
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isLoading={isLoading}
        foundUsers={getFoundAnyUser(filteredUsers, isTeamLeadMatching)}
      />
      {!isLoading && isTeamLeadMatching && (
        <Card
          columns={mapUserDataToColumn(teamLead, true)}
          url={`/user/${teamLead.id}`}
          navigationProps={teamLead}
        />
      )}
      <List
        items={mapUserToListItemArray(
          pageData?.teamMembers ? filteredUsers : [],
        )}
        isLoading={isLoading}
      />
    </Container>
  );
}

export default TeamOverview;
