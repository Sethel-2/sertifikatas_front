import React, { useState } from 'react';
import "./dateFilter.css";
import Button from './button';
import AddOrderModal from './addOrderModal';

function FilterSection({ handleFilter, handleShowAll, addButtonLabel = null }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isAddOrderModalOpen, setIsAddOrderModalOpen] = useState(false);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleFilterClick = () => {
    handleFilter(startDate, endDate);
  };

  const handleAddOrderClick = () => {
    setIsAddOrderModalOpen(true);
  };

  const handleAddOrderModalClose = () => {
    setIsAddOrderModalOpen(false);
  };

  return (
    <div className="filter-section">
      <label htmlFor="start-date">Pradžios data:</label>
      <input type="date" id="start-date" value={startDate} onChange={handleStartDateChange} />

      <label htmlFor="end-date">Pabaigos data:</label>
      <input type="date" id="end-date" value={endDate} onChange={handleEndDateChange} />

      <Button text="Filtruoti" onClick={handleFilterClick} />
      <Button text="Rodyti visus" onClick={handleShowAll} />
      {addButtonLabel && <Button text={addButtonLabel} onClick={handleAddOrderClick} />}

      {isAddOrderModalOpen && <AddOrderModal isOpen={isAddOrderModalOpen} closeModal={handleAddOrderModalClose} />}
    </div>
  );
}

export default FilterSection;