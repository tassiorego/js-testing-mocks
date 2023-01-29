const { rejects, deepStrictEqual} = require('assert');
const { error } = require('./src/constants');
const File = require('./src/file');

// const result = await File.csvToJson('./../_mocks/fourItems-invalid.csv');
// const result = await File.csvToJson('./../_mocks/invalid-header.csv');

;
(async () => {
  {
    // the file should have id, name, profession and age fields
    const filePath = './_mocks/invalid-header.csv'
    const rejection = new Error(error.FILE_FIELDS_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);

    await rejects(result, rejection);
  }

  {
    // the file should have 1, 2 or 3 lines
    const filePath = './_mocks/fourItems-invalid.csv'
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);

    await rejects(result, rejection);
  }

  {

    const filePath = './_mocks/threeItems-valid.csv'
    const result = await File.csvToJson(filePath);

    const expected = [
      {
        "name": "Tassio Rego",
        "id": 123,
        "profession": "Javascript Instructor",
        "birthDay": 1994
      },
      {
        "name": "Fulano de Tal",
        "id": 321,
        "profession": "Javascript Expert",
        "birthDay": 1983
      },
      {
        "name": "Jhonh Smitch",
        "id": 432,
        "profession": "Java Developer",
        "birthDay": 1993
      }
    ]

    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }

})();