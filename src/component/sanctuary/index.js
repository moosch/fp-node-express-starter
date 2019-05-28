import { create, env } from 'sanctuary';

const S = create({
  checkTypes: process.env.NODE_ENV !== 'production',
  env: [],
});

export default S;
