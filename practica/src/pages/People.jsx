import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getPeople,
  createPerson,
  updatePerson,
  deletePerson
} from '../services/personService';

function People() {
  const [people, setPeople] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  const [form, setForm] = useState({
    name: '',
    cedula: '',
    birth_date: ''
  });

  async function loadPeople() {
    try {
      const data = await getPeople();
      setPeople(data);
    } catch (error) {
      console.error(error);
      setMessage('Error al consultar personas');
    }
  }

  useEffect(() => {
    async function loadInitialData() {
      await loadPeople();
    }

    loadInitialData();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value
    });
  }

  function clearForm() {
    setForm({
      name: '',
      cedula: '',
      birth_date: ''
    });

    setEditingId(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.name || !form.cedula || !form.birth_date) {
      setMessage('Todos los campos son obligatorios');
      return;
    }

    try {
      if (editingId) {
        await updatePerson(editingId, form);
        setMessage('Persona actualizada correctamente');
      } else {
        await createPerson(form);
        setMessage('Persona agregada correctamente');
      }

      clearForm();
      await loadPeople();
    } catch (error) {
      console.error(error);
      setMessage('Error al guardar persona');
    }
  }

  function handleEdit(person) {
    setEditingId(person.id);

    setForm({
      name: person.name,
      cedula: person.cedula,
      birth_date: person.birth_date
    });
  }

  async function handleDelete(id) {
    const confirmed = window.confirm('¿Deseas eliminar esta persona?');

    if (!confirmed) return;

    try {
      await deletePerson(id);
      setMessage('Persona eliminada correctamente');
      await loadPeople();
    } catch (error) {
      console.error(error);
      setMessage('Error al eliminar persona');
    }
  }

  return (
    <div className="container mt-4">
      <h1>Personas</h1>

      {message && (
        <div className="alert alert-info">
          {message}
        </div>
      )}

      <div className="card mb-4">
        <div className="card-header">
          {editingId ? 'Actualizar persona' : 'Agregar persona'}
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Nombre</label>

                <input
                  className="form-control"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Ej: María Pérez"
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Cédula</label>

                <input
                  className="form-control"
                  name="cedula"
                  value={form.cedula}
                  onChange={handleChange}
                  placeholder="Ej: 001-1234567-8"
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Fecha de nacimiento</label>

                <input
                  type="date"
                  className="form-control"
                  name="birth_date"
                  value={form.birth_date}
                  onChange={handleChange}
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

      <div className="card">
        <div className="card-header">
          Personas registradas
        </div>

        <div className="card-body">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Cédula</th>
                <th>Fecha</th>
                <th>Detalle</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {people.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    No hay personas registradas
                  </td>
                </tr>
              ) : (
                people.map((person) => (
                  <tr key={person.id}>
                    <td>{person.name}</td>
                    <td>{person.cedula}</td>
                    <td>{person.birth_date}</td>
                    <td>
                      <Link
                        className="btn btn-info btn-sm"
                        to={`/personas/${person.id}`}
                      >
                        Ver redes
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(person)}
                      >
                        Editar
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(person.id)}
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

export default People;