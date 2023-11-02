import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import * as API from '../../api';
import TeamOverview from '../TeamOverview';

jest.mock('react-router-dom', () => ({
  useLocation: () => ({
    state: {
      name: 'Some Team',
    },
  }),
  useNavigate: () => ({}),
  useParams: () => ({
    teamId: '1',
  }),
}));

describe('TeamOverview', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should render spinner until team overview users are loaded', async () => {
    const teamOverview = {
      id: '1',
      teamLeadId: '2',
      teamMemberIds: ['3', '4', '5'],
    };
    const userData = {
      id: '2',
      firstName: 'userData',
      lastName: 'userData',
      displayName: 'userData',
      location: '',
      avatar: '',
    };

    jest
      .spyOn(API, 'getTeamOverview')
      .mockImplementationOnce(() => Promise.resolve(teamOverview));
    jest
      .spyOn(API, 'getUserData')
      .mockImplementation((id) => Promise.resolve({ ...userData, id }));

    render(<TeamOverview />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    const allUserDataElems = await screen.findAllByText('userData');
    expect(allUserDataElems).toHaveLength(4);
  });
});
