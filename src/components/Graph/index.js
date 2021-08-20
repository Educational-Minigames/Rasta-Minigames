import { makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Graph from 'react-graph-network';

import Link from './Link';
import { MyGraph } from './model';
export { MyGraph };
import Node from './Node';

const useStyles = makeStyles((theme) => ({
  div: {
    height: '100vh',
    width: '100vw',
  },
  iframe: {
    height: '100%',
    width: '100%',
    border: '0px',
  },
}));

const initialData = {
  nodes: [
    { id: '1', color: '#223232', isSelected: true },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
    { id: '7' },
    { id: '8' },
  ],
  links: [
    { "source": '1', "target": '2', color: 'blue' },
    { "source": '1', "target": '2', color: 'red' },
    { "source": '1', "target": '4', color: 'red' },
    { "source": '3', "target": '4', color: 'orange' },
    { "source": '5', "target": '4', color: 'orange' },
    { "source": '6', "target": '4', color: 'orange' },
    { "source": '7', "target": '4', color: 'orange' },
    { "source": '8', "target": '4', color: 'orange' },
  ]
};


const index = ({ myGraph }) => {
  const classes = useStyles();

  return (
    <div style={{ height: '100vh' }}>
      <Graph
        id={myGraph.name}
        data={myGraph.exportData()}
        NodeComponent={Node}
        LineComponent={Link}
        nodeDistance={100}
        enableDrag={true}
        pullIn={false}
        zoomDepth={3}
        hoverOpacity={myGraph.hoverOpacity}
      />
    </div>
  );
}

export default index;


