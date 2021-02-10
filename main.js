'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// we need a starting point and ending point
const movePiece = (startStack, endStack) => {
  // First we need to remove the end off of the start stack with the pop method
    let move = stacks[startStack].pop();
  // next we need to push the piece we're holding onto one of the other two stacks with the push method
    stacks[endStack].push(move);
}

// before a move can be initiated, we need to check that the move does not break any of the game's rules
const isLegal = (startStack, endStack) => {
  // This line will determine that we are removing a piece from a stack that actually has pieces
    if (stacks[startStack].length > 0) {
    // now we can easily place any piece on an empty stack0
        if (stacks[endStack].length == 0) {
            return true;
        }    
    // now we need to make sure the piece on the endStack is larger than the piece we are moving with the slice method
        if (stacks[endStack].slice(-1) > stacks[startStack].slice(-1)) {
            return true;0
        }
    // if we do not meet either of the first two logical equations, we can determine that the move is illegal
        else return false;
    }
}

// before we can accept the next move, we need to make sure the game is not already complete
// the only solution that constitutes a win is having all four blocks in the C stack or B stack in order [4,3,2,1]
// We can already rule out whether their order will be correct due to out isLegal() above so we can now assume
// that if all 4 are in one column that they are legal and constitute a win
const checkForWin = () => {
    if ((stacks['b'].length == 4) || (stacks['c'].length == 4)) {
        return true;
    }
    else return false;
}

// the order in which we run the above functions is important
// first we must determine if the requested move is legal. If true, we will move to the next function
// next we make the move after determining that it is legal
// lastly, we check to see if the player has won before allowing the next move
const towersOfHanoi = (startStack, endStack) => {
    if (isLegal(startStack, endStack)) {
        movePiece(startStack, endStack);
    // after moving the piece, immediately move into a checkForWin
        if (checkForWin()) {
            console.log("Winner winner chicken dinner!!");
            return true;
        }
        else return false;
    }
    else return false;
}


// ! These did not work. The checkForWin function needs to solely remain within the towersOfHanoi function or it will not run properly
// whenever checkForWin is run within another function like towersOfHanoi and returns TRUE, it will run through this if statement to return a console log
// if (checkForWin == true) {
//     console.log("Congrats! You have defeated Towers of Hanoi!")
// }

// whenever a move is determined to be illegal, this if statement will return the appropriate console log.
// if (isLegal == false) {
//     console.log("That is not a legal move. Please try again.")
// }

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

getPrompt();