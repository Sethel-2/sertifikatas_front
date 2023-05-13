import React, { useState } from 'react';
import './clientTable.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import EditClientModal from './editClientModal';

function ClientTable({ clients, headers, onEdit, setClients }) {
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              {Object.keys(client).map((key) => (
                <td key={key}>{client[key]}</td>
              ))}
              <td className="action-column">
              <div className="button-container">
                <button className="edit-button" onClick={() => handleEditClient(client)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className="delete-button" onClick ={() => handleDeleteOrder(client)}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              
                </div>
              </td>
              
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