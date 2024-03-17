import React from 'react';
import PropTypes from 'prop-types';
import SquareFootPlot from './SquareFootPlot';
import Plot from '../models/Plot';
import '../css/GardenGrid.css';

const GardenGrid = ({ grid, numRows, numCols, handleGridClick }) => {
  const gridContainerStyles = () => {
    const sqSizeToShowAllColumns = Math.floor(window.innerWidth * 0.9 / numCols);
    const sqSizeToShowAllRows = Math.floor(window.innerHeight * 0.7 / numRows);
    const sqSizeToShowEverything = Math.min(sqSizeToShowAllColumns, sqSizeToShowAllRows);
    // Make sure the square size is no smaller than 60 pixels
    const sqSize = Math.max(sqSizeToShowEverything, 60);
    return {
      width: `${sqSize * numCols}px`,
      height: `${sqSize * numRows}px`
    };
  };

  const gridStyles = () => {
    return {
      gridTemplateRows: `repeat(${numRows}, 1fr)`,
      gridTemplateColumns: `repeat(${numCols}, 1fr)`,
    };
  };

  return (
    <div id="gridContainer" style={gridContainerStyles()}>
      <div id="grid" style={gridStyles()}>
        {grid.map((row, rowNum) => row.map((plot, colNum) => {
          const id = `r${rowNum}c${colNum}`;
          return (
            <SquareFootPlot
              key={id}
              id={id}
              plant={plot.plant}
              layout={plot.layout}
              onClick={() => handleGridClick(rowNum, colNum)}
            />
          );
        }))}
      </div>
    </div>
  );
};

GardenGrid.propTypes = {
  grid: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.instanceOf(Plot)
    )
  ).isRequired,
  numRows: PropTypes.number.isRequired,
  numCols: PropTypes.number.isRequired,
  handleGridClick: PropTypes.func.isRequired,
};

export default GardenGrid;
