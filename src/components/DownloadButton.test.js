import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import DownloadButton from './DownloadButton';
import '@testing-library/jest-dom/extend-expect';
describe('DownloadButton', () => {
  test('should render the component', () => {
    render(<DownloadButton />);
    expect(screen.getByText('Seleziona un file')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Scarica il file');
  });

  test('should enable the download button when a file is selected', () => {
    render(<DownloadButton />);
    const selectElement = screen.getByRole('combobox');
    const downloadButton = screen.getByRole('button', { name: 'Scarica il file' });

    expect(downloadButton).toBeDisabled();
    fireEvent.change(selectElement, { target: { value: 'commons.yaml' } });
    expect(downloadButton).toBeEnabled();
  });

  test('should download the selected file when the download button is clicked', async () => {
    global.URL.createObjectURL = jest.fn();
    global.URL.revokeObjectURL = jest.fn();

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      blob: () => Promise.resolve(new Blob(['test file content'], { type: 'text/plain' })),
    });

    render(<DownloadButton />);
    const selectElement = screen.getByRole('combobox');
    const downloadButton = screen.getByRole('button', { name: 'Scarica il file' });

    fireEvent.change(selectElement, { target: { value: 'commons.yaml' } });

    fireEvent.click(downloadButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://127.0.0.1:8081/download/COMMONS_PATH');
      expect(global.URL.createObjectURL).toHaveBeenCalled();
      expect(global.URL.revokeObjectURL).toHaveBeenCalled();
    });
  });

  test('should show an alert when there is an error downloading the file', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({ ok: false });

    global.alert = jest.fn();

    render(<DownloadButton />);
    const selectElement = screen.getByRole('combobox');
    const downloadButton = screen.getByRole('button', { name: 'Scarica il file' });

    fireEvent.change(selectElement, { target: { value: 'commons.yaml' } });

    fireEvent.click(downloadButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://127.0.0.1:8081/download/COMMONS_PATH');
      expect(global.alert).toHaveBeenCalledWith('Error downloading file');
    });
  });
});
