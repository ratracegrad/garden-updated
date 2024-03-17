import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import Plot from '../models/Plot';
import '../css/plants.css';

const PlantPicker = ({ show, handleSelect, handleHide, plantGroups, plot, neighbors }) => {
  const [currentPlantGroup, setCurrentPlantGroup] = useState(Object.keys(plantGroups)[0]);

  const renderClearPlotButton = () => {
    if (plot.plant) {
      return (
        <Button
          block
          variant="success"
          className="mb-1"
          onClick={() => handleSelect(null, null)}
        >
          Clear plot
        </Button>
      );
    }
  };

  const renderNeighbors = () => {
    const neighborPlants = neighbors.map(plot => plot.plant).filter(Boolean);
    if (neighborPlants.length > 0) {
      const getName = (plant) => plant.namePlural.toLowerCase();
      const names = Array.from(new Set(neighborPlants.map(getName))).sort().join(', ');
      return <span className="text-wrap text-sm">Neighbors: {names}</span>;
    }
  };

  const renderFilters = () => {
    const numGroups = Object.keys(plantGroups).length;
    if (numGroups > 1) {
      const groupNameMap = {
        all: 'All',
        good: 'Compatible',
        neutral: 'Neutral',
        bad: 'Combative'
      };
      const buttonStyle = {
        width: `${Math.floor(96 / numGroups)}%`
      };
      return (
        <div className="mb-2">
          <ToggleButtonGroup
            type="radio"
            name="currentPlantGroupFilter"
            value={currentPlantGroup}
            onChange={(value) => setCurrentPlantGroup(value)}
            className="bg-light w-100"
          >
            {Object.entries(plantGroups).map(([group, plantList]) => (
              <ToggleButton
                size="sm"
                className="text-center"
                variant="outline-success"
                value={group}
                key={group}
                style={buttonStyle}
              >
                {groupNameMap[group]}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </div>
      );
    }
  };

  const renderPlantList = () => {
    const sortFunc = (a, b) => a.namePlural.localeCompare(b.namePlural);
    const plants = currentPlantGroup ? plantGroups[currentPlantGroup] : [];
    return (
      <ListGroup>
        {plants.sort(sortFunc).map(plant => (
          <ListGroup.Item
            action
            key={plant.id}
            onClick={() => handleSelect(plant, plant.defaultLayout())}
          >
            {plant.namePlural}
            <div className={`${plant.className} icon float-right`}></div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  };

  return (
    <Modal show={show} onHide={handleHide} scrollable>
      <Modal.Header closeButton className="bg-pastel-green">
        Plant Picker
      </Modal.Header>
      <Modal.Body>
        {renderClearPlotButton()}
        {plot.plant && <hr />}
        {renderNeighbors()}
        {renderFilters()}
        {renderPlantList()}
      </Modal.Body>
    </Modal>
  );
};

PlantPicker.propTypes = {
  show: PropTypes.bool.isRequired,
  handleSelect: PropTypes.func.isRequired,
  handleHide: PropTypes.func.isRequired,
  plantGroups: PropTypes.object.isRequired,
  plot: PropTypes.instanceOf(Plot).isRequired,
  neighbors: PropTypes.arrayOf(PropTypes.instanceOf(Plot)).isRequired,
};

export default PlantPicker;
