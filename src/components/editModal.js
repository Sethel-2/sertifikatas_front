import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./editModal.css";
import Button from "./button";


Modal.setAppElement("#root");

const EditOrderModal = ({ isOpen, closeModal, onSave, order, clients }) => {
  const [selectedClient, setSelectedClient] = useState(order.client._id);
  const [notes, setNotes] = useState(order.notes);
  const [state, setState] = useState(order.state);
  
  const handleStatusChange = (event) => {
   
    setState(event.target.value);
  };

  const handleSave = () => {
    const updatedOrder=  {
      ...order,
      notes: notes,
      state: state,
      client: selectedClient,
    };                    
    onSave(updatedOrder);
    closeModal();
  };

  useEffect(() => {
    setSelectedClient(order.client._id);
    setNotes(order.notes);
    setState(order.state);
  }, [order])
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Edit Order Modal"
    >
      <h2>Redaguoti užsakymą</h2>
      <form>
        <label>
          Klientai:
          <select
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            
          >
            
            {clients.map((client) => <option value= {client._id}>{client.fullName}</option>)}
          </select>
        </label>
        
        <div className="uploaded-files-container">
         
            
        
        </div>
        <label> Būsena:
        <select
                        className={`status status-${order.state.toLowerCase()}`}
                        value={state}
                        onChange={(event) => handleStatusChange(event)}
                      >
                        <option className="status-not-started" value="Nepradėta">
                          Nepradėta
                        </option>
                        <option className="status-in-progress" value="Vykdoma">
                          Vykdoma
                        </option>
                        <option className="status-completed" value="Užbaigta">
                          Užbaigta
                        </option>
                      </select>
        </label>
        <label>
          Pastabos:
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </label>
        
        <div className="buttons-container">


          <Button className = "link1" text="Išsaugoti" onClick={handleSave} />
          <Button className = "link1" text="Uždaryti" onClick={closeModal} />
        </div>
        
      </form>
    </Modal>
  );
};

export default EditOrderModal;

