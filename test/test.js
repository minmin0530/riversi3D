var chai = require('chai');
var assert = chai.assert;

var Riversi = require('../src/riversi');
var riversi = new Riversi();

var myFunc = function(a, b){
    return a + b;
};

describe('テストのタイトル', function () {
  it('配列のテスト', function(){ assert.deepEqual( riversi.tipOver(0, 0, 0, 0),[ [ [0,-1], [-1,-1] ], [ [-1,-1], [-1,-1] ] ] ) });
//  var result = myFunc(3,3);
//  it('myFuncのテスト2', function(){ assert.strictEqual(result, 6) });
});
