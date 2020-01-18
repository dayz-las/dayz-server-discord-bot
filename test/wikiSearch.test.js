const { searchItemInWiki, convertStringToUrl } = require('../src/wiki/search');

describe('Search a item in dayz wiki', () => {
    test('search', () => {
        expect(searchItemInWiki(['Ghillie Suit'])).toBe(3);
    });

    test('Convert item name to url', () => {
        expect(convertStringToUrl('Ghillie Suit')).toEqual(expect.stringMatching('_'));
    });
});