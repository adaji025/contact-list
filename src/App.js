import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { v4 } from "uuid";
import api from '../src/api/contacts'
import "./App.css";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";
import Header from "./components/Header";
import ContactDetails from "./components/ContactDetail";

function App() {
  const LOCAL_STORAGE_KEY = "CONTACTS";
  const navigate = useNavigate();

  // function to retrieve Contacts
  const retrieveContacts = async () => {
    const response = await api.get('/contacts')
    return response.data
  }

  // const [contacts, setcontacts] = useState(() => {
  //   const retrievedContacts = JSON.parse(
  //     localStorage.getItem(LOCAL_STORAGE_KEY)
  //   );
  //   if (retrievedContacts) {
  //     return retrievedContacts;
  //   } else return [];
  // });

  const [contacts, setcontacts] = useState([])


  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts()
      if(allContacts) setcontacts(allContacts)
    }

    getAllContacts()
  }, [])

  // useEffect(() => {
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  // }, [contacts]);

  const addContactsHandler = async (contact) => {
    const request =  {
      id: v4(),
      ...contact
    }
    const response = await api.post("/contacts", request)
    setcontacts([...contacts, response.data]);
    
    // setcontacts([...contacts, { id: v4(), ...contact }]); LOCAL STORAGE VERSION
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setcontacts(newContactList);
    console.log(newContactList);
  };


  const location = useLocation()
  console.log(location);
  return (
    <div className="ui container">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <ContactList
              contacts={contacts}
              getContactId={removeContactHandler}
            />
          }
        />
        <Route
          path="/contact/:contactId"
          element={<ContactDetails contacts={contacts} />}
        />
        <Route
          path="/add-contact"
          element={
            <AddContact
              addContactsHandler={addContactsHandler}
              navigate={navigate}
              location={location}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
