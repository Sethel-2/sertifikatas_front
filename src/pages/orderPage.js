import '../orderPage.css';
import Navbar from '../components/navbar';
import OrderTable from '../components/orderTable';
import React, {useState, useEffect, useRef} from 'react';
import AddOrderModal from '../components/addOrderModal';
import Button from '../components/button';
import { getUser } from '../utils/storage';
import { createOrder, deleteOrder, getOrders, updateOrder } from '../api/order';
import { toast } from 'react-toastify';
import { getClients } from '../api/user';
import { formatEndDate, formatStartDate } from '../utils/date';


function OrderPage() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [clients, setClients] = useState([]);
  const [nextPageExists, setNextPageExists] = useState(false)
  const searchRef = useRef()
  const startDateRef = useRef()
  const endDateRef = useRef()
  
  const user = getUser()
  const isCertificator = user && user.role === "certificator"
  const [orders, setOrders] = useState([]);

  const handleFetchOrders = async () => {
    const from = startDate ? formatStartDate(startDate) : ''
    const to = endDate ? formatEndDate(endDate) : ''
    const { orders: fetchedOrders, message, success, nextPageExists } = await getOrders(searchQuery, currentPage, from, to);
    if (!success) {
      toast.error(message);
      return;
    }
    setOrders(fetchedOrders);
    setNextPageExists(nextPageExists)
  };

  useEffect(() =>{
    handleFetchOrders()
  },[currentPage, searchQuery, startDate, endDate] );

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

  const handleFilterClick = () => {
    setStartDate(startDateRef.current.value)
    setEndDate(endDateRef.current.value)
    setCurrentPage(1)
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
  };

  const handleShowAll = () => {
    setStartDate('')
    setEndDate('')
    setSearchQuery('')
    setCurrentPage(1)
    startDateRef.current.value = ''
    endDateRef.current.value = ''
    searchRef.current.value = ''
  };

  const handleSearch = () => {
    setSearchQuery(searchRef.current.value);
    setCurrentPage(1)
  }

  const handleFetchClients = async () =>
  {
    const {clients,message, success} = await getClients('', 1, '', '', true)
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
        ref={searchRef}
        placeholder="Įveskite klientą"
      />
      <button onClick = {handleSearch}>Ieškoti</button></>: null}
        <label htmlFor="start-date">Pradžios data:</label>
        <input type="date" id="start-date" ref={startDateRef} />

        <label htmlFor="end-date">Pabaigos data:</label>
        <input type="date" id="end-date" ref={endDateRef} />

        <Button text="Filtruoti" onClick={handleFilterClick} />
        <Button text="Rodyti visus" onClick={handleShowAll} />
        {isCertificator?<Button text="Pridėti užsakymą" onClick={handleAddOrderClick} />:null}
      </div>

      <OrderTable
        orders={orders}
        headers={headers}
        columnKeys={columnKeys}
        setOrders={setOrders}
        updateOrder={handleUpdateOrder}
        deleteOrder={handleDeleteOrder}
        clients={clients}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        nextPageExists={nextPageExists}
      />

      <AddOrderModal
        isOpen={isModalOpen}
        handleAddOrder={(newOrder) => handleAddOrder(newOrder)}
        closeModal={() => setIsModalOpen(false)}
        clients={clients}
      ></AddOrderModal>
      </div>
  );
}

export default OrderPage;