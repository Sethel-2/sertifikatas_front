import React, { useState, useEffect } from 'react';
import '../clientPage.css';
import Navbar from '../components/navbar';
import ClientTable from '../components/clientTable';
import EditClientModal from '../components/editClientModal';
import { getClients } from '../api/user';
import { toast } from 'react-toastify';

function ClientPage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [clients, setClients] = useState([
    
  ]);
  const [originalClients, setOriginalClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState({}); // add state for the edited client object

  const handleFetchClients = async () =>
  {
    const {clients,message,success} = await getClients()
    if(!success){
      toast.error(message)
      return
    }
    setClients(clients)
    setOriginalClients(clients);
  }  
  useEffect(() =>{
  handleFetchClients();
  }, [])

  // Copy the initial clients to originalClients when the component mounts
 

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleFilterClick = () => {
    const filteredClients = originalClients.filter((client) => {
      const clientDate = new Date(client.createdAt);
     
      return clientDate >= new Date(startDate) && clientDate <= new Date(endDate);
    });
    setClients(filteredClients);
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



  
  const handleSaveEdit = (editedClient) => {
    const updatedClients = clients.map((client) =>
      client.id === editedClient.id ? editedClient : client
    );
    setClients(updatedClients);
    setIsEditModalOpen(false);
  };

  return (
    <div className="background-image">
      <Navbar/>

      <div className="filter-section">
        <label htmlFor="start-date">Pradžios data:</label>
        <input type="date" id="start-date" value={startDate} onChange={handleStartDateChange} />

        <label htmlFor="end-date">Pabaigos data:</label>

        <input type="date" id="end-date" value={endDate} onChange={handleEndDateChange} />

        <button onClick={handleFilterClick}>Filtruoti</button>
        <button onClick={() => setClients(originalClients)}>Rodyti visus</button>
        {/* <button onClick={onAdd}>Pridėti klientą</button> */}
      </div>

      <ClientTable clients={clients} headers={headers} onEdit={onEdit} setClients ={setClients} columnKeys = {columnKeys}/>

      {/* {isAddModalOpen && (
        <AddClientModal
          isOpen={isAddModalOpen}
          closeModal={handleCloseAddModal}
          handleAddClient={(newClient) => {
            setClients([...clients, newClient]);
          }}
          clients={clients}
        />
      )} */}

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
