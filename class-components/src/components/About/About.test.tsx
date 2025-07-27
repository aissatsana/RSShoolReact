import { render, screen } from '@testing-library/react';
import { About } from './About';

describe('About component', () => {
  it('renders author and course info with correct links', () => {
    render(<About />);
    expect(
      screen.getByText(/The application was made by/i)
    ).toBeInTheDocument();

    const authorLink = screen.getByText('aissatsana');
    expect(authorLink).toBeInTheDocument();
    expect(authorLink).toHaveAttribute('href', 'https://github.com/aissatsana');
    expect(authorLink).toHaveAttribute('target', '_blank');
    expect(authorLink).toHaveClass('about__link');

    const courseLink = screen.getByText('RS School React course');
    expect(courseLink).toBeInTheDocument();
    expect(courseLink).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );
    expect(courseLink).toHaveAttribute('target', '_blank');
    expect(courseLink).toHaveClass('about__link');
  });
});
