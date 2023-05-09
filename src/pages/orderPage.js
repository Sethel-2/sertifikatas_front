import '../orderPage.css';
import Navbar from '../components/navbar';
import OrderTable from '../components/orderTable';
import CertificateUploadButton from '../components/certificateUploadButton';
import React, {useState, useEffect} from 'react';
import AddOrderModal from '../components/addOrderModal';
import Button from '../components/button';
import EditOrderModal from '../components/editModal';




function OrderPage() {

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const [orders, setOrders] = useState([
    {
      id: '202305091',
      client: 'Artūras Sabaliauskas',
      notes: 'Trūksta katalizatoriaus',
      state: 'Vykdoma',
      certificate: <CertificateUploadButton onUpload={(file) => console.log(file)} />,
      createdAt: '2023-05-09',
    },
  ]);

  const [originalOrders, setOriginalOrders] = useState([]);

  // Copy the initial orders to originalOrders when the component mounts
  useEffect(() => {
    setOriginalOrders([...orders]);
  }, []);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleFilterClick = () => {
    const filteredOrders = originalOrders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
    });
    setOrders(filteredOrders);
  };

  const handleAddOrderClick = () => {
    setIsModalOpen(true);
  };

  const handleAddOrder= (newOrder)=>{
    const orderId = `${new Date().toISOString().slice(0, 10).replace(/-/g, '')}${orders.length + 1}`;

    const updatedOrder=  {
      id: orderId,
      client: newOrder.client,
      notes: newOrder.notes,
      state: 'Vykdoma',
      certificate: <CertificateUploadButton onUpload={(file) => console.log(file)} />,
      createdAt: new Date().toISOString().slice(0, 10),
    };                                
    setOrders([...orders, updatedOrder]);
    setOriginalOrders([...orders, updatedOrder]); // also update the original orders
  };

  const handleShowAll = () => {
    setOrders([...originalOrders]); // reset the orders to the original ones
  };

  const headers = ['Nr.', 'Klientas', 'Pastabos', 'Būsena', 'Sertifikatas', 'Sukūrta'];

  return (
    <div className="background-image">
      <Navbar/>
      <div className="filter-section">
        <label htmlFor="start-date">Pradžios data:</label>
        <input type="date" id="start-date" value={startDate} onChange={handleStartDateChange} />

        <label htmlFor="end-date">Pabaigos data:</label>
        <input type="date" id="end-date" value={endDate} onChange={handleEndDateChange} />

        <Button text="Filtruoti" onClick={handleFilterClick} />
        <Button text="Rodyti visus" onClick={handleShowAll} />
        <Button text="Pridėti užsakymą" onClick={handleAddOrderClick} />
      </div>

      <OrderTable orders={orders} headers={headers} setTableOrders={(tableOrders)=>{setOrders(tableOrders)}} updateOrder={(updatedOrder)=>{setOrders(orders.map(order=>order.id===updatedOrder.id ? updatedOrder : order))}}/>

      <AddOrderModal isOpen={isModalOpen} handleAddOrder={(newOrder)=>handleAddOrder(newOrder)} closeModal={()=>setIsModalOpen(false) }></AddOrderModal>
      
      </div>
  );
}

export default OrderPage;