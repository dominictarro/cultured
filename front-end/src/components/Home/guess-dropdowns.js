import React from 'react';
import Select from 'react-select'


const GameDropDowns = (props) => {
  return (
  <ul className='nestedList'>
    <li className='nestedListOptions'>
      <Select
        className="custom-react-select-container"
        classNamePrefix="custom-react-select"
        onChange={(item) => props.onChange(item)}
        options={props.options}
        isClearable={true}
        placeholder={'Type to search'}
        isDisabled={props.disabled}
        />

    </li>
  </ul>
    );
}

export default GameDropDowns
