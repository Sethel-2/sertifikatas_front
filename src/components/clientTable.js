import React, { useState } from 'react';
import './clientTable.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import EditClientModal from './editClientModal';

function ClientTable({ clients, headers, onEdit }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEditClient = (client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
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
                <button className="edit-button" onClick={() => onEdit(client)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className="delete-button">
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
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
            console.log(editedClient);
            // handle saving the edited client object here
          }}
        />
      )}
    </div>
  );
}

export default ClientTable;