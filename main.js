'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Whenever movePiece() executes it will move the choosen block from one stack to another. Although, in order for a block to move isLegal needs to be true, otherwise it will let the user know their move is invalid and ask them to try again.
const movePiece = (startStack, endStack) => {
  if (isLegal(startStack, endStack) === true ) {
    let removed = stacks[startStack].pop();
    return stacks[endStack].push(removed);
  } 
  else if (isLegal(startStack, endStack) === false) 
  {
    console.log("Move is not valid! You can not stack a larger block on top of a smaller one.");
    console.log("Try Again");
  }
}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
// isLegal() checks if the move the user makes is valid.
const isLegal = (startStack, endStack) => {
  // if the user moves a block to a stack that is empty it will return true. The move is valid.
  if (stacks[endStack][stacks[endStack].length - 1] === undefined)
  {
    return true;
  }
  // if the block the user is moving is smaller than the block in the stack they are moving it to, it will return true. The move is valid.
  if (stacks[startStack][stacks[startStack].length - 1] < stacks[endStack][stacks[endStack].length - 1]) {
    return true;
  } 
  // Finally, if the block the user is moving is larger than the block in the stack they are trying to move it to, it will return false, The move is invalid.
  else if (stacks[startStack][stacks[startStack].length - 1] > stacks[endStack][stacks[endStack].length - 1]) {
    return false;
  }

}

// What is a win in Towers of Hanoi? When should this function run?
// checkForWin() will return true if stack b or stack c equal the winningArray. 
// If so, the user wins.
const checkForWin = () => {
  const winningArray = [4, 3, 2, 1];

  for (let i = 0; i < winningArray.length; i++) {
    if(stacks.b.length === winningArray.length || stacks.c.length === winningArray.length) {
      return true;
    } else {
      return false;
    }
  }
}

// When is this function called? What should it do with its argument?
// towerOfHanoi will take the user's input and figure out which stacks they picked.
const towersOfHanoi = (startStack, endStack) => {
  if (startStack === 'a' && endStack === 'b') {
    console.log(`You have picked stack ${startStack} & ${endStack}`);
  }
  else if (startStack === 'a' && endStack === 'c') {
    console.log(`You have picked stack ${startStack} & ${endStack}`);
  }
  else if (startStack === 'b' && endStack === 'a') {
    console.log(`You have picked stack ${startStack} & ${endStack}`);
  }
  else if (startStack === 'b' && endStack === 'c') {
    console.log(`You have picked stack ${startStack} & ${endStack}`);
  }
  else if (startStack === 'c' && endStack === 'a') {
    console.log(`You have picked stack ${startStack} & ${endStack}`);
  }
  else if (startStack === 'c' && endStack === 'b') {
    console.log(`You have picked stack ${startStack} & ${endStack}`);
  }
  // runs through all of the functions.
  isLegal(startStack, endStack);
  movePiece(startStack, endStack);
  checkForWin();
}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      // getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
