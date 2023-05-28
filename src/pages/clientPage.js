import React, { useState, useEffect, useRef } from 'react';
import '../clientPage.css';
import Navbar from '../components/navbar';
import ClientTable from '../components/clientTable';
import EditClientModal from '../components/editClientModal';
import { getClients } from '../api/user';
import { toast } from 'react-toastify';
import { formatEndDate, formatStartDate } from '../utils/date';

function ClientPage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [nextPageExists, setNextPageExists] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedClient, setSelectedClient] = useState({}); // add state for the edited client object
  const searchRef = useRef()
  const startDateRef = useRef()
  const endDateRef = useRef()

  const handleFetchClients = async () => {
    const from = startDate ? formatStartDate(startDate) : ''
    const to = endDate ? formatEndDate(endDate) : ''
    const {clients,message,success,nextPageExists} = await getClients(searchQuery, currentPage, from, to)
    if(!success){
      toast.error(message)
      return
    }
    setClients(clients)
    setNextPageExists(nextPageExists)
  }  

  useEffect(() =>{
    handleFetchClients();
  }, [currentPage, searchQuery, startDate, endDate])


  const handleFilterClick = () => {
    setStartDate(startDateRef.current.value)
    setEndDate(endDateRef.current.value)
    setCurrentPage(1)
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const headers = ['Vardas', 'Pavardė','El.paštas', 'Telefono Nr.', 'Sūkurta'];
  const columnKeys = ['firstName', 'lastName', 'email', 'phone', 'createdAt']
  
  const onEdit = (client) => {
    setIsEditModalOpen(true);
    setSelectedClient(client); // set the initial state of the edited client object
  };

  const handleSearch = () => {
    setSearchQuery(searchRef.current.value);
    setCurrentPage(1)
  }
  
  const handleSaveEdit = (editedClient) => {
    const updatedClients = clients.map((client) =>
      client.id === editedClient.id ? editedClient : client
    );
    setClients(updatedClients);
    setIsEditModalOpen(false);
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

  return (
    <div className="background-image">
      <Navbar/>
      <div className="filter-section">
      <label htmlFor="search-query">Ieškoti užsakymo:</label>
      
      <input
        type="text"
        id="search-query"
        ref={searchRef}
        placeholder="Įveskite klientą"
      />
      <button onClick = {handleSearch}>Ieškoti</button>
        <label htmlFor="start-date">Pradžios data:</label>
        <input type="date" id="start-date" ref={startDateRef} />

        <label htmlFor="end-date">Pabaigos data:</label>

        <input type="date" id="end-date" ref={endDateRef} />

        <button onClick={handleFilterClick}>Filtruoti</button>
        <button onClick={handleShowAll}>Rodyti visus</button>
      </div>

      <ClientTable
        clients={clients}
        headers={headers}
        onEdit={onEdit}
        setClients={setClients}
        columnKeys={columnKeys}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        nextPageExists={nextPageExists}
      />

      {isEditModalOpen && (
        <EditClientModal
          isOpen={isEditModalOpen}
          client={selectedClient}
          closeModal={handleCloseEditModal}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
}

export default ClientPage;
