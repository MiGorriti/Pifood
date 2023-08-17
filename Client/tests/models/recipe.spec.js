const { Recipe, Diet, conn } = require('../../src/db.js');


describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if title is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid title', () => {
        Recipe.create({ name: 'Milanesa a la napolitana' });
      });
      it('should work when its a valid spoonacularScore', () => {
        Recipe.create({ spoonacularScore: 50 });
      });
      it('should work when its a valid spoonacularScore', () => {
        Recipe.create({ healthScore: 12 });
      });
    });
  });
});


describe('Diet model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Diet.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid name for type of recipe')))
          .catch(() => done());
      });
      it('should work when its a valid type of recipe', () => {
        Recipe.create({ name: 'vegan' });
      });
    });
  });
});
