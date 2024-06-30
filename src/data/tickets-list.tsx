import { faker } from '@faker-js/faker';

interface Ticket {
  ticketId: number;
  name: string;
  mrt: number;
  Produto: string;
  operator: string;
  Plate: string;
  data_hora: string;
  location: string;
  gross_weight: string;
  net_weight: string;
  tare: string;
}

const formatDate = (date: Date): string => {
  return date.toISOString().split('.')[0].replace('T', ' ');
}

export const tickets: Ticket[] = Array.from({ length: 200 }).map((): Ticket => {
  return {
    ticketId: faker.number.int({ min: 10000, max: 20000 }),
    name: `${faker.person.firstName()} ${faker.person.lastName()}`,
    mrt: faker.number.int({ min: 20000, max: 40000 }),
    Produto: faker.commerce.product(),
    operator: `${faker.person.firstName()} ${faker.person.lastName()}`,
    Plate: faker.vehicle.vrm(),
    data_hora: formatDate(faker.date.anytime()),
    location: faker.location.streetAddress(),
    gross_weight: faker.number.float({ max: 2000 }).toFixed(2),
    net_weight: faker.number.float({ max: 2000 }).toFixed(2),
    tare: faker.number.float({ max: 10 }).toFixed(2)
  };
});

// Ordenar os tickets pela data e hora mais recente
tickets.sort((a, b) => new Date(b.data_hora).getTime() - new Date(a.data_hora).getTime());

export function paginate(array: Ticket[], pageSize: number): Ticket[][] {
  return array.reduce((acc: Ticket[][], val: Ticket, i: number) => {
    let idx = Math.floor(i / pageSize);
    let page = acc[idx] || (acc[idx] = []);
    page.push(val);

    return acc;
  }, []);
}


export function filterByDate(array: Ticket[], startDate: Date, endDate: Date): Ticket[] {
  return array.filter(ticket => {
    const ticketDate = new Date(ticket.data_hora);
    return ticketDate >= startDate && ticketDate <= endDate;
  });
}