import { MyGraph } from '../../components/Graph';

const myGraph1 = new MyGraph('Graph-1');
myGraph1.addNewNode('blue');
myGraph1.addNewNode('blue');
myGraph1.addNewNode('blue');
myGraph1.addNewNode('blue');
myGraph1.addNewNode('blue');
myGraph1.addNewNode('blue');
myGraph1.addNewNode('blue');

myGraph1.addNewNode('red');
myGraph1.addNewNode('red');
myGraph1.addNewNode('red');
myGraph1.addNewNode('red');
myGraph1.addNewNode('red');
myGraph1.addNewNode('red');
myGraph1.addNewNode('red');
myGraph1.addNewNode('red');

myGraph1.addLink(0, 9);
myGraph1.addLink(0, 13);
myGraph1.addLink(1, 7);
myGraph1.addLink(1, 8);
myGraph1.addLink(1, 11);
myGraph1.addLink(1, 12);
myGraph1.addLink(1, 14);
myGraph1.addLink(2, 9);
myGraph1.addLink(3, 9);
myGraph1.addLink(4, 8);
myGraph1.addLink(4, 10);
myGraph1.addLink(4, 12);
myGraph1.addLink(5, 9);
myGraph1.addLink(5, 12);
myGraph1.addLink(5, 14);
myGraph1.addLink(6, 12);
myGraph1.addLink(6, 14);

let graphs = [myGraph1];
export { graphs };
