import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import PlantPicker from './components/PlantPicker';
import GardenGrid from './components/GardenGrid';
import GardenControls from './components/GardenControls';
import Plant from './models/Plant';
import Layout from './models/Layout';
import Plot from './models/Plot';

// iteration helpers
const range = (length) => [...Array(length).keys()];

// grid helpers
const createRow = (length) => new Array(length).fill().map(cell => new Plot());
const createGrid = (numRows, numCols) => Array(numRows).fill().map(row => createRow(numCols));
const cloneGrid = (grid) => grid.map(row => row.slice());

function App() {
  const [grid, setGrid] = useState(createGrid(4, 4)) // 4x4 grid
  const [numRows, setNumRows] = useState(4)
  const [numCols, setNumCols] = useState(4)
  const [showPlantPicker, setShowPlantPicker] = useState(false)
  const [clickedRow, setClickedRow] = useState(null)
  const [clickedCol, setClickedCol] = useState(null)
  const [history, setHistory] = useState([])

  const handleGridClick = (row, col) => {
    setClickedRow(row);
    setClickedCol(col);
    setShowPlantPicker(true);
  }

  const addRow = (index) => {
    const newNumRows = numRows + 1;
    const newGrid = cloneGrid(grid);
    newGrid.splice(index, 0, createRow(numCols));
    setNumRows(newNumRows);
    setGrid(newGrid);
  }

  const addRowOptions = () => {
    const label = (index) => {
      if (index === 0) {
        return 'To top';
      } else if (index === numRows) {
        return 'To bottom';
      } else {
        return `Insert below ${index}`;
      }
    };
    return range(numRows + 1).map(index => ({
      label: label(index),
      handleSelect: () => addRow(index),
    }));
  };

  const deleteRow = (index) => {
    setNumRows(prevNumRows => prevNumRows - 1);
    setGrid(prevGrid => prevGrid.map((row, rowNum) => rowNum === index ? null : row.slice()).filter(Boolean));
  };

  const deleteRowOptions = () => range(numRows).map(index => ({
    label: String(index + 1),
    handleSelect: () => deleteRow(index),
  }));

  const addCol = (index) => {
    const newNumCols = numCols + 1;
    const newGrid = cloneGrid(grid);
    newGrid.forEach(row => row.splice(index, 0, new Plot()));
    setNumCols(newNumCols);
    setGrid(newGrid);
  };

  const addColOptions = () => {
    const label = (index) => {
      if (index === 0) {
        return 'To left';
      } else if (index === numCols) {
        return 'To right';
      } else {
        return `Insert right of ${index}`;
      }
    };
    return range(numCols + 1).map(index => ({
      label: label(index),
      handleSelect: () => addCol(index),
    }));
  };

  const deleteCol = (index) => {
    setNumCols(prevNumCols => prevNumCols - 1);
    setGrid(prevGrid => prevGrid.map(row => row.map((plot, colNum) => colNum === index ? null : plot).filter(Boolean)));
  };

  const deleteColOptions = () => range(numCols).map(index => ({
    label: String(index + 1),
    handleSelect: () => deleteCol(index),
  }));


  const handlePlantPickerSelection = (plant, layout) => {
    const newGrid = cloneGrid(grid);
    const plot = newGrid[clickedRow][clickedCol];
    Object.assign(plot, { plant, layout });
    setGrid(newGrid);
    setShowPlantPicker(false);
    setClickedRow(null);
    setClickedCol(null);
  };

  const renderPlantPicker = () => {
    if (showPlantPicker) {
      return (
        <PlantPicker
          show={true}
          handleSelect={handlePlantPickerSelection}
          handleHide={() => setShowPlantPicker(false)}
          plantGroups={Plot.plantPickerGroups(clickedRow, clickedCol, grid)}
          plot={grid[clickedRow][clickedCol]}
          neighbors={Plot.neighbors(clickedRow, clickedCol, grid)}
        />
      );
    }
  };

  return (
    <>
      <Container className="mt-2 p-1">
        {renderPlantPicker()}
        <Card className="h-75">
          <Card.Header>
            <GardenControls
              addRowOptions={addRowOptions()}
              deleteRowOptions={deleteRowOptions()}
              addColOptions={addColOptions()}
              deleteColOptions={deleteColOptions()}
            />
          </Card.Header>
          <Card.Body
            className="align-content-center m-2 overflow-auto p-0"
            style={{ maxHeight: '70vh', overflowY: 'auto' }}
          >
            <GardenGrid
              grid={grid}
              numRows={numRows}
              numCols={numCols}
              handleGridClick={handleGridClick}
            />
          </Card.Body>
        </Card>
      </Container>
    </>
  )
}

export default App
