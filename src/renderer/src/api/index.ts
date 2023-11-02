import { TeamOverview, Teams, UserData } from '../types';

const getData = async (path = '') => {
  const url = `https://cgjresszgg.execute-api.eu-west-1.amazonaws.com/${path}`;
  const res = await fetch(url);
  return res.json();
};

export const getTeams = (): Promise<Teams[]> => {
  return getData('teams');
};

export const getTeamOverview = (teamId: string | undefined): Promise<TeamOverview> => {
  return getData(`teams/${teamId}`);
};

export const getUserData = (userId: string): Promise<UserData> => {
  return getData(`users/${userId}`);
};
