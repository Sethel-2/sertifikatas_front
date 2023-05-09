import React, { useState } from 'react';
import './orderTable.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import EditOrderModal from './editModal';



function OrderTable({ headers, orders, setTableOrders }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleStatusChange = (order, event) => {
    const updatedOrder = { ...order, state: event.target.value };
    const updatedOrders = orders.map((o) => (o.id === order.id ? updatedOrder : o));
    setTableOrders(updatedOrders);
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
              {Object.keys(order).map((key) => {
                if (key === 'state') {
                  return (
                    <td key={key}>
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
                return <td key={key}>{order[key]}</td>;
              })}
              <td className="action-column">
              <div className="button-container">
                <button className="edit-button" onClick={() => handleEditOrder(order)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className="delete-button">
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
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
