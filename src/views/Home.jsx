
import React, {useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ContactCard from '../components/ContactCard';
import Modal from '../components/Modal';
import EditContactForm from '../components/EditContactForm';
import ContactContext from '../store/Context';

const Home = ({ id, Contacts, setContacts, contactId, setContactId }) => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  const {contact, contactActions} = useContext(ContactContext);
  


  // Function to handle the deletion of a single contact
  const deleteContact = (id) => {
    setContactToDelete(id);
  };

  // Function to confirm the deletion of a single contact
  const confirmDeleteContact = () => {
    if (contactToDelete !== null) {
      fetch(`https://playground.4geeks.com/contact/agendas/mati/contacts/${contactToDelete}`, {
        method: 'DELETE'
      })
      .then((response) => {
        if (response.ok) {
          setContacts(Contacts.filter(contact => contact.id !== contactToDelete));
        } else {
          console.error('Error deleting contact:', response.statusText);
        }
        setContactToDelete(null);
      })
      .catch((error) => {
        console.error('Error deleting contact:', error);
        setContactToDelete(null);
      });
    }
  };

  // Function to cancel the contact deletion process
  const cancelDeleteContact = () => {
    setContactToDelete(null);
  };

  // Function to handle the deletion of the entire agenda
  const handleDeleteAgenda = () => {
    setModalOpen(true);
  };

  // Function to confirm the deletion of the entire agenda
  const confirmDeleteAgenda = () => {
    fetch('https://playground.4geeks.com/contact/agendas/mati', {
      method: 'DELETE',
    })
    .then((response) => {
      if (response.ok) {
        setContacts([]);
      } else {
        console.error('Error deleting agenda:', response.statusText);
      }
      setModalOpen(false);
    })
    .catch((error) => {
      console.error('Error deleting agenda:', error);
      setModalOpen(false);
    });
  };

  // Function to cancel the agenda deletion process
  const cancelDelete = () => {
    setModalOpen(false);
  };

  // Function to handle the editing of a single contact

  const handleEdit = (contacto) => {
    
    contactActions({type: 'add', payload: contacto});
    navigate(`/edit-contact/${contacto.id}`);
    console.log(contact)
    
  }


  useEffect(() => {
    fetch('https://playground.4geeks.com/contact/agendas/mati', {
      method: 'POST',
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Agenda created:', data);
      console.log(Contacts)
    })
    .catch((error) => console.error('Error creating agenda:', error));

    fetch('https://playground.4geeks.com/contact/agendas/mati/contacts')
    .then((response) => response.json())
    .then((data) => {
      setContacts(data.contacts || []);
    })
    .catch((error) => console.error('Error fetching contacts:', error));
  }, [setContacts]);

  return (
    <div className="container-fluid d-flex flex-column" style={{ minHeight: '100vh' }}>
      <div className="row flex-grow-1">
        <div className="col-2 bg-black" style={{ minHeight: '100vh' }}></div>
        <div className="col-8 d-flex flex-column">
          <div className="d-flex justify-content-end mb-3">
            <button
              className="btn btn-success mt-2 me-3"
              style={{ width: '150px' }}
              onClick={() => navigate("/add-contact")}
            >
              Add new contact
            </button>
            <button
              className="btn btn-danger mt-2 me-3"
              style={{ width: '150px' }}
              onClick={handleDeleteAgenda}
            >
              Delete agenda
            </button>
          </div>
          {Contacts && Contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              id={contact.id}
              name={contact.name}
              phone={contact.phone}
              address={contact.address}
              email={contact.email}
              onDelete={() => deleteContact(contact.id)}
              onEdit={() => handleEdit(contact)} // Pass the ID instead of the whole contact
            />
          ))}
        </div>
        <div className="col-2 bg-black" style={{ minHeight: '100vh' }}></div>
      </div>
      
      {isModalOpen && (
        <Modal
          title="Warning"
          body="Are you sure you want to delete the entire agenda? This action cannot be undone."
          onConfirm={confirmDeleteAgenda}
          onCancel={cancelDelete}
        />
      )}
      
      {contactToDelete && (
        <Modal
          title="Confirm Delete"
          body="Are you sure you want to delete this contact?"
          onConfirm={confirmDeleteContact}
          onCancel={cancelDeleteContact}
        />
      )}

      
    </div>
  );
};

export default Home;

