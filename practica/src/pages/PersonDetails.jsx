import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPersonById } from '../services/personService';
import {
  getSocialNetworksByPersonId,
  createSocialNetwork,
  updateSocialNetwork,
  deleteSocialNetwork
} from '../services/socialNetworkService';

import {
  getAddressesByPersonId,
  createAddress,
  updateAddress,
  deleteAddress
} from '../services/addressService';

function PersonDetails() {
  const { id } = useParams();

  const [person, setPerson] = useState(null);

  const [socialNetworks, setSocialNetworks] = useState([]);
  
  const [addresses, setAddresses] = useState([]); 
  const [editingId, setEditingId] = useState(null);
  const [editingAddressId, setEditingAddressId] = useState(null); 
  const [message, setMessage] = useState('');

  const [form, setForm] = useState({
    platform: '',
    username: '',
    url: ''
  });

  
  const [addressForm, setAddressForm] = useState({
    country: '',
    city: '',
    province: '',
    address: ''
  });

  async function loadDetails() {
    try {
      const personData = await getPersonById(id);
      const socialNetworksData = await getSocialNetworksByPersonId(id);
      const addressesData = await getAddressesByPersonId(id); 

      setPerson(personData);
      setSocialNetworks(socialNetworksData);
      setAddresses(addressesData); 
    } catch (error) {
      console.error(error);
      setMessage('Error al cargar el detalle');
    }
  }

  useEffect(() => {
    async function loadInitialData() {
      await loadDetails();
    }

    loadInitialData();
  }, [id]);

  
  function handleChange(event) {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value
    });
  }

  function clearForm() {
    setForm({
      platform: '',
      username: '',
      url: ''
    });

    setEditingId(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.platform || !form.username) {
      setMessage('La plataforma y el usuario son obligatorios');
      return;
    }

    try {
      if (editingId) {
        await updateSocialNetwork(editingId, form);
        setMessage('Red social actualizada correctamente');
      } else {
        await createSocialNetwork({
          person_id: Number(id),
          platform: form.platform,
          username: form.username,
          url: form.url
        });

        setMessage('Red social agregada correctamente');
      }

      clearForm();
      await loadDetails();
    } catch (error) {
      console.error(error);
      setMessage('Error al guardar la red social');
    }
  }

  function handleEdit(network) {
    setEditingId(network.id);

    setForm({
      platform: network.platform,
      username: network.username,
      url: network.url || ''
    });
  }

  async function handleDelete(networkId) {
    const confirmed = window.confirm('¿Deseas eliminar esta red social?');

    if (!confirmed) return;

    try {
      await deleteSocialNetwork(networkId);
      setMessage('Red social eliminada correctamente');
      await loadDetails();
    } catch (error) {
      console.error(error);
      setMessage('Error al eliminar la red social');
    }
  }

  
  function handleAddressChange(event) {
    const { name, value } = event.target;

    setAddressForm({
      ...addressForm,
      [name]: value
    });
  }

  function clearAddressForm() {
    setAddressForm({
      country: '',
      city: '',
      province: '',
      address: ''
    });

    setEditingAddressId(null);
  }

  async function handleAddressSubmit(event) {
    event.preventDefault();

    if (!addressForm.country || !addressForm.city || !addressForm.province || !addressForm.address) {
      setMessage('Todos los campos de la direccion son obligatorios');
      return;
    }

    try {
      if (editingAddressId) {
        await updateAddress(editingAddressId, addressForm);
        setMessage('Direccion actualizada correctamente');
      } else {
        await createAddress({
          person_id: Number(id),
          country: addressForm.country,
          city: addressForm.city,
          province: addressForm.province,
          address: addressForm.address
        });

        setMessage('Direccion agregada correctamente');
      }

      clearAddressForm();
      await loadDetails();
    } catch (error) {
      console.error(error);
      setMessage('Error al guardar la direccion');
    }
  }

  function handleEditAddress(addr) {
    setEditingAddressId(addr.id);

    setAddressForm({
      country: addr.country,
      city: addr.city,
      province: addr.province,
      address: addr.address
    });
  }

  async function handleDeleteAddress(addrId) {
    const confirmed = window.confirm('¿Deseas eliminar esta direccion?');

    if (!confirmed) return;

    try {
      await deleteAddress(addrId);
      setMessage('Direccion eliminada correctamente');
      await loadDetails();
    } catch (error) {
      console.error(error);
      setMessage('Error al eliminar la direccion');
    }
  }

  return (
    <div className="container mt-4">
      <Link to="/personas" className="btn btn-secondary mb-3">
        Volver
      </Link>

      <h1>Detalle de Persona</h1>

      {message && (
        <div className="alert alert-info">
          {message}
        </div>
      )}

      {person && (
        <div className="card mb-4">
          <div className="card-header">
            Datos de la persona
          </div>

          <div className="card-body">
            <p><strong>Nombre:</strong> {person.name}</p>
            <p><strong>Cédula:</strong> {person.cedula}</p>
            <p><strong>Fecha:</strong> {person.birth_date}</p>
          </div>
        </div>
      )}

      <div className="card mb-4">
        <div className="card-header">
          {editingId ? 'Actualizar red social' : 'Agregar red social'}
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">
                  Plataforma
                </label>

                <select
                  className="form-control"
                  name="platform"
                  value={form.platform}
                  onChange={handleChange}
                >
                  <option value="">Seleccione</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Facebook">Facebook</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="GitHub">GitHub</option>
                  <option value="TikTok">TikTok</option>
                </select>
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">
                  Usuario
                </label>

                <input
                  className="form-control"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Ej: soybarrera"
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">
                  URL
                </label>

                <input
                  className="form-control"
                  name="url"
                  value={form.url}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </div>
            </div>

            <button className="btn btn-primary me-2" type="submit">
              {editingId ? 'Actualizar' : 'Agregar'}
            </button>

            {editingId && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={clearForm}
              >
                Cancelar
              </button>
            )}
          </form>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-header">
          Redes sociales registradas
        </div>

        <div className="card-body">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Plataforma</th>
                <th>Usuario</th>
                <th>URL</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {socialNetworks.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    No hay redes sociales registradas
                  </td>
                </tr>
              ) : (
                socialNetworks.map((network) => (
                  <tr key={network.id}>
                    <td>{network.platform}</td>
                    <td>{network.username}</td>
                    <td>
                      {network.url ? (
                        <a
                          href={network.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Abrir
                        </a>
                      ) : (
                        'Sin URL'
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(network)}
                      >
                        Editar
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(network.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      
      <div className="card mb-4 border-success">
        <div className="card-header bg-success text-white">
          {editingAddressId ? 'Actualizar dirección' : 'Agregar dirección'}
        </div>

        <div className="card-body">
          <form onSubmit={handleAddressSubmit}>
            <div className="row">
              <div className="col-md-3 mb-3">
                <label className="form-label">
                  País
                </label>
                <input
                  className="form-control"
                  name="country"
                  value={addressForm.country}
                  onChange={handleAddressChange}
                  placeholder="Ej: Rep. Dominicana"
                />
              </div>

              <div className="col-md-3 mb-3">
                <label className="form-label">
                  Provincia
                </label>
                <input
                  className="form-control"
                  name="province"
                  value={addressForm.province}
                  onChange={handleAddressChange}
                  placeholder="Ej: Duarte"
                />
              </div>

              <div className="col-md-3 mb-3">
                <label className="form-label">
                  Ciudad
                </label>
                <input
                  className="form-control"
                  name="city"
                  value={addressForm.city}
                  onChange={handleAddressChange}
                  placeholder="Ej: San Fco. de Macorís"
                />
              </div>

              <div className="col-md-3 mb-3">
                <label className="form-label">
                  Dirección Exacta
                </label>
                <input
                  className="form-control"
                  name="address"
                  value={addressForm.address}
                  onChange={handleAddressChange}
                  placeholder="Ej: Calle Principal #123"
                />
              </div>
            </div>

            <button className="btn btn-success me-2" type="submit">
              {editingAddressId ? 'Actualizar' : 'Agregar'}
            </button>

            {editingAddressId && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={clearAddressForm}
              >
                Cancelar
              </button>
            )}
          </form>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          Direcciones registradas
        </div>

        <div className="card-body">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>País</th>
                <th>Provincia</th>
                <th>Ciudad</th>
                <th>Dirección</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {addresses.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    No hay direcciones registradas
                  </td>
                </tr>
              ) : (
                addresses.map((addr) => (
                  <tr key={addr.id}>
                    <td>{addr.country}</td>
                    <td>{addr.province}</td>
                    <td>{addr.city}</td>
                    <td>{addr.address}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEditAddress(addr)}
                      >
                        Editar
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteAddress(addr.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default PersonDetails;