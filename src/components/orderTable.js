import React, { useState } from 'react';
import './orderTable.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faUpload } from '@fortawesome/free-solid-svg-icons';
import EditOrderModal from './editModal';
import UploadFileModal from './uploadFileModal';
import { getUser } from '../utils/storage';
import { format } from 'date-fns';
import LinkButton from './linkButton';
import Button from './button';



function OrderTable({ headers, orders, setOrders, updateOrder, columnKeys, deleteOrder, clients, currentPage, setCurrentPage, nextPageExists }) {
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

  const handleDeleteOrder = (id) => {
   deleteOrder(id);
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
            <tr key={order._id}>
              {columnKeys.map((key) => {
                if (key === 'state' && isCertificator) {
                  return (
                    <td key={`${order._id}_${key}`}>
                      {order[key]}
                    </td>
                  );
                }
                if (key === "certificate"){
                  return order.certificateFile ? <td key={`${order._id}_${key}`}>
                  <LinkButton href = {order.certificateFile.url}>{order.certificateFile.originalname}</LinkButton>
                  </td> : <td key={`${order._id}_${key}`}>-</td>
                }
                if(key === "client" && !isCertificator) return null;
                if(key === "client") return <td key={`${order._id}_${key}`}>{order.client.fullName}</td>;
                if(key === "createdAt") return <td key={`${order._id}_${key}`}>{format(new Date(order[key]), "yyyy-MM-dd; HH:mm")}</td>;
                return <td key={`${order._id}_${key}`}>{order[key]}</td>;
              })}
              <td className="action-column">
              <div className="button-container">
                <button className="upload-button" onClick = {() => handleUploadModal(order)}>
                  <FontAwesomeIcon icon={faUpload} />
                </button>
                {isCertificator? <button className="edit-button" onClick={() => handleEditOrder(order)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>:null}
               
                
                {isCertificator? <button className="delete-button" onClick ={() => handleDeleteOrder(order._id)}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>:null}
               
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '500px', margin: '2rem auto' }}>
        <Button className="link1" text="Atgal" disabled={currentPage === 1}  onClick={() => setCurrentPage(prev => prev - 1)} />
        <div>{currentPage}</div>
        <Button className="link1" text="Toliau" disabled={orders.length === 0 || !nextPageExists} onClick={() => setCurrentPage(prev => prev + 1)} />
      </div>
      {selectedOrder && (
        <EditOrderModal
          clients={clients}
          isOpen={isModalOpen}
          closeModal={handleCloseModal}
          order={selectedOrder}
          setSelectedOrder={setSelectedOrder}
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
          setSelectedOrder={setSelectedOrder}
          updateOrder={(updatedOrder) => {
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
          }}
        />

      )}
      
    </div>
  );
}

export default OrderTable;
