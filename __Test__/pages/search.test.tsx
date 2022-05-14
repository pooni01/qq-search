import { render, screen, fireEvent } from '@testing-library/react';
import App from '../../src/App';

test('renders search bar', () => {
  render(<App />);
  const linkElement = screen.getByPlaceholderText(/请输入QQ号/i);
  expect(linkElement).toBeInTheDocument();
});

test('input search bar', ()=>{
  render(<App />);
  const input = screen.getByPlaceholderText(/请输入QQ号/i) as HTMLInputElement;
  fireEvent.change(input, { target: { value: '3847555' }});
  expect(input.value).toContain('3847555');
})