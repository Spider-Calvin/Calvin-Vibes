import React from 'react';

const Dropdown = props => {    
    const dropdownChanged = (e) => {
        props.changed(e.target.value);
    }  

    return (
      <div className=" align-items-center form-group row px-0">
        <label className="form-label col-sm-2">Select the Genres Music you Like</label>
        <select
          value={props.selectedValue}
          onChange={dropdownChanged}
          className="form-control pref_select form-control-sm col-sm-10"
        >
          <option key={0}>Select...</option>
          {props.options.map((item, idx) => (
            <option key={idx + 1} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    );
}

export default Dropdown;