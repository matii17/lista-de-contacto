import Home from './views/Home'
import AddContact from './views/AddContact'
import EditContact from './views/EditContact';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { useState, useEffect } from "react";



function App() {

  const [Contacts, setContacts] = useState([]);
  const [contactId, setContactId] = useState([]);

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path= '/' element= {<Home 
          Contacts= {Contacts}
          setContacts= {setContacts}
          contactId = {contactId}
          setContactId={setContactId}/>} />
        <Route path= '/add-contact' element= {<AddContact
                  Contacts= {Contacts}
                  setContacts= {setContacts}/>} />
        <Route path="/edit-contact/:id" element={<EditContact 
        Contacts={Contacts} setContacts={setContacts}
        contactId = {contactId}
          setContactId={setContactId} />} />

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App