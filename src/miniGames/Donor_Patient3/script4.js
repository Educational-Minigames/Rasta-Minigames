import { MyGraph } from '../../components/Graph2';

const HEALTHY = '#2fff00';
const PATIENT = '#cc3d3d';
const FRIEND = '#cccccc';

const myGraph1 = new MyGraph({ name: 'Graph-0', hoverOpacity: 0.3 });
myGraph1.addNewNode(PATIENT);
myGraph1.addNewNode(HEALTHY);
myGraph1.addNewNode(PATIENT);
myGraph1.addNewNode(HEALTHY);
myGraph1.addNewNode(PATIENT);
myGraph1.addNewNode(HEALTHY);
myGraph1.addNewNode(PATIENT);
myGraph1.addNewNode(HEALTHY);
myGraph1.addNewNode(PATIENT);
myGraph1.addNewNode(HEALTHY);
myGraph1.addNewNode(PATIENT);
myGraph1.addNewNode(HEALTHY);
myGraph1.addNewNode(PATIENT);
myGraph1.addNewNode(HEALTHY);
myGraph1.addNewNode(PATIENT);
myGraph1.addNewNode(HEALTHY);
myGraph1.addNewNode(PATIENT);
myGraph1.addNewNode(HEALTHY);
myGraph1.addNewNode(PATIENT);
myGraph1.addNewNode(HEALTHY);

myGraph1.addLink(0, 1, FRIEND, '', true);
myGraph1.addLink(2, 3, FRIEND, '', true);
myGraph1.addLink(4, 5, FRIEND, '', true);
myGraph1.addLink(6, 7, FRIEND, '', true);
myGraph1.addLink(8, 9, FRIEND, '', true);
myGraph1.addLink(10, 11, FRIEND, '', true);
myGraph1.addLink(12, 13, FRIEND, '', true);
myGraph1.addLink(14, 15, FRIEND, '', true);
myGraph1.addLink(16, 17, FRIEND, '', true);
myGraph1.addLink(18, 19, FRIEND, '', true);

myGraph1.addLink(0, 3, '', 8);

myGraph1.addLink(2, 1, '', 8);

myGraph1.addLink(4, 3, '', 8);
myGraph1.addLink(4, 9, '', 6);
myGraph1.addLink(4, 7, '', 4);

myGraph1.addLink(6, 5, '', 8);
myGraph1.addLink(6, 9, '', 6);

myGraph1.addLink(8, 7, '', 8);

myGraph1.addLink(10, 5, '', 8);
myGraph1.addLink(10, 19, '', 6);

myGraph1.addLink(12, 15, '', 8);
myGraph1.addLink(12, 17, '', 6);

myGraph1.addLink(14, 11, '', 8);
myGraph1.addLink(14, 5, '', 6);
myGraph1.addLink(14, 17, '', 4);

myGraph1.addLink(16, 3, '', 8);
myGraph1.addLink(16, 11, '', 6);
myGraph1.addLink(16, 15, '', 4);

myGraph1.addLink(18, 11, '', 8);

myGraph1.answer = [
  [
    [0, 3],
    [3, 2],
    [2, 1],
    [1, 0],
  ],
  [
    [4, 9],
    [9, 8],
    [8, 7],
    [7, 6],
    [6, 5],
    [5, 4],
  ],
  [
    [10, 19],
    [19, 18],
    [18, 11],
    [11, 10],
  ],
  [
    [12, 15],
    [15, 14],
    [14, 17],
    [17, 16],
    [16, 13],
    [13, 12],
  ],
]

let graphs = [myGraph1];
export { graphs };
