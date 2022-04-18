import React, { Component } from 'react';
import Select from "react-select";
const customStyles = {
  control: (base, state) => ({
    ...base,
    background: state.selectProps.className == 'absent' ? 'red' : state.selectProps.className == 'present' ? 'yellow' : state.selectProps.className == 'correct' ? 'green' : '#ffffff'
    
  }
  ),  option: (styles, { isDisabled }) => {
    return {
      ...styles,
      backgroundColor: isDisabled ? "#A0A0A0" : "#272727",
      color: "#FFFFFF",
      "font-family": "Roboto",
      "text-transform": "uppercase"
    }
  }

};


const GameDropDowns = (props) => {
  console.log(props)
  let value =  '' 
  let evaluations = null
  let row = props.row
  let index = props.index
  if(props.choices[row] !== null & props.choices[row] !== undefined){
    value = props.options.find(item => props.choices[row][index] === item.value)
  }

  if(props.evaluations[row] !== null){
    evaluations = props.evaluations[row][index]
  }
  let className = evaluations != null ? evaluations : 'custom-react-select-container'
  row++

  
  return (
  <ul className='nestedList'>
    <li className='nestedListOptions'>
      <Select
        value={value}
        className={className}
        classNamePrefix="custom-react-select"
        onChange={(item, index) => props.onChange(item, index)}
        options={props.options}
        styles={customStyles}
        isFocused={true}
        placeholder={'Type to search'}
        isDisabled={props.disabled}
        />

    </li>
  </ul>
    );
}

export default GameDropDowns
