
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import ContactContext from '../store/Context';

const EditContactForm = ({ Contacts, setContacts, contactId, setContactId , goHome}) => {

  const {contact, contactActions} = useContext(ContactContext)

  const navigate = useNavigate()

  const {id} = useParams()

  const [contacto, setContacto] = useState([]);

  useEffect(() => {
    setContacto(contact[0]);
  }, ([]))

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://playground.4geeks.com/contact/agendas/mati/contacts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({name: formData.name, email: formData.email, phone: formData.phone, address: formData.address}),

        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      contactActions({ type: "clear" });
      navigate('/');  // Redirect to home
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  return (
    <div className="container">
      <h1>Edit Contact</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="inputname" className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="inputname"
              name="name"
              placeholder="Full name"
              defaultValue={contacto.name}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              name="email"
              placeholder="Email"
              defaultValue={contacto.email}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="inputPhone" className="form-label">Phone</label>
            <input
              type="tel"
              className="form-control"
              id="inputPhone"
              name="phone"
              placeholder="Phone"
              defaultValue={contacto.phone}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="inputAddress" className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              id="inputAddress"
              name="address"
              placeholder="Address"
              defaultValue={contacto.address}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>

        <button type="submit" onSubmit={handleSubmit} className="btn btn-primary m-2">Save</button>

        <Link onClick={() => contactActions({ type: "clear" })} to={"/"}>
            Or get back to contacts
          </Link>

      </form>
    </div>
  );
};

export default EditContactForm;


