import ContactForm from "../components/ContactForm"

const AddContact = ({ Contacts, setContacts }) => {
  return (
    <ContactForm
      contacts={Contacts}
      setContacts={setContacts}
    />
  )
}

export default AddContact