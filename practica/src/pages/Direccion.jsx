import { useState, useEffect } from 'react';
import { getAddresses } from '../services/addressService';

const Direccion = () => {
  const [direcciones, setDirecciones] = useState([]);

  useEffect(() => {
    cargarDirecciones();
  }, []);

  const cargarDirecciones = async () => {
    try {
      const data = await getAddresses();
      if (data) {
        setDirecciones(data);
      }
    } catch (error) {
      console.error("Error al cargar las direcciones:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registro de Direcciones</h2>
      
      <table className="table table-striped mt-4">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>ID Persona</th>
            
            <th>Calle</th>
            <th>Ciudad</th>
          </tr>
        </thead>
        <tbody>
          {direcciones.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">No hay direcciones registradas.</td>
            </tr>
          ) : (
            direcciones.map((dir) => (
              <tr key={dir.id}>
                <td>{dir.id}</td>
                <td>{dir.person_id}</td>
                
                <td>{dir.calle || dir.street}</td> 
                <td>{dir.ciudad || dir.city}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Direccion;