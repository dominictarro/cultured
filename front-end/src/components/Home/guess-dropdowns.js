import React from 'react';
import Select from 'react-select'

const groupStyles = {
    display: 'flex',
    width: '20px',
    alignItems: 'center',
    justifyContent: 'space-between',
  };
  
  const groupBadgeStyles = {
    backgroundColor: '#EBECF0',
    borderRadius: '2em',
    color: '#172B4D',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center',
  };
  
 const formatGroupLabel = data => (
    <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );

const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: state.isSelected ? 'red' : 'blue',
      with: '150px',
      padding: 20,
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      width: '200px',
    }),

  }
const GameDropDowns = (props) => {
   
  return (
<li className='newGameDropDown'>
    <Select
        className="custom-react-select-container"
        classNamePrefix="custom-react-select"
        // onChange={(item) => props.onChange(item)}
        // value={props.value}
        options={props.options}
        isClearable={true}
        // formatGroupLabel={formatGroupLabel}
        // styles={customStyles}
        // placeholder={props.placeholder}
        // isLoading={props.isLoading}
        isDisabled={props.disabled}
        // components={props.components}
        // inputValue={props.inputValue}
        // onInputChange={props.onInputChange}
        />

</li>
    
    );
}

export default GameDropDowns
