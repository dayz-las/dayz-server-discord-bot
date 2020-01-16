const { sayHello } = require('../src/discord/memberAdd');

test('two plus two is four', () => {
    expect(sayHello).toMatch('/Bienvenido/');
});