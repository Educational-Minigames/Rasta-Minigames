import { MyGraph } from '../../components/Graph';

const myGraph1 = new MyGraph({ name: 'Graph-1' });
myGraph1.addNewNode('blue');
myGraph1.addNewNode('blue');
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
myGraph1.addNewNode('red');

myGraph1.addLink(0, 9);
myGraph1.addLink(1, 9);
myGraph1.addLink(1, 10);
myGraph1.addLink(2, 9);
myGraph1.addLink(3, 10);
myGraph1.addLink(4, 9);
myGraph1.addLink(4, 11);
myGraph1.addLink(5, 10);
myGraph1.addLink(5, 11);
myGraph1.addLink(5, 12);
myGraph1.addLink(6, 11);
myGraph1.addLink(6, 13);
myGraph1.addLink(6, 16);
myGraph1.addLink(7, 10);
myGraph1.addLink(7, 14);
myGraph1.addLink(7, 16);
myGraph1.addLink(8, 14);
myGraph1.addLink(8, 15);
myGraph1.addLink(8, 17);

let graphs = [myGraph1];
export { graphs };
