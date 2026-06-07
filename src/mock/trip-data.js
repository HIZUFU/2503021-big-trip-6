const destinations = [
  {
    id: 'destination-1',
    name: 'Amsterdam',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=1',
        description: 'Amsterdam street view',
      },
    ],
  },
  {
    id: 'destination-2',
    name: 'Geneva',
    description: 'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=2',
        description: 'Geneva lake',
      },
    ],
  },
  {
    id: 'destination-3',
    name: 'Chamonix',
    description: 'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=3',
        description: 'Chamonix mountains',
      },
    ],
  },
];

const offers = [
  {
    id: 'offer-1',
    type: 'taxi',
    title: 'Order Uber',
    price: 20,
  },
  {
    id: 'offer-2',
    type: 'taxi',
    title: 'Add luggage',
    price: 30,
  },
  {
    id: 'offer-3',
    type: 'train',
    title: 'Add meal',
    price: 15,
  },
  {
    id: 'offer-4',
    type: 'train',
    title: 'Choose seats',
    price: 25,
  },
  {
    id: 'offer-5',
    type: 'bus',
    title: 'Switch to comfort class',
    price: 40,
  },
  {
    id: 'offer-6',
    type: 'flight',
    title: 'Add luggage',
    price: 50,
  },
];

const points = [
  {
    id: 'point-1',
    type: 'taxi',
    destinationId: 'destination-1',
    offerIds: ['offer-1', 'offer-2'],
    dateFrom: '2026-06-10T10:30:00.000Z',
    dateTo: '2026-06-10T11:00:00.000Z',
    basePrice: 160,
    isFavorite: false,
  },
  {
    id: 'point-2',
    type: 'train',
    destinationId: 'destination-2',
    offerIds: ['offer-3', 'offer-4'],
    dateFrom: '2026-06-11T12:25:00.000Z',
    dateTo: '2026-06-11T13:35:00.000Z',
    basePrice: 200,
    isFavorite: true,
  },
  {
    id: 'point-3',
    type: 'bus',
    destinationId: 'destination-3',
    offerIds: ['offer-5'],
    dateFrom: '2026-06-12T09:00:00.000Z',
    dateTo: '2026-06-12T11:40:00.000Z',
    basePrice: 90,
    isFavorite: false,
  },
];

export {destinations, offers, points};
