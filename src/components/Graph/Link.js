import React, { useEffect, useState } from 'react';

const Line = ({ link, ...restProps }) => {
  const [_, rerender] = useState();

  useEffect(() => {
    link.setRerender(() => rerender(Math.random()));
  }, [])

  return (
    <>
      <line
        onClick={link.changeSelection}
        {...restProps}
        stroke={link.getColor() ? link.getColor() : 'black'}
        strokeWidth={link.getIsSelected() ? 6 : 2}
      />
    </>
  )
};

export default Line;