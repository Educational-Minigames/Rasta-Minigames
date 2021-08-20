import shuffle from 'lodash.shuffle';

import { MyGraph } from '../../components/Graph3';

const MY_COLOR = '#2eff00';
const PURPLE = 'purple';
const BROWN = 'brown';
const BLUE = 'blue';
const YELLOW = 'yellow';
const GREEN = 'green';
const GREY = 'grey';
const RED = 'red';
const numbers = shuffle([0, 1, 2, 3, 4]);

let colorAndNumber = [
  {
    color: PURPLE,
    number: numbers[0],
  },
  {
    color: BROWN,
    number: numbers[1],
  },
  {
    color: BLUE,
    number: numbers[2],
  },
  {
    color: YELLOW,
    number: numbers[3],
  },
  {
    color: GREEN,
    number: numbers[4],
  },
];


const myGraph1 = new MyGraph({ name: 'Graph-Defusing-Bomb' });
myGraph1.addNewNode(MY_COLOR);
myGraph1.addNewNode();
myGraph1.addNewNode();
myGraph1.addNewNode();
myGraph1.addNewNode();
myGraph1.addNewNode();
myGraph1.addNewNode();
myGraph1.addNewNode();

myGraph1.addLink(1, 2, GREY, 10, true);
myGraph1.addLink(2, 3, GREY, 10, true);
myGraph1.addLink(3, 4, GREY, 10, true);
myGraph1.addLink(4, 5, GREY, 10, true);
myGraph1.addLink(5, 6, GREY, 10, true);

// node1
myGraph1.addLongLink(1, 7, BROWN);
myGraph1.addLongLink(1, 7, BLUE);
myGraph1.addLongLink(1, 8, YELLOW);
myGraph1.addLongLink(1, 8, GREEN);
//node2
myGraph1.addLongLink(2, 7, PURPLE);
myGraph1.addLongLink(2, 7, YELLOW);
myGraph1.addLongLink(2, 8, BLUE);
myGraph1.addLongLink(2, 8, BROWN);
//node3
myGraph1.addLongLink(3, 7, PURPLE);
myGraph1.addLongLink(3, 7, GREEN);
myGraph1.addLongLink(3, 7, BLUE);
myGraph1.addLongLink(3, 7, BROWN);
//node4
myGraph1.addLongLink(4, 8, PURPLE);
myGraph1.addLongLink(4, 8, YELLOW);
myGraph1.addLongLink(4, 8, GREEN);
myGraph1.addLongLink(4, 8, BROWN);
//node5
myGraph1.addLongLink(5, 7, BLUE);
myGraph1.addLongLink(5, 7, PURPLE);
myGraph1.addLongLink(5, 8, GREEN);
myGraph1.addLongLink(5, 8, YELLOW);



let graphs = [myGraph1];


const helperTable = [
  [
    [colorAndNumber[3].number, colorAndNumber[4].number],
    [colorAndNumber[0].number],
    [colorAndNumber[2].number, colorAndNumber[1].number],
  ],
  [
    [colorAndNumber[2].number, colorAndNumber[1].number],
    [colorAndNumber[4].number],
    [colorAndNumber[3].number, colorAndNumber[0].number],
  ],
  [
    [],
    [colorAndNumber[3].number],
    [colorAndNumber[0].number, colorAndNumber[1].number, colorAndNumber[2].number, colorAndNumber[4].number],
  ],
  [
    [colorAndNumber[0].number, colorAndNumber[1].number, colorAndNumber[3].number, colorAndNumber[4].number],
    [colorAndNumber[2].number],
    [],
  ],
  [
    [colorAndNumber[3].number, colorAndNumber[4].number],
    [colorAndNumber[1].number],
    [colorAndNumber[2].number, colorAndNumber[0].number],
  ],
]

const getNextState = (currentState, inputNumber) => {
  const help = helperTable[currentState];
  inputNumber = parseInt(inputNumber - 1);
  if (help[0].includes(inputNumber)) return 7;
  if (help[1].includes(inputNumber)) return currentState + 1;
  if (help[2].includes(inputNumber)) return 6;
}

export { graphs, getNextState };
