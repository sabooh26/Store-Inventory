import React from 'react';

const Item = (props) => {
  return (
    <div>
      <input
          type='text'
          value={props.value}
          name={props.name}
          onChange={props.handleChange}
      />
    </div>
  );
}

export default Item;
