import React from 'react';
import '../orderPage.css';
import FilterSection from '../components/dateFilter.js';
import Navbar from '../components/navbar';
import OrderTable from '../components/orderTable';
import CertificateUploadButton from '../components/certificateUploadButton';


function OrderPage() {
  

  const handleFilter = (startDate, endDate) => {
  };

  const handleShowAll = () => {
  };
  const orders = [
    {
      id: '202301284555',
      client: 'Artūras Sabaliauskas',
      notes: 'Trūksta katalizatoriaus',
      
      state: 'Vykdoma',
      certificate: <CertificateUploadButton onUpload={(file) => console.log(file)} />,
      createdAt: '2023-05-02',
      
    },
    // Add more orders here
  ];
  
  const headers = ['Nr.', 'Klientas', 'Pastabos', 'Sukurta', 'Sertifikatas', 'Būsena', ];

  

  return (
    <div className="background-image">
      <Navbar/>
      <FilterSection
        handleFilter={handleFilter}
        handleShowAll={handleShowAll}
        addButtonLabel="Pridėti užsakymą"
      />
      <OrderTable orders={orders} headers={headers} />
     
    </div>
  );
}

export default OrderPage;