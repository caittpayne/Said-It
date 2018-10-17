const request = require('request');
const server = require('../../src/server');
const base = 'http://localhost:3000/marco';

describe('marco', () => {
  describe('GET /marco', () => {
    it('should return status code 200', (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);

        done();
      })
    })
    it('should return the string polo', (done) => {
      request.get(base, (err, res, body) => {
        expect(res.body).toBe('polo');

        done();
      });
    });
  });
});
