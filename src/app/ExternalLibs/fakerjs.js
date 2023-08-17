import { faker } from "@faker-js/faker";

export function createRandomUser() {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
    company: faker.company.name(),
  };
}

export const userNumbers = (x_number) => {
  const options = {
    count: x_number,
  };
  return faker.helpers.multiple(createRandomUser, options);
};
