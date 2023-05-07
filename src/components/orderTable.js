import React, { useState } from 'react';
import './orderTable.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import EditOrderModal from './editModal';

function OrderTable({ orders, headers }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  return (
    <div className="order-table">
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
          {orders.map((order) => (
            <tr key={order.id}>
              {Object.keys(order).map((key) => (
                <td key={key}>{order[key]}</td>
              ))}
              <td className="action-column">
                <button className="edit-button" onClick={() => handleEditOrder(order)}>
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
      {selectedOrder && (
        <EditOrderModal
          isOpen={isModalOpen}
          closeModal={handleCloseModal}
          order={selectedOrder}
          onSave={(editedOrder) => {
            console.log(editedOrder);
            // handle saving the edited order object here
          }}
        />
      )}
    </div>
  );
}

export default OrderTable;