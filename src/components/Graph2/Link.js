import React, { useEffect, useState } from 'react';

const Line = ({ link, ...restProps }) => {
  const [_, rerender] = useState();

  useEffect(() => {
    link.setRerender(() => rerender(Math.random()));
  }, [])

  return (
    <>
      <line
        onClick={!link.disabled ? link.changeSelection : ''}
        {...restProps}
        stroke={link.getIsAnswer() ? 'red' : link.getIsSelected() ? '#002fff' : link.getColor() ? link.getColor() : '#2b2b2b'}
        strokeWidth={link.getIsAnswer() ? '5' : link.thickness}
      />
    </>
  )
};

export default Line;