/*
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ContactCard from '../components/ContactCard';
import Modal from '../components/Modal';
import ContactContext from '../store/Context';

const Home = ({ id, Contacts, setContacts, contactId, setContactId }) => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  const { contact, contactActions } = useContext(ContactContext);

  // Function to handle the deletion of a single contact
  const deleteContact = (id) => {
    setContactToDelete(id);
  };

  // Function to confirm the deletion of a single contact
  const confirmDeleteContact = () => {
    if (contactToDelete !== null) {
      fetch(`https://playground.4geeks.com/contact/agendas/mati/contacts/${contactToDelete}`, {
        method: 'DELETE'
      })
        .then((response) => {
          if (response.ok) {
            setContacts(Contacts.filter(contact => contact.id !== contactToDelete));
          } else {
            console.error('Error deleting contact:', response.statusText);
          }
          setContactToDelete(null);
        })
        .catch((error) => {
          console.error('Error deleting contact:', error);
          setContactToDelete(null);
        });
    }
  };

  // Function to cancel the contact deletion process
  const cancelDeleteContact = () => {
    setContactToDelete(null);
  };

  // Function to handle the deletion of the entire agenda
  const handleDeleteAgenda = () => {
    setModalOpen(true);
  };

  // Function to confirm the deletion of the entire agenda
  const confirmDeleteAgenda = () => {
    fetch('https://playground.4geeks.com/contact/agendas/mati', {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setContacts([]);
        } else {
          console.error('Error deleting agenda:', response.statusText);
        }
        setModalOpen(false);
      })
      .catch((error) => {
        console.error('Error deleting agenda:', error);
        setModalOpen(false);
      });
  };

  // Function to cancel the agenda deletion process
  const cancelDelete = () => {
    setModalOpen(false);
  };

  // Function to handle the editing of a single contact
  const handleEdit = (contacto) => {
    contactActions({ type: 'add', payload: contacto });
    navigate(`/edit-contact/${contacto.id}`);
    console.log(contact);
  };

  useEffect(() => {
    // Verificar si la agenda ya existe antes de intentar crearla
    fetch('https://playground.4geeks.com/contact/agendas/mati')
      .then((response) => {
        if (response.status === 404) {
          // Si no existe, crear la agenda
          return fetch('https://playground.4geeks.com/contact/agendas/mati', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: 'mati' }), // Asegúrate de enviar los datos correctos
          });
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          console.log('Agenda:', data);
        }
      })
      .catch((error) => console.error('Error creando o verificando agenda:', error));

    // Obtener los contactos de la agenda
    fetch('https://playground.4geeks.com/contact/agendas/mati/contacts')
      .then((response) => response.json())
      .then((data) => {
        setContacts(data.contacts || []);
      })
      .catch((error) => console.error('Error fetching contacts:', error));
  }, [setContacts]);

  return (
    <div className="container-fluid d-flex flex-column" style={{ minHeight: '100vh' }}>
      <div className="row flex-grow-1">
        <div className="col-2 bg-black" style={{ minHeight: '100vh' }}></div>
        <div className="col-8 d-flex flex-column">
          <div className="d-flex justify-content-end mb-3">
            <button
              className="btn btn-success mt-2 me-3"
              style={{ width: '150px' }}
              onClick={() => navigate("/add-contact")}
            >
              Add new contact
            </button>
            <button
              className="btn btn-danger mt-2 me-3"
              style={{ width: '150px' }}
              onClick={handleDeleteAgenda}
            >
              Delete agenda
            </button>
          </div>
          {Contacts && Contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              id={contact.id}
              name={contact.name}
              phone={contact.phone}
              address={contact.address}
              email={contact.email}
              onDelete={() => deleteContact(contact.id)}
              onEdit={() => handleEdit(contact)} // Pass the ID instead of the whole contact
            />
          ))}
        </div>
        <div className="col-2 bg-black" style={{ minHeight: '100vh' }}></div>
      </div>

      {isModalOpen && (
        <Modal
          title="Warning"
          body="Are you sure you want to delete the entire agenda? This action cannot be undone."
          onConfirm={confirmDeleteAgenda}
          onCancel={cancelDelete}
        />
      )}

      {contactToDelete && (
        <Modal
          title="Confirm Delete"
          body="Are you sure you want to delete this contact?"
          onConfirm={confirmDeleteContact}
          onCancel={cancelDeleteContact}
        />
      )}
    </div>
  );
};

export default Home;
*/