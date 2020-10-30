var Server = require('../index')
var expect    = require('chai').expect, sinon = require('sinon');


describe('Port check', function () {
  it('server', function() {
    const server = new Server(3000)
    expect(server.port).to.equal(3000);
  });
});