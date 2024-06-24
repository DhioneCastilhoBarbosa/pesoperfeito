import {faker} from '@faker-js/faker'

export const tickets = Array.from({length:200}).map(()=>{
  return{
    ticketId: faker.number.int({min:10000, max:20000}),
    name: faker.person.fullName(),
    mrt: faker.number.int({min:20000, max:40000}),
    Produto:faker.commerce.productName(),
    operator:faker.person.fullName(),
    Plate: faker.vehicle.vrm(),
    data_hora:faker.date.anytime(),
    location: faker.location.streetAddress(),
    gross_weight: faker.number.float({max:2000}).toFixed(2),
    net_weight:faker.number.float({max:2000}).toFixed(2),
    tare:faker.number.float({max:10}).toFixed(2)
  }
})