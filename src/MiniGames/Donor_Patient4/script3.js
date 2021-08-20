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

myGraph1.addLink(0, 1, FRIEND, '', true);
myGraph1.addLink(2, 3, FRIEND, '', true);
myGraph1.addLink(4, 5, FRIEND, '', true);
myGraph1.addLink(6, 7, FRIEND, '', true);
myGraph1.addLink(8, 9, FRIEND, '', true);

myGraph1.addLink(0, 3, '', 8);
myGraph1.addLink(2, 1, '', 8);
myGraph1.addLink(2, 5, '', 6);
myGraph1.addLink(4, 3, '', 8);
myGraph1.addLink(4, 7, '', 6);
myGraph1.addLink(6, 9, '', 8);
myGraph1.addLink(8, 3, '', 8);
myGraph1.addLink(8, 5, '', 6);

myGraph1.answer = [
  [
    [2, 1],
    [1, 0],
    [0, 3],
    [3, 2],
  ],
  [
    [4, 7],
    [7, 6],
    [6, 9],
    [9, 8],
    [8, 5],
    [5, 4],
  ],
]

let graphs = [myGraph1];
export { graphs };
