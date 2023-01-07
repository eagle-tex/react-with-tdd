import { render } from '@testing-library/react';
import Input from './Input.jsx';

describe('Input Component', () => {
  it('has "is-invalid" class for input when help is set', () => {
    const { container } = render(<Input help="Error message" />);
    const input = container.querySelector('input');

    expect(input.classList).toContain('is-invalid');
  });
});
