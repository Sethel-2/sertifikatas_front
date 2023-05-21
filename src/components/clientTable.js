import React, { useState } from 'react';
import './clientTable.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import EditClientModal from './editClientModal';
import { format } from 'date-fns';

function ClientTable({ clients, headers, onEdit, setClients, columnKeys }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient] = useState(null);


  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEditClient = (client) => {
    onEdit(client);
  };

  
  const handleDeleteOrder = (client) => {
    const updatedClients = clients.filter((o) => o.id !== client.id);
    setClients(updatedClients);
  };
 

  return (
    <div className="client-table">
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
            
          </tr>

        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              {columnKeys.map((key) => {
               if(key === 'createdAt') return <td key={key}>{format(new Date(client[key]), "yyyy-MM-dd; HH:mm")}</td>
               return (
                  <td key={key}>{client[key]}</td>
                )
              })}
             
              
            </tr>
          ))}
        </tbody>
      </table>
      {selectedClient && (
        <EditClientModal
          isOpen={isModalOpen}
          closeModal={handleCloseModal}
          client={selectedClient}
          onSave={(editedClient) => {
          
            
          }}
        />
      )}
    </div>
  );
}

export default ClientTable;