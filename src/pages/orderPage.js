import '../orderPage.css';
import Navbar from '../components/navbar';
import OrderTable from '../components/orderTable';
import CertificateUploadButton from '../components/certificateUploadButton';
import React, {useState, useEffect} from 'react';
import AddOrderModal from '../components/addOrderModal';
import Button from '../components/button';
import { getUser } from '../utils/storage';

function OrderPage() {

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const user = getUser()
  const isCertificator = user && user.role === "certificator"
  const [orders, setOrders] = useState([
    {
      id: '202305091',
      clientId: '645bf5b722fee3038476330b',
      client: 'Artūras Sabaliauskas',
      notes: 'Trūksta katalizatoriaus',
      state: 'Nepradėta',
      certificate: null,
      additionalFiles: [],
      createdAt: '2023-05-09',
    },
    {
      id: '202305091',
      clientId: '645c0ba022fee30384763321',
      client: 'Benas Rubliovas',
      notes: 'Trūksta nuotraukų',
      state: 'Vykdoma',
      certificate: null,
      additionalFiles: [],
      createdAt: '2023-05-09',
    }
  ].filter(order => isCertificator?true: order.clientId === user._id));
  console.log(orders);
  const [originalOrders, setOriginalOrders] = useState([]);

  // Copy the initial orders to originalOrders when the component mounts
  useEffect(() => {
    setOriginalOrders([...orders]);
  }, []);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };
  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleFilterClick = () => {
    const filteredOrders = originalOrders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return (
        orderDate >= new Date(startDate) &&
        orderDate <= new Date(endDate) &&
        (order.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.clientId.toLowerCase().includes(searchQuery.toLowerCase()))
      );
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
    <Navbar />
    <div className="filter-section">
      <label htmlFor="search-query">Ieškoti užsakymo:</label>
      <input
        type="text"
        id="search-query"
        value={searchQuery}
        onChange={handleSearchQueryChange}
        placeholder="Įveskite klientą"
      />
        <label htmlFor="start-date">Pradžios data:</label>
        <input type="date" id="start-date" value={startDate} onChange={handleStartDateChange} />

        <label htmlFor="end-date">Pabaigos data:</label>
        <input type="date" id="end-date" value={endDate} onChange={handleEndDateChange} />

        <Button text="Filtruoti" onClick={handleFilterClick} />
        <Button text="Rodyti visus" onClick={handleShowAll} />
        {isCertificator?<Button text="Pridėti užsakymą" onClick={handleAddOrderClick} />:null}
      </div>

      <OrderTable orders={orders} headers={headers} setTableOrders={(tableOrders)=>{setOrders(tableOrders)}} updateOrder={(updatedOrder)=>{setOrders(orders.map(order=>order.id===updatedOrder.id ? updatedOrder : order))}}/>

      <AddOrderModal isOpen={isModalOpen} handleAddOrder={(newOrder)=>handleAddOrder(newOrder)} closeModal={()=>setIsModalOpen(false) }></AddOrderModal>
      
      </div>
  );
}

export default OrderPage;