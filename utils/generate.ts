import { faker } from '@faker-js/faker';
import type { Product } from '~/models/models';
import { path } from './path'

export const generateFakeProduct = (): Product => {
    const hasOldPrice = faker.datatype.boolean();
    const newPrice = parseInt(faker.commerce.price({min: 100, max: 100000}));
    const oldPrice = hasOldPrice ? newPrice + parseInt(faker.commerce.price({min: 10, max: 10000})) : 0;
    const id = faker.number.int({min: 10, max:10000})
    
    return {
        id: id,
        image: faker.image.url(),
        newPrice: newPrice,
        oldPrice: oldPrice ? oldPrice : 0,
        brand: faker.company.name(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        url: path.products + '/' + id,
    };
};