process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const expect = chai.expect;

describe('summation check', () => {
  it('should pass correctly', (done) => {
    let first = 23;
    let second = 12;
    let sum = first + second;
    expect(sum).to.be.equal(23 + 12);
    done();
  });  
});