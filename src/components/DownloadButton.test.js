import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import fetchMock from 'jest-fetch-mock';
import DownloadButton from './DownloadButton';

fetchMock.enableMocks();
global.URL.createObjectURL = jest.fn();
global.URL.revokeObjectURL = jest.fn();

beforeEach(() => {
  window.fetch.mockResolvedValueOnce({
    ok: true,
    blob: () => Promise.resolve(new Blob()),
  });
  global.URL.createObjectURL.mockReturnValue('blobUrl');
});

afterEach(() => {
  window.fetch.mockClear();
  global.URL.createObjectURL.mockClear();
});

test('renders file list and the button is disabled initially', () => {
  render(<DownloadButton />);

  const select = screen.getByRole('combobox');
  expect(select.value).toBe('');

  const button = screen.getByRole('button', { name: /Scarica il file/i });
  expect(button).toBeDisabled();
});

// test('button becomes enabled when a file is selected and initiates download on click', async () => {
//   render(<DownloadButton />);

//   const select = screen.getByRole('combobox');
//   const button = screen.getByRole('button', { name: /Scarica il file/i });

//   // Change selected file
//   fireEvent.change(select, { target: { value: 'commons.yaml' } });

//   // Verify that file is selected and button is enabled
//   expect(select.value).toBe('commons.yaml');
//   expect(button).toBeEnabled();

//   // Click the button to download the file
//   fireEvent.click(button);

//   // Verify that fetch was called with the correct URL
//   expect(window.fetch).toHaveBeenCalledWith('http://127.0.0.1:8081/download/COMMONS_PATH');

//   // Verify that a blob URL was created
//   expect(global.URL.createObjectURL).toHaveBeenCalledWith(new Blob());
// });
