import React from 'react';
import '../clientPage.css';
import Navbar from '../components/navbar';
import FilterSection from '../components/dateFilter';
import ClientTable from '../components/clientTable';
import EditClientModal from '../components/editClientModal';
import { useState } from 'react';

function ClientPage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };
  
  const handleCloseEditModal = () => {
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
  const onEdit = (client) => {
   
    console.log(`Editing client with ID ${client.id}`);
  };
  return (
    <div className="background-image">
       <Navbar/>
       <FilterSection
        handleFilter={handleFilter}
        handleShowAll={handleShowAll}
        addButtonLabel="Pridėti klientą"
        handleAdd={handleOpenEditModal}
      />
     <ClientTable clients={clients} headers={headers} onEdit={onEdit} />
      {isEditModalOpen && (
        <EditClientModal
          isOpen={isEditModalOpen}
          closeModal={handleCloseEditModal}
          client={clients[1]} // replace with the appropriate client object
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






