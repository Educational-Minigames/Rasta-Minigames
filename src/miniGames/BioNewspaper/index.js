import React from 'react';
import { render } from 'react-dom';
import { Layer, Stage, Star, Text } from 'react-konva';

import URLImage from '../../components/Konva/URLImage';

function generateShapes() {
  return [...Array(15)].map((_, i) => ({
    src: process.env.PUBLIC_URL + `/bio/${i + 1}.png`,
    id: i.toString(),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    rotation: Math.random() * 180,
    isDragging: false,
  }));
}

const INITIAL_STATE = generateShapes();

const Index = () => {
  const [stars, setStars] = React.useState(INITIAL_STATE);

  const handleDragStart = (e) => {
    const id = e.target.id();
    setStars(
      stars.map((star) => {
        return {
          ...star,
          isDragging: star.id === id,
        };
      })
    );
  };
  const handleDragEnd = (e) => {
    setStars(
      stars.map((star) => {
        return {
          ...star,
          isDragging: false,
        };
      })
    );
  };

  return (
    <Stage draggable width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {stars.map((star) => (
          <URLImage
            src={star.src}
            key={star.id}
            id={star.id}
            x={star.x}
            y={star.y}
            draggable
          // scaleX={0.2}
          // scaleY={0.2}
          />
        ))}
      </Layer>
    </Stage>
  );
};


export default Index;