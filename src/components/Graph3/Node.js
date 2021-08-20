import React, { useEffect, useState } from 'react';


const Node = ({ node }) => {
  const [_, rerender] = useState();

  useEffect(() => {
    node.setRerender(() => rerender(Math.random()));
  }, [])

  let size = 25;
  if (node.getIsSelected()) {
    size = 24;
  }

  return (
    <g style={{ display: `${node.getIsVisible() ? '' : 'none'}` }} >
      <circle
        // onClick={node.changeSelection}
        fill={node.getColor() ? node.getColor() : 'white'}
        strokeWidth={1}
        stroke={'black'}
        r={size}
      />
      <g>
        <text
          // onClick={node.changeSelection}
          fontSize={size}
          fontWeight={node.getIsSelected() ? 'bold' : ''}
          x={size / 3}
          y={size / 3}
        >
          {node.id}
        </text>
      </g>
    </g>
  );
};

export default Node;