import React from 'react';
import {render, screen, waitFor, act} from '@testing-library/react';
import * as API from '../../api';
import Teams from '../Teams';

jest.mock('react-router-dom', () => ({
    useLocation: () => ({
        state: {
            firstName: 'Test',
            lastName: 'User',
            displayName: 'userName',
            location: 'location',
        },
    }),
    useNavigate: () => ({}),
}));

describe('Teams', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('should render spinner while loading', async () => {
        jest.spyOn(API, 'getTeams').mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve([
            {
                id: '1',
                name: 'Team1',
            },
            {
                id: '2',
                name: 'Team2',
            },
        ]), 1000)));

        render(<Teams />);
        expect(screen.getByTestId('spinner')).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(1000);
        });

        await waitFor(() => {
            expect(screen.getByText('Team1')).toBeInTheDocument();
        });
        expect(screen.getByText('Team2')).toBeInTheDocument();

        jest.useRealTimers();

    });

    it('should render teams list', async () => {
        jest.spyOn(API, 'getTeams').mockResolvedValue([
            {
                id: '1',
                name: 'Team1',
            },
            {
                id: '2',
                name: 'Team2',
            },
        ]);

        render(<Teams />);

        await waitFor(() => {
            expect(screen.getByText('Team1')).toBeInTheDocument();
        });
        expect(screen.getByText('Team2')).toBeInTheDocument();
    });
});
