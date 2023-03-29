import React from 'react';
import { render, act } from '@testing-library/react';
import fetchMock from 'fetch-mock-jest';
import SearchNav from '../searchNav';

fetchMock.mock(
  {
    url: '*',
    headers: {
      Accept: 'application/json',
    },
  }, {
    status: 503,
    throws: 'Failed to fetch',
  },
);

describe('LibraryNetworkFail', () => {
  it('renders an error mesage on network failure', async () => {
    await act(async () => {
      const { findByText } = await render(<SearchNav />);
      const err = await findByText('Some videos could not be loaded. Error message: Failed to fetch');
      expect(err).toBeInTheDocument();
    });
  });
});
