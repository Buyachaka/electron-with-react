import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import SearchBar from '../index'; // Adjust the path accordingly

describe('<SearchBar />', () => {
  it('renders the input when not loading', () => {
    render(
      <SearchBar
        searchTerm=""
        setSearchTerm={() => {}}
        isLoading={false}
        foundUsers
      />,
    );
    const input = screen.getByPlaceholderText('Search');
    expect(input).toBeInTheDocument();
  });

  it('does not render the input when loading', () => {
    const mockSetSearchTerm = jest.fn();

    render(
      <SearchBar
        searchTerm=""
        setSearchTerm={mockSetSearchTerm}
        isLoading
        foundUsers
      />,
    );
    const input = screen.queryByPlaceholderText('Search');
    expect(input).not.toBeInTheDocument();
  });

  it('updates the input value when the user types', () => {
    const mockSetSearchTerm = jest.fn();
    render(
      <SearchBar
        searchTerm=""
        setSearchTerm={mockSetSearchTerm}
        isLoading={false}
        foundUsers
      />,
    );

    const input = screen.getByPlaceholderText('Search');
    userEvent.type(input, 'Hello');
    expect(mockSetSearchTerm).toHaveBeenCalledTimes(5);
  });

  it('renders the "Nothing found" message if searchTerm is non-empty and foundUsers is false', () => {
    const props = {
      searchTerm: 'test',
      setSearchTerm: jest.fn(),
      isLoading: false,
      foundUsers: false,
    };

    render(<SearchBar {...props} />);
    expect(screen.getByText('Nothing found 😔.')).toBeInTheDocument();
  });
});
