import React, { Component } from 'react';
import Select from "react-select";

const colorStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "#272727",
  }),
  option: (styles, { isDisabled }) => {
    return {
      ...styles,
      backgroundColor: isDisabled ? "#A0A0A0" : "#272727",
      color: "#FFFFFF",
      "font-family": "Roboto",
      "text-transform": "uppercase"
    }
  }
}

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
        styles={colorStyles}
        />

    </li>
  </ul>
    );
}

export default GameDropDowns
