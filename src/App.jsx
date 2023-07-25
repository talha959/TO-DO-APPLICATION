import './App.css';
import React, { useState } from 'react';
function App() {
  const [Text, setText] = useState('');
  const [Option, setOption] = useState('');
  const [List, setList] = useState([]);
  const [filter, setFilter] = useState('');
  const [idCounter, setIdCounter] = useState(0);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [itemToUpdate, setItemToUpdate] = useState(null);

  const handleSubmit = () => {
    if (Text === '') {
      alert('Please enter some.');
      return;
    }
    if (Option === '') {
      alert('Please select Option');
      return;
    }

    setList((prevList) => [
      ...prevList,
      { id: idCounter, Text: Text, Option: Option }
    ]);

    setIdCounter(idCounter + 1);
    setText('');
    setOption('');
  };

  const handleDelete = (id) => {
    setList((prevList) => prevList.filter((item) => item.id !== id));
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleUpdateStatus = (id, newStatus) => {
    setList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, Option: newStatus } : item
      )
    );
    setItemToUpdate(null);
    setShowCheckboxes(false);
    setFilter('');
  };

  const filteredList = List.filter((item) => {
    if (filter) {
      return item.Option === filter;
    } else {
      return true;
    }
  });

  const handleShowCheckboxes = (id) => {
    setItemToUpdate(id);
    setShowCheckboxes(true);
  };

  const handleHideCheckboxes = () => {
    setItemToUpdate(null);
    setShowCheckboxes(false);
  };

  return (
    <div className="main-app">
      <center className="theme">
        <h1>TO DO APP</h1>
      </center>

      <center>
        <input
          type="text" value={Text} placeholder="Write Note" onChange={(e) => setText(e.target.value)}
        />
        &nbsp;&nbsp;&nbsp;
        {!showCheckboxes ? (
          <>
            <select
              className="filt" placeholder="Select Option"
              value={Option}
              onChange={(e) => setOption(e.target.value)}
            > 
              <option value="" disabled selected>Select Option</option>
              <option value="Pending">Pending</option>
              <option value="Progress">Progress</option>
              <option value="Done">Done</option>
            </select>
            <button type="button" className="button1" onClick={handleSubmit}>
              Add
            </button>
          </>
        ) : (
          <>
            <button type="button" className="button2" onClick={handleHideCheckboxes}>
              Cancel
            </button>
          </>
        )}
      </center>

      <h3>Filter Now</h3>
      <center className="Cen">
        <select value={filter} onChange={handleFilterChange}>
          <option disabled selected>Select Option</option>
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Progress">Progress</option>
          <option value="Done">Done</option>
        </select>
      </center>

      <div>
        {filteredList.map((item) => (
          <div key={item.id} className="List">
            <center>
              <p>{item.Text}</p>
              <p>{item.Option}</p>
            </center>
            {!showCheckboxes && (
              <center>
                <button
                  className="button2"
                  onClick={() => handleShowCheckboxes(item.id)}
                >
                  Update
                </button>
              </center>
            )}
            {showCheckboxes && itemToUpdate === item.id && (
              <center>
                
                  <input
                    type="checkbox"
                    checked={item.Option === 'Pending'}
                    onChange={() => handleUpdateStatus(item.id, 'Pending')}
                  />
                  <label>
                  Pending
                </label>
                  <input
                    type="checkbox"
                    checked={item.Option === 'Progress'}
                    onChange={() => handleUpdateStatus(item.id, 'Progress')}
                  />
                  <label>
                  Progress
                </label>
                  <input
                    type="checkbox"
                    checked={item.Option === 'Done'}
                    onChange={() => handleUpdateStatus(item.id, 'Done')}
                  />
                  <label>
                  Done
                </label>
                <button
                  className="button2"
                  onClick={handleHideCheckboxes}
                >
                  Cancel
                </button>
              </center>
            )}

            {item.Option === 'Done' && (
              <center>
                <br></br>
                <button className="delete" onClick={() => handleDelete(item.id)}>
                  Delete
                </button>
              </center>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;