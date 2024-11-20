import { faker } from '@faker-js/faker';

interface Ticket {
  ticketId: string;
  cliente: string;
  MTR: number;
  produto: string;
  operador: string;
  placa: string;
  dataHora: string;
  local: string;
  pesoBruto: string;
  pesoLiquido: string;
  tara: string;
}

const formatDate = (date: Date): string => {
  return date.toISOString().split('.')[0].replace('T', ' ');
}

export const tickets: Ticket[] = Array.from({ length: 200 }).map((): Ticket => {
  return {
    ticketId: faker.number.int({ min: 10000, max: 20000 }).toString(),
    cliente: `${faker.person.firstName()} ${faker.person.lastName()}`,
    MTR: faker.number.int({ min: 20000, max: 40000 }),
    produto: faker.commerce.product(),
    operador: `${faker.person.firstName()} ${faker.person.lastName()}`,
    placa: faker.vehicle.vrm(),
    dataHora: formatDate(faker.date.anytime()),
    local: faker.location.streetAddress(),
    pesoBruto: faker.number.float({ max: 2000 }).toFixed(2),
    pesoLiquido: faker.number.float({ max: 2000 }).toFixed(2),
    tara: faker.number.float({ max: 10 }).toFixed(2)
  };
});

// Ordenar os tickets pela data e hora mais recente
tickets.sort((a, b) => new Date(b.dataHora).getTime() - new Date(a.dataHora).getTime());

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
    const ticketDate = new Date(ticket.dataHora);
    return ticketDate >= startDate && ticketDate <= endDate;
  });
}