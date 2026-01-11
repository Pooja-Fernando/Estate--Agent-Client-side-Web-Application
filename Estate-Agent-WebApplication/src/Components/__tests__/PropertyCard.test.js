import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PropertyCard from '../PropertyCard';

describe('PropertyCard Component', () => {
  const mockProperty = {
    id: 1,
    type: 'Apartment',
    price: 450000,
    bedrooms: 2,
    postcode: 'NW1 6XE',
    location: 'London, Camden',
    shortDesc: 'Modern apartment with great views',
    dateAdded: '2024-01-15',
    images: ['https://example.com/image1.jpg']
  };

  const mockProps = {
    property: mockProperty,
    onClick: jest.fn(),
    onAddToFavourites: jest.fn(),
    onDragStart: jest.fn(),
  };

  test('renders property price', () => {
    render(<PropertyCard {...mockProps} />);
    expect(screen.getByText(/450,000/)).toBeInTheDocument();
  });

  test('renders property image', () => {
    render(<PropertyCard {...mockProps} />);
    const image = screen.getByRole('img', { hidden: true });
    expect(image).toHaveAttribute('src', 'https://example.com/image1.jpg');
  });

  test('renders property location', () => {
    render(<PropertyCard {...mockProps} />);
    expect(screen.getByText('London, Camden')).toBeInTheDocument();
  });

  test('renders property bedrooms', () => {
    render(<PropertyCard {...mockProps} />);
    expect(screen.getByText(/2.*bed/)).toBeInTheDocument();
  });

  test('renders View Details button', () => {
    render(<PropertyCard {...mockProps} />);
    expect(screen.getByRole('button', { name: /View Details/i })).toBeInTheDocument();
  });

  test('calls onClick when View Details is clicked', async () => {
    const user = userEvent.setup();
    render(<PropertyCard {...mockProps} />);
    const detailsButton = screen.getByRole('button', { name: /View Details/i });
    await user.click(detailsButton);
    expect(mockProps.onClick).toHaveBeenCalled();
  });

  test('has draggable attribute', () => {
    const { container } = render(<PropertyCard {...mockProps} />);
    const card = container.querySelector('.property-card');
    expect(card).toHaveAttribute('draggable', 'true');
  });
});
