import { useNavigate } from "react-router-dom";
import EditContactForm from "../components/EditContactForm"

const EditContact = ({ Contacts, setContacts, contactId, setContactId }) => {

  const navigate = useNavigate()

  const goHome = () => {
    
    navigate('/');
    
  }

  return (
    <EditContactForm
      contacts={Contacts}
      setContacts={setContacts}
      contactId={contactId}
      setContactId={setContactId}
      goHome={() => goHome()}
    />

  )
}

export default EditContact