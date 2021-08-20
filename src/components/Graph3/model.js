
import makeId from '../../utils/makeId';
const MAXIMUM_NUMBER_OF_NODES = 20;

class Node {
  neighborsId = [];
  isSelected = false;
  isVisible = true;
  rerender = () => { }

  constructor({ id, color = 'white', isVisible = true }) {
    this.color = color;
    this.id = id;
    this.isVisible = isVisible;
  }

  addNeighbor(nodeId) {
    if (this.neighborsId.includes(nodeId)) {
      console.log('This node has already this neighbor.');
      return;
    }
    this.neighborsId.push(nodeId);
    this.rerender();
  }

  getIsVisible() {
    return this.isVisible;
  }

  removerNeighbor(nodeId) {
    if (!this.neighborsId.includes(nodeId)) {
      console.log('This node doesn\'t have this neighbor.');
      return;
    }
    this.neighbors = this.neighborsId.filter((neighbor) => {
      neighbor != nodeId
    });
    this.rerender();
  }

  setRerender(rerender) {
    this.rerender = rerender;
  }

  changeSelection() {
    this.isSelected = !this.isSelected;
    this.rerender();
  }

  setColor(color) {
    this.color = color;
    this.rerender();
  }

  selectNode() {
    this.isSelected = true;
    this.rerender();
  }

  unselectNode() {
    this.isSelected = false;
    this.rerender();
  }

  getIsSelected() {
    return this.isSelected;
  }

  getColor() {
    return this.color;
  }

  export() {
    return ({
      id: this.id,
      isSelected: this.isSelected,
      getIsVisible: this.getIsVisible.bind(this),
      changeSelection: this.changeSelection.bind(this),
      getIsSelected: this.getIsSelected.bind(this),
      getColor: this.getColor.bind(this),
      setRerender: this.setRerender.bind(this),
    })
  }
}

class Link {
  isSelected = false;
  disabled = false;
  isAnswer = false;

  rerender = () => { }

  constructor({ node1Id, node2Id, color, thickness, disabled }) {
    this.source = Math.min(node1Id, node2Id);
    this.target = Math.max(node1Id, node2Id);
    this.color = color;
    this.thickness = thickness;
    this.disabled = disabled;
  }

  setRerender(rerender) {
    this.rerender = rerender;
  }

  selectLink() {
    this.isSelected = true;
    this.rerender();
  }

  unselectLink() {
    this.isSelected = false;
    this.rerender();
  }

  changeSelection() {
    this.isSelected = !this.isSelected;
    this.rerender();
  }

  setColor(color) {
    this.color = color;
    this.rerender();
  }

  getIsSelected() {
    return this.isSelected;
  }

  getColor() {
    return this.color;
  }

  setIsAnswer(value) {
    this.isAnswer = value;
    this.rerender();
  }

  getIsAnswer() {
    return this.isAnswer;
  }

  export() {
    return ({
      source: this.source,
      target: this.target,
      disabled: this.disabled,
      thickness: this.thickness,
      changeSelection: this.changeSelection.bind(this),
      getIsAnswer: this.getIsAnswer.bind(this),
      getIsSelected: this.getIsSelected.bind(this),
      getColor: this.getColor.bind(this),
      setRerender: this.setRerender.bind(this),
    })
  }
}

export class MyGraph {
  initialNodeId = 1;
  hoverOpacity = 1;
  answer = [];
  nodes = [];
  links = [];

  constructor({ name, hoverOpacity }) {
    this.name = name;
    this.hoverOpacity = hoverOpacity;
  }

  addNewNode(color, id, isVisible) {
    const tmpId = id ? id : this.initialNodeId
    const node = new Node({ id: tmpId, color, isVisible });
    this.nodes.push(node);
    console.log(`New node ${tmpId} added!`);
    if (!id) this.initialNodeId++;
    return true;
  }

  removeNode(nodeId) {
    this.nodes = this.nodes.filter((node) => node.id != nodeId);
    console.log('Node removed successfully.');
    return true;
  }

  getNode(nodeId) {
    const tmp = this.nodes.filter((node) => node.id == nodeId);
    return tmp ? tmp[0] : {};
  }

  getLink(node1Id, node2Id) {
    const tmp = this.links.filter((link) => link.source == Math.min(node1Id, node2Id) && link.target == Math.max(node1Id, node2Id));
    return tmp ? tmp[0] : {};
  }

  addLink(node1Id, node2Id, color, thickness, disabled) {
    const tmp = this.links.filter((link) =>
      (link.source == Math.min(node1Id, node2Id) && link.target == Math.max(node1Id, node2Id))
    ) || []
    if (tmp.length == []) {
      this.links.push(new Link({ node1Id, node2Id, color, thickness, disabled }));
      console.log("Link added successfully!");
      return true;
    } else {
      console.log("Link already exists.");
      return false;
    }
  }

  addLongLink(node1Id, node2Id, color, thickness = 5) {
    const betweenNodesNumber = 1;
    let lastNodeId = node1Id;
    for (let i = 0; i < betweenNodesNumber; i++) {
      this.addNewNode('', '', false);
      this.addLink(lastNodeId, this.initialNodeId - 1, color, thickness, true);
      lastNodeId = this.initialNodeId - 1;
    }
    this.addLink(lastNodeId, node2Id, color, thickness, true);
  }


