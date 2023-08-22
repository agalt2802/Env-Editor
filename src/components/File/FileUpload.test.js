import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import FileUpload from './FileUpload';

describe('FileUpload', () => {
  test('should upload the file when the form is submitted', async () => {
    const mockData = { message: 'Upload successful' };
    const mockFetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(mockData),
    });
    global.fetch = mockFetch;

    const { getByLabelText, getByText } = render(<FileUpload />);

    const file = new File(['file content'], 'file.txt', { type: 'text/plain' });
    const fileInput = getByLabelText('Carica il tuo file:');
    fireEvent.change(fileInput, { target: { files: [file] } });

    const uploadButton = getByText('Carica');
    fireEvent.click(uploadButton);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('https://127.0.0.1:8081/upload', {
        method: 'POST',
        body: expect.any(FormData),
      });
    });
  });

  test('should show an error message if there is an error during file upload', async () => {
    const mockErrorMessage = "Error during file upload";
    const mockFetch = jest.fn().mockRejectedValue(new Error(mockErrorMessage));
    global.fetch = mockFetch;

    const { getByLabelText, getByText } = render(<FileUpload />);

    const file = new File(['file content'], 'file.txt', { type: 'text/plain' });
    const fileInput = getByLabelText('Carica il tuo file:');
    fireEvent.change(fileInput, { target: { files: [file] } });

    const uploadButton = getByText('Carica');
    fireEvent.click(uploadButton);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('https://127.0.0.1:8081/upload', {
        method: 'POST',
        body: expect.any(FormData),
      });
    });
  });
});
