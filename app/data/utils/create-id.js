import slug from 'slug';

export default (value) => {
  if (!value) throw new Error('An identifier value is required.');
  const id = slug(value);
  if (!id) throw new Error(`Unable to generate and ID value for ${value}`);
  return id;
};
