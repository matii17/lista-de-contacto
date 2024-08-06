import { useState } from 'react';
import { Link } from 'react-router-dom';

const ContactForm = ({ contacts, setContacts }) => {
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createContact();
  };

  const createContact = () => {
    fetch("https://playground.4geeks.com/contact/agendas/mati/contacts", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        address: formData.address,
        phone: formData.phone,
        email: formData.email
      })
    })
    .then((response) => response.json())
    .then((data) => {
      setContacts([...contacts, data]);
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
      });
    })
    .catch((error) => console.error('Error creating contact:', error));
  };

  return (
    <div className='row' style={{ minHeight: '100vh' }}>
      <div className='col-2 bg-black'></div>

      <div className="container col-8 d-flex justify-content-center align-items-center">
        <div className="form col-10 bg-white p-5">
          <h1 className="text-center mb-4">Add a New Contact</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="inputname" className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="inputname"
                name="name"
                placeholder="Full name"
                value={formData.name}
                onChange={handleChange}
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
                value={formData.email}
                onChange={handleChange}
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
                value={formData.phone}
                onChange={handleChange}
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
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">Save</button>
          </form>
          <Link to="/" className="d-block mt-3 text-center">or go back to contacts</Link>
        </div>
      </div>
      <div className='col-2 bg-black'></div>
    </div>
  );
};

export default ContactForm;