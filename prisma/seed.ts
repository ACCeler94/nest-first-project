import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

async function clearDatabase() {
  await db.order.deleteMany();
  await db.product.deleteMany();
  await db.client.deleteMany();
}

function getClients() {
  return [
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      name: 'Client 1',
      address: '123 Main St, City, Country',
    },
    {
      id: '6d7fce9a-8e85-4631-8e32-c667fe4f77d8',
      name: 'Client 2',
      address: '456 Maple Ave, City, Country',
    },
    {
      id: 'bd7a30e1-2f2e-4bbe-a335-2beabb1e6922',
      name: 'Client 3',
      address: '789 Oak Dr, City, Country',
    },
    {
      id: '3ad53abb-a2de-410f-a42d-6dfcc53b4462',
      name: 'Client 4',
      address: '321 Pine Ln, City, Country',
    },
  ];
}

function getProducts() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
      name: 'Canon EOS 50D',
      price: 2000,
      description: 'Cheap, ideal for beginners',
    },
    {
      id: 'c920c7b9-a67d-4edb-8ce7-e3c9f3889e56',
      name: 'Canon EOS 5D',
      price: 5000,
      description: 'Professional camera, solid build',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17258',
      name: 'Canon R',
      price: 3000,
      description: 'Professional camera, we technology',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17259',
      name: 'Nikon D50',
      price: 2000,
      description: 'Cheap, ideal for beginners',
    },
    {
      id: '01c7599d-318b-4b9f-baf7-51f3a936a2d4',
      name: 'Leica q2',
      price: 5000,
      description: 'Small, compact, innovative',
    },
  ];
}

function getOrders() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17260',
      clientId: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      productId: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17261',
      clientId: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      productId: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17262',
      clientId: '6d7fce9a-8e85-4631-8e32-c667fe4f77d8',
      productId: '01c7599d-318b-4b9f-baf7-51f3a936a2d4',
    },
  ];
}

async function seed() {
  await Promise.all(
    getClients().map((client) => {
      return db.client.create({ data: client });
    }),
  );

  await Promise.all(
    getProducts().map((product) => {
      return db.product.create({ data: product });
    }),
  );

  await Promise.all(
    getOrders().map(({ productId, clientId, ...orderData }) => {
      return db.order.create({
        data: {
          ...orderData,
          client: {
            connect: { id: clientId },
          },
          product: {
            connect: { id: productId },
          },
        },
      });
    }),
  );
}

seed();
