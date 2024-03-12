import {fireEvent, render, screen} from '@testing-library/react';
import App from './App';
import CountryData from "./CountryData";

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('invalid country path', async () => {
  // ARRANGE
  render(<CountryData countryName = "invalidCountry"/>)
  // ACT
  //await userEvent.click(screen.getByText('Load Greeting'))
  await screen.findByRole('errorAlert')
  // ASSERT
  expect(screen.getByRole('errorAlert')).toHaveTextContent('No information for this country!')
})

test('show details', async () => {
  // ARRANGE
  render(<CountryData countryName = "US"/>)
  // ACT
  fireEvent.click(screen.getByText('Washington'))
  // ASSERT
  expect(screen.getByRole('provinceDetails')).toBeVisible();
})