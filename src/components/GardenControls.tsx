import React from 'react';
import PropTypes from 'prop-types';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import '../App.css';
import '../css/GardenControls.css';

const dropdownOptionPropTypes = PropTypes.shape({
  label: PropTypes.string.isRequired,
  handleSelect: PropTypes.func.isRequired,
});

const propTypes = {
  addRowOptions: PropTypes.arrayOf(dropdownOptionPropTypes).isRequired,
  deleteRowOptions: PropTypes.arrayOf(dropdownOptionPropTypes).isRequired,
  addColOptions: PropTypes.arrayOf(dropdownOptionPropTypes).isRequired,
  deleteColOptions: PropTypes.arrayOf(dropdownOptionPropTypes).isRequired,
};

const btnGroupContainerClass = 'd-flex flex-column m-1 p-0 border border-secondary rounded text-center text-nowrap';
const btnGroupLabelClass = 'badge badge-secondary rounded-0 w-100';

const GardenControls = ({ addRowOptions, deleteRowOptions, addColOptions, deleteColOptions }) => {

  const renderDropdownButton = (id, title, options) => (
    <DropdownButton
      id={id}
      title={title}
      disabled={options.length > 1 ? false : true}
      variant="outline-secondary"
      size="sm"
    >
      {options.map((option, i) => (
        <Dropdown.Item key={i} onSelect={option.handleSelect}>
          {option.label}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );

  return (
    <ButtonToolbar aria-label="Controls" className="justify-content-center">
      <div className={btnGroupContainerClass}>
        <span className={btnGroupLabelClass}>Rows</span>
        <ButtonGroup aria-label="Add or delete rows">
          {renderDropdownButton('add-row-btn', 'Add', addRowOptions)}
          {renderDropdownButton('delete-row-btn', 'Delete', deleteRowOptions)}
        </ButtonGroup>
      </div>
      <div className={btnGroupContainerClass}>
        <span className={btnGroupLabelClass}>Columns</span>
        <ButtonGroup aria-label="Add or delete columns">
          {renderDropdownButton('add-col-btn', 'Add', addColOptions)}
          {renderDropdownButton('delete-col-btn', 'Delete', deleteColOptions)}
        </ButtonGroup>
      </div>
    </ButtonToolbar>
  );
};

GardenControls.propTypes = propTypes;

export default GardenControls;