  removeLink(node1Id, node2Id) {
    const tmp = this.links.forEach((link) =>
      (link.source == Math.min(node1Id, node2Id) && link.target == Math.max(node1Id, node2Id))
    )
    if (tmp.length > 0) {
      this.links = this.links.forEach((link) =>
        (link.source != Math.min(node1Id, node2Id) || link.target != Math.max(node1Id, node2Id))
      )
      console.log("Link removed successfully!");
      return true;
    } else {
      console.log('Link doesn\'t exist.');
      return false;
    }
  }

  getSelectedNodes() {
    return this.nodes.filter((node) => node.isSelected);
  }

  getSelectedLinks() {
    return this.links.filter((link) => link.isSelected);
  }

  addLinksBetweenSelectedNodes() {
    const selectedNodes = this.getSelectedNodesId();
    for (let i = 0; i < selectedNodes.length; i++) {
      for (let j = i + 1; j < selectedNodes.length; j++) {
        this._addLink(selectedNodes[i].id, selectedNodes[j].id)
      }
    }
    console.log('Links added successfully!');
  }

  removeLinksBetweenSelectedNodes() {
    const selectedNodes = this.getSelectedNodesId();
    for (let i = 0; i < selectedNodes.length; i++) {
      for (let j = i + 1; j < selectedNodes.length; j++) {
        this._removeLink(selectedNodes[i].id, selectedNodes[j].id);
      }
    }
    console.log('Links removed successfully!');
  }

  exportData() {
    let data = {
      nodes: [],
      links: []
    }
    this.nodes.forEach((node) => data.nodes.push(node.export()));
    this.links.forEach((link) => data.links.push(link.export()));
    return data;
  }

  getNeighborsId(nodeId) {
    return this.links
      .filter((link) => link.source == nodeId || link.target == nodeId)
      .map((link) => {
        if (link.source == nodeId) return link.target;
        return link.source;
      })
  }

  doesNodeConnectAnySelectedEdge(nodeId) {
    let result = false;
    this.getSelectedLinks().forEach((link) => {
      if (link.source == nodeId || link.target == nodeId) {
        result = [link.source, link.target];
      }
    })
    return result;
  }

  augmentingPath = [];

  dfs(nodeId, mark, parent, length) {
    if (mark[nodeId] === true) return;
    mark[nodeId] = true;

    for (let i of this.getNeighborsId(nodeId)) {
      const link = this.doesNodeConnectAnySelectedEdge(i);
      if (mark[i])
        continue;

      if (link != false) {
        const otherNode = link[0] == i ? link[1] : link[0];
        parent[i] = nodeId;
        mark[i] = true;
        parent[otherNode] = i;
        this.dfs(otherNode, mark, parent, length + 2);
      } else {
        this.augmentingPath = [i];
        let tmpId = nodeId;
        while (tmpId != -1) {
          this.augmentingPath.push(tmpId);
          tmpId = parent[tmpId];
        }
        return;
      }
    }
    mark[nodeId] = false;
    if (parent[nodeId] != -1) mark[parent[nodeId]] = false;
  }

  findAugmentingPath() {
    this.augmentingPath = []
    for (let i = 0; i < this.nodes.length; i++) {
      let mark = new Array(MAXIMUM_NUMBER_OF_NODES);
      let parent = new Array(MAXIMUM_NUMBER_OF_NODES);
      if (!this.doesNodeConnectAnySelectedEdge(i)) {
        let id = this.nodes[i].id;
        parent[id] = -1;
        this.dfs(id, mark, parent, 0, -1);
      }
    }
    return this.augmentingPath;
  }

  isMatchingValid() {
    let mark = new Array(MAXIMUM_NUMBER_OF_NODES);
    let result = true;
    this.getSelectedLinks().forEach((link) => {
      if (mark[link.source]) {
        result = false;
      }
      mark[link.source] = true;
      if (mark[link.target]) {
        result = false;
      }
      mark[link.target] = true;
    });
    return result;
  }

  colorAugmentingPath() {
    this.findAugmentingPath();
    for (let i = 0; i < this.augmentingPath.length - 1; i += 2) {
      const link = this.getLink(this.augmentingPath[i], this.augmentingPath[i + 1]);
      link.setColor('red');
      link.selectLink();
      setTimeout(() => {
        link.setColor('');
        link.unselectLink();
      }, 3000)
    }
  }

  colorDesiredLinks(linksArray) {
    for (let i = 0; i < linksArray.length; i++) {
      const link = this.getLink(linksArray[i][0], linksArray[i][1]);
      link.setIsAnswer(true);
      setTimeout(() => {
        link.setIsAnswer(false);
      }, 3000)
    }
  }

  calculateGameTheoryAnswer() {
    for (const answer of this.answer) {
      for (const link of answer) {
        const linkObject = this.getLink(link[0], link[1]);
        if (!this.getSelectedLinks().includes(linkObject) && !linkObject.disabled) {
          this.colorDesiredLinks(answer);
          return false;
        }
      }
    }
    return true;
  }


  calculateAutomataAnswer() {
    for (const answer of this.answer) {
      for (const link of answer) {
        const linkObject = this.getLink(link[0], link[1]);
        if (!this.getSelectedLinks().includes(linkObject) && !linkObject.disabled) {
          this.colorDesiredLinks(answer);
          return false;
        }
      }
    }
    return true;
  }

}