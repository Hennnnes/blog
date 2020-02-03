const File = require('../helpers/file');

test('gets files content', () => {
  expect(await File.getFileContent()).toBe(3);
});