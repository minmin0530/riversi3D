const C = 2;
const addx = [1,  1,  1,  1,  1,  1,  1,  1,  1,    0,  0,  0,  0,  0,  0,  0,  0,     -1, -1, -1, -1, -1, -1, -1, -1, -1];
const addy = [1,  1,  1,  0,  0,  0, -1, -1, -1,    1,  1,  1,  0,  0, -1, -1, -1,      1,  1,  1,  0,  0,  0, -1, -1, -1];
const addz = [1,  0, -1,  1,  0, -1,  1,  0, -1,    1,  0, -1,  1, -1,  1,  0, -1,      1,  0, -1,  1,  0, -1,  1,  0, -1];
    
const rangex = [-1, -1, -1, -1, -1, -1, -1, -1, -1,    C,  C,  C,  C,  C,  C,  C,  C,   C,  C,  C,  C,  C,  C,  C,  C,  C];
const rangey = [-1, -1, -1,  C,  C,  C,  C,  C,  C,   -1, -1, -1,  C,  C,  C,  C,  C,  -1, -1, -1,  C,  C,  C,  C,  C,  C];
const rangez = [-1,  C,  C, -1,  C,  C, -1,  C,  C,   -1,  C,  C, -1,  C, -1,  C,  C,  -1,  C,  C, -1,  C,  C, -1,  C,  C];

class Riversi {
  constructor() {
    this.field = [];
    for (let z = - C/2; z < C/2; z++) {  var yyy = [];
    for (let y = - C/2; y < C/2; y++) {  var xxx = [];
    for (let x = - C/2; x < C/2; x++) {
      xxx.push(-1);
    } yyy.push(xxx);
    } this.field.push(yyy);
    }
  }
  tipOver(turn, x, y, z) {
    this.field[z][y][x] = turn;
    for (var v = 0; v < 26; ++v) {
      for (var xx = x - addx[v], yy = y - addy[v], zz = z - addz[v]; xx != rangex[v] && yy != rangey[v] && zz != rangez[v]; xx -= addx[v], yy -= addy[v], zz -= addz[v]) {
        var breakFlag = false;
        if (this.field[zz][yy][xx] == turn) {
          for (var nonex = xx, noney = yy, nonez = zz; (nonex != x || addx[v] == 0) && (noney != y || addy[v] == 0) && (nonez != z || addz[v] == 0); nonex += addx[v], noney += addy[v], nonez += addz[v] ) {
            if (this.field[nonez][noney][nonex] == -1) {
              breakFlag = true;
              break;
  	    }
  	  }
          if (breakFlag) {
            break;
  	  }
          for (var xxx = x, yyy = y, zzz = z; (xxx != xx || addx[v] == 0) && (yyy != yy || addy[v] == 0) && (zzz != zz || addz[v] == 0); xxx -= addx[v], yyy -= addy[v], zzz -= addz[v]) {
            this.field[zzz][yyy][xxx] = turn;
  	  }  
          break;
        }
      }
    }
    return this.field;
  }
};
module.exports = Riversi;
