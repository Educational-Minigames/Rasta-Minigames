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
myGraph1.addNewNode('red');

myGraph1.addLink(0, 10);
myGraph1.addLink(0, 16);
myGraph1.addLink(1, 9);
myGraph1.addLink(1, 12);
myGraph1.addLink(2, 11);
myGraph1.addLink(2, 13);
myGraph1.addLink(2, 14);
myGraph1.addLink(3, 9);
myGraph1.addLink(3, 12);
myGraph1.addLink(4, 10);
myGraph1.addLink(4, 16);
myGraph1.addLink(5, 14);
myGraph1.addLink(5, 15);
myGraph1.addLink(5, 18);
myGraph1.addLink(6, 9);
myGraph1.addLink(6, 12);
myGraph1.addLink(7, 13);
myGraph1.addLink(7, 17);
myGraph1.addLink(7, 18);
myGraph1.addLink(8, 10);
myGraph1.addLink(8, 16);














let graphs = [myGraph1];
export { graphs };
