const MAXIMUM_NUMBER_OF_NODES = 20;

class Node {
  neighborsId = [];
  isSelected = false;
  rerender = () => { }

  constructor({ id, color }) {
    this.color = color;
    this.id = id;
  }

  addNeighbor(nodeId) {
    if (this.neighborsId.includes(nodeId)) {
      console.log('This node has already this neighbor.');
      return;
    }
    this.neighborsId.push(nodeId);
    this.rerender();
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
      changeSelection: this.changeSelection.bind(this),
      getIsSelected: this.getIsSelected.bind(this),
      getColor: this.getColor.bind(this),
      setRerender: this.setRerender.bind(this),
    })
  }
}



class Link {
  isSelected = false;

  rerender = () => { }

  constructor({ node1Id, node2Id, color, thickness }) {
    this.source = Math.min(node1Id, node2Id);
    this.target = Math.max(node1Id, node2Id);
    this.color = color;
    this.thickness = thickness;
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

  export() {
    return ({
      source: this.source,
      target: this.target,
      thickness: this.thickness,
      changeSelection: this.changeSelection.bind(this),
      getIsSelected: this.getIsSelected.bind(this),
      getColor: this.getColor.bind(this),
      setRerender: this.setRerender.bind(this),
    })
  }
}

export class MyGraph {
  initialNodeId = 0;
  hoverOpacity = 1;
  nodes = [];
  links = [];

  constructor({ name, hoverOpacity }) {
    this.name = name;
    this.hoverOpacity = hoverOpacity;
  }

  addNewNode(color, id) {
    const node = new Node({ id: id ? id : this.initialNodeId, color });
    this.nodes.push(node);
    console.log(`New node ${this.initialNodeId} added!`);
    id ? '' : this.initialNodeId++;
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


  addLink(node1Id, node2Id, color, thickness) {
    const tmp = this.links.filter((link) =>
      (link.source == Math.min(node1Id, node2Id) && link.target == Math.max(node1Id, node2Id))
    ) || []
    if (tmp.length == []) {
      this.links.push(new Link({ node1Id, node2Id, color, thickness }));
      console.log("Link added successfully!");
      return true;
    } else {
      console.log("Link already exists.");
      return false;
    }
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

}