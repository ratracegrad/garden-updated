import React from 'react';
import PropTypes from 'prop-types';
import Plant from '../models/Plant';
import Layout from '../models/Layout';
import '../App.css';
import '../css/plants.css';
import '../css/SquareFootPlot.css';

const propTypes = {
  id: PropTypes.string.isRequired,
  plant: PropTypes.instanceOf(Plant),
  layout: PropTypes.instanceOf(Layout),
  onClick: PropTypes.func.isRequired,
};

const SquareFootPlot = ({ id, plant, layout, onClick }) => {

  const renderPlants = () => {
    if (plant) {
      const plantClass = `bg ${plant.className}`;
      const gridCellStyle = (row, col) => ({ gridArea: `${row + 1} / ${col + 1} / auto / auto` });
      return (
        layout.fill.map(([row, col], i) => (
          <div
            className="plant"
            style={gridCellStyle(row, col)}
            key={i}
          >
            <div className={plantClass}></div>
          </div>
        ))
      );
    }
  };

  return (
    <button
      className="plot"
      id={id}
      onClick={onClick}
    >
      <div
        className="plants"
        style={layout ? layout.styles : null}
      >
        {renderPlants()}
      </div>
    </button>
  );
};

SquareFootPlot.propTypes = propTypes;

export default SquareFootPlot;
