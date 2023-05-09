// import React, { useState } from 'react';
// import "./dateFilter.css";
// import Button from './button';
// import AddOrderModal from './addOrderModal';

// function FilterSection({ handleFilter, handleShowAll, addButtonLabel = null, onCustomButtonPress }) {
 
//   const [orders, setOrders] = useState([]);




//   return (
//     <div className="filter-section">
//       <label htmlFor="start-date">Pradžios data:</label>
//       <input type="date" id="start-date" value={startDate} onChange={handleStartDateChange} />

//       <label htmlFor="end-date">Pabaigos data:</label>
//       <input type="date" id="end-date" value={endDate} onChange={handleEndDateChange} />

//       <Button text="Filtruoti" onClick={handleFilterClick} />
//       <Button text="Rodyti visus" onClick={handleShowAll} />
//       {addButtonLabel && <Button text={addButtonLabel} onClick={handleAddOrderClick} />}
//     </div>
//   );
// }

// export default FilterSection;
