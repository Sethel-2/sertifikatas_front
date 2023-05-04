import React from 'react';
import '../orderPage.css';
import { Link } from 'react-router-dom';
import logo from '../images/logo1.png';

function OrderPage() {
  return (
    <div className="background-image">
      <nav>
        <ul>
          <Link className="imageLink" to="/home"><img className="pageLogo" src={logo} alt="Logo" /></Link>
          <li><Link className="link1" to="/order">Užsakymai</Link></li>
          <li><Link className="link1" to="/certificate">Sertifikatai</Link></li>
          <li><Link className="link1" to="/client">Klientai</Link></li>
          <li><Link className="link1" to="/settings">Nustatymai</Link></li>
          <li><Link className="link1" to="/">Atsijungti</Link></li>
        </ul>
      </nav>
      <div className="filter-and-button-container">
        <div className="filter-text-container">
          <div className="filter-container">
            <label>Data</label>
            <button className="filterButton">Rodyti visus</button>
          </div>
          <div className="text-container">
            <label className="dateText">Nuo</label>
            <input></input>
            <label className="dateText">Iki</label>
            <input></input>
            <button className="filterButton">Filtruoti</button>
          </div>
        </div>
        <div className="create-order-button-container">
          <button className="createOrderButton">Sukurti užsakymą</button>
        </div>
      </div>
      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Nr.</th>
              <th>Klientas</th>
              <th>Pastabos</th>
              <th>Būsena</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>202301284555</td>
              <td>Artūras Sabaliauskas</td>
              <td>Trūksta katalizatoriaus</td>
              <td>
                <select>
                  <option class="state-vykdoma" value="Vykdoma">Vykdoma</option>
                  <option class="state-neaktyvi" value="Neaktyvi">Neaktyvi</option>
                  <option class="state-atlikta" value="Atlikta">Atlikta</option>
                </select>
              </td>
              <td>Row 1, Column 5</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderPage;