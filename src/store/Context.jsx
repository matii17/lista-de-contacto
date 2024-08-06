import { createContext, useReducer } from "react";

const ContactContext = createContext(null);

// patron flux
const ContactReducer = (state, action) => {
  // Dependiendo del type de la acción realiza una tarea distinta
  switch (action.type) {
    case "add":
      return [...state, action.payload];
    case 'clear':
      return []
    default:
      return state;
  }
};

// eslint-disable-next-line react/prop-types
export function ContactProvider({ children }) {
  const [contact, contactActions] = useReducer(ContactReducer, []);
  return (
    <ContactContext.Provider value={{ contact, contactActions }}>
      {children}
    </ContactContext.Provider>
  );
}

export default ContactContext;