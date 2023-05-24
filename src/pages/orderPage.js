import '../orderPage.css';
import Navbar from '../components/navbar';
import OrderTable from '../components/orderTable';
import React, {useState, useEffect} from 'react';
import AddOrderModal from '../components/addOrderModal';
import Button from '../components/button';
import { getUser } from '../utils/storage';
import { createOrder, deleteOrder, getOrders, updateOrder } from '../api/order';
import { toast } from 'react-toastify';
import { getClients } from '../api/user';


function OrderPage() {

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [clients, setClients] = useState([]);
  
  const user = getUser()
  const isCertificator = user && user.role === "certificator"
  const [orders, setOrders] = useState([
  
  ]);
  const [originalOrders, setOriginalOrders] = useState([]);

  
  const handleFetchOrders = async () => {
  
  const {orders: fetchedOrders, message, success} = await getOrders()
  if(!success){
    toast.error(message)
    return
  }
  setOrders(fetchedOrders)
  setOriginalOrders(fetchedOrders);

  }
  useEffect(() =>{
    handleFetchOrders()
  },[] );

  const handleUpdateOrder = async (order) =>{
    const {order:updatedOrder, message} = await updateOrder(order._id, order)
    if(!updatedOrder){
      toast.error(message)
      return
    }
    setOrders((prev)=>{
      return prev.map(order => {
        if(order._id === updatedOrder._id){
          return updatedOrder
        }
        else{
          return order
        }
      })
    })
  }
  const handleDeleteOrder = async (id) => {
    const {order: deletedOrder, message} = await deleteOrder(id)
    if(!deletedOrder){
      toast.error(message)
      return
    }
    setOrders(orders.filter(order => order._id !== id))
  }

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };
  const handleSearch = (async () => {
    const {orders, message, success} = await getOrders(searchQuery)
    if(!success){
      toast.error(message)
      return
    }
    setOrders(orders)
    
    setOriginalOrders(orders)
  })

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
        orderDate <= new Date(endDate)
      );
    });
    setOrders(filteredOrders);
  };

  const handleAddOrderClick = () => {
    setIsModalOpen(true);
  };

  const handleAddOrder= async (newOrder)=>{
   

    
    const {order, message} = await createOrder(newOrder)   
    if(!order){
      toast.error(message);
      return
    }                        
    setOrders([...orders, order]);
    setOriginalOrders([...orders, order]); // also update the original orders
  };

  const handleShowAll = () => {
    setOrders([...originalOrders]); // reset the orders to the original ones
  };

  const handleFetchClients = async () =>
  {
    const {clients,message, success} = await getClients()
    if(!success){
      toast.error(message)
      return
    }

    setClients(clients)
   
  }  
  useEffect(() =>{
  handleFetchClients();
  }, [])


  const headers = ['Nr.', 'Klientas', 'Pastabos', 'Būsena', 'Sertifikatas', 'Sukūrta'];
  const columnKeys = ['number', 'client', 'notes', 'state', 'certificate', 'createdAt']
  return (
    <div className="background-image">
    <Navbar />
    <div className="filter-section">
      {isCertificator? <><label htmlFor="search-query">Ieškoti užsakymo:</label>
      
      <input
        type="text"
        id="search-query"
        value={searchQuery}
        onChange={handleSearchQueryChange}
        placeholder="Įveskite klientą"
      />
      <button onClick = {handleSearch}>Ieškoti</button></>: null}
        <label htmlFor="start-date">Pradžios data:</label>
        <input type="date" id="start-date" value={startDate} onChange={handleStartDateChange} />

        <label htmlFor="end-date">Pabaigos data:</label>
        <input type="date" id="end-date" value={endDate} onChange={handleEndDateChange} />

        <Button text="Filtruoti" onClick={handleFilterClick} />
        <Button text="Rodyti visus" onClick={handleShowAll} />
        {isCertificator?<Button text="Pridėti užsakymą" onClick={handleAddOrderClick} />:null}
      </div>

      <OrderTable orders={orders} headers={headers} columnKeys = {columnKeys} setOrders={setOrders} updateOrder = {handleUpdateOrder} deleteOrder = {handleDeleteOrder} clients = {clients} />

      <AddOrderModal isOpen={isModalOpen} handleAddOrder={(newOrder)=>handleAddOrder(newOrder)} closeModal={()=>setIsModalOpen(false) } clients = {clients}></AddOrderModal>
      
      </div>
  );
}

export default OrderPage;