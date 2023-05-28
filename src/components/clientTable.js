import React, { useState } from 'react';
import './clientTable.css';
import EditClientModal from './editClientModal';
import { format } from 'date-fns';
import Button from './button';

function ClientTable({ clients, headers, onEdit, setClients, columnKeys, currentPage, setCurrentPage, nextPageExists }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient] = useState(null);

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
      
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '500px', margin: '2rem auto' }}>
        <Button className="link1" text="Atgal" disabled={currentPage === 1}  onClick={() => setCurrentPage(prev => prev - 1)} />
        <div>{currentPage}</div>
        <Button className="link1" text="Toliau" disabled={clients.length === 0 || !nextPageExists} onClick={() => setCurrentPage(prev => prev + 1)} />
      </div>

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