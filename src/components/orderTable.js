import React, { useState } from 'react';
import './orderTable.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faUpload } from '@fortawesome/free-solid-svg-icons';
import EditOrderModal from './editModal';
import CertificateUploadButton from './certificateUploadButton';
import UploadFileModal from './uploadFileModal';
import { getUser } from '../utils/storage';
import { format } from 'date-fns';
import { uploadFiles } from '../api/file';
import { toast } from 'react-toastify';



function OrderTable({ headers, orders, setTableOrders, updateOrder, columnKeys, deleteOrder, clients }) {
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
  const handleUploadCertificate = async (file, orderId) => {
    const data = {
      type: 'certificate',
      orderId: orderId,
      files: file,
    }
    const {success, message} = await uploadFiles(data)
    if(!success){
      toast.error(message);
      return
    }

  }

  

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
                  return <td key = {`${order._id}_${key}`}>
                    <CertificateUploadButton onUpload={file => handleUploadCertificate(file, order._id)} file = {order.certificateFile}/>
                  </td>
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
      {selectedOrder && (
        <EditOrderModal
          clients={clients}
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
