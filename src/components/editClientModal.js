import React, { useState } from 'react';
import '../clientPage.css';
import Navbar from '../components/navbar';
import FilterSection from '../components/dateFilter';
import ClientTable from '../components/clientTable';
import EditClientModal from '../components/editClientModal';

function ClientPage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const handleOpenEditModal = (client) => {
    setSelectedClient(client);
    setIsEditModalOpen(true);
  };
  
  const handleCloseEditModal = () => {
    setSelectedClient(null);
    setIsEditModalOpen(false);
  };

  const handleFilter = (startDate, endDate) => {
    // handle filtering logic here
  };

  const handleShowAll = () => {
    // handle showing all orders logic here
  };

  const clients = [
    {
      id: '1',
      firstName: 'Artūras',
      lastName: 'Sabaliauskas',
      email: 'a.sabaliauskas@gmail.com',
      phone: '+3706857111',
      createdAt: '2023-05-02',
    },
    // Add more clients here
  ];

  const headers = ['ID', 'Vardas', 'Pavardė','El.paštas', 'Telefono Nr.', 'Sūkurta'];

  return (
    <div className="background-image">
       <Navbar/>
       <FilterSection
        handleFilter={handleFilter}
        handleShowAll={handleShowAll}
        addButtonLabel="Pridėti klientą"
        handleAdd={() => handleOpenEditModal(null)}
      />
      <ClientTable clients={clients} headers={headers} onEdit={handleOpenEditModal} />
      {isEditModalOpen && (
        <EditClientModal
          isOpen={isEditModalOpen}
          closeModal={handleCloseEditModal}
          client={selectedClient}
          onSave={(editedClient) => {
            console.log(editedClient);
            // handle saving the edited client object here
          }}
        />
      )}
    </div>
  );
}

export default ClientPage;