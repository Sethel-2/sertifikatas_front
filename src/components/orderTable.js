import React, { useState } from 'react';
import './orderTable.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faUpload } from '@fortawesome/free-solid-svg-icons';
import EditOrderModal from './editModal';
import CertificateUploadButton from './certificateUploadButton';
import UploadFileModal from './uploadFileModal';
import { getUser } from '../utils/storage';



function OrderTable({ headers, orders, setTableOrders, updateOrder }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsUploadModalOpen(false);
  };
  const user = getUser()
  const isCertificator = user && user.role === "certificator"

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };
  const handleUploadModal = (order) => {
    setSelectedOrder(order);
    setIsUploadModalOpen(true);
  };


  const handleStatusChange = (order, event) => {
    const updatedOrder = { ...order, state: event.target.value };
    const updatedOrders = orders.map((o) => (o.id === order.id ? updatedOrder : o));
    setTableOrders(updatedOrders);
  };

  const handleDeleteOrder = (order) => {
    const updatedOrders = orders.filter((o) => o.id !== order.id);
    setTableOrders(updatedOrders);
  };
  
  return (
    <div className="order-table">
      <table>
        <thead>
          <tr>
            {headers.map((header) => {
            if(header === "Klientas" && !isCertificator) return null
            return  <th key={header}>{header}</th>
            }
            )}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              {Object.keys(order).map((key) => {
                if (key === 'state' && isCertificator) {
                  return (
                    <td key={`${order.id}_${key}`}>
                      <select
                        className={`status status-${order.state.toLowerCase()}`}
                        value={order.state}
                        onChange={(event) => handleStatusChange(order, event)}
                      >
                        <option className="status-not-started" value="Not started">
                          Nepradėta
                        </option>
                        <option className="status-in-progress" value="In progress">
                          Vykdoma
                        </option>
                        <option className="status-completed" value="Completed">
                          Atlikta
                        </option>
                      </select>
                    </td>
                  );
                }
                if (key === "certificate"){
                  return <td key = {`${order.id}_${key}`}>
                    <CertificateUploadButton onUpload={(file) => {
                    updateOrder({...order, certificate:file})
                  }} />
                  </td>
                }
                if(key === "client" && !isCertificator) return null;
                if (key === "additionalFiles") return null;
                if (key === "clientId") return null;
                
                return <td key={`${order.id}_${key}`}>{order[key]}</td>;
              })}
              <td className="action-column">
              <div className="button-container">
                <button className="upload-button" onClick = {() => handleUploadModal(order)}>
                  <FontAwesomeIcon icon={faUpload} />
                </button>
                {isCertificator? <button className="edit-button" onClick={() => handleEditOrder(order)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>:null}
               
                
                {isCertificator? <button className="delete-button" onClick ={() => handleDeleteOrder(order)}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>:null}
               
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedOrder && (
        <EditOrderModal
          isOpen={isModalOpen}
          closeModal={handleCloseModal}
          order={selectedOrder}
          onSave={(updatedOrder) => {
          updateOrder(updatedOrder)
          }}
        />

      )}
      {selectedOrder && (
        <UploadFileModal
          isOpen={isUploadModalOpen}
          closeModal={handleCloseModal}
          order={selectedOrder}
          onSave={(updatedOrder) => {
          updateOrder(updatedOrder)
         
          }}
        />

      )}
      
    </div>
  );
}

export default OrderTable;
