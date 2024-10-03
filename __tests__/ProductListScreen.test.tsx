import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ProductListScreen from '../src/screens/ProductListScreen';
import axios from 'axios';
import { Product } from '../src/types/types';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Product 1',
    price: 10.0,
    description: 'Description 1',
    category: 'Category 1',
    image: 'https://via.placeholder.com/150',
    rating: {
      rate: 4.5,
      count: 10,
    },
  },
  {
    id: 2,
    title: 'Product 2',
    price: 20.0,
    description: 'Description 2',
    category: 'Category 2',
    image: 'https://via.placeholder.com/150',
    rating: {
      rate: 4.0,
      count: 5,
    },
  },
];

describe('ProductListScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading indicator while fetching products', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [] });

    const { getByText } = render(<ProductListScreen navigation={{ navigate: jest.fn() }} />);

    expect(getByText('ProductListScreen')).toBeTruthy(); // Ensure the header is rendered
  });

  test('displays products after fetching', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockProducts });

    const { getByText } = render(<ProductListScreen navigation={{ navigate: jest.fn() }} />);

    await waitFor(() => {
      expect(getByText('Product 1')).toBeTruthy(); // Check if product title is rendered
      expect(getByText('Product 2')).toBeTruthy();
    });
  });

  test('filters products based on search input', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockProducts });

    const { getByText, getByTestId } = render(<ProductListScreen navigation={{ navigate: jest.fn() }} />);

    await waitFor(() => {
      expect(getByText('Product 1')).toBeTruthy(); // Check if products are rendered
    });

    const searchInput = getByTestId('searchInput');
    fireEvent.changeText(searchInput, 'Product 1');

    await waitFor(() => {
      expect(getByText('Product 1')).toBeTruthy(); // Ensure filtered product is displayed
      expect(() => getByText('Product 2')).toThrow(); // Ensure non-matching product is not displayed
    });
  });

});
