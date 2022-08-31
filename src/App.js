import { useState, useEffect } from "react";
import {v4} from 'uuid'
import "./App.css";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";
import Header from "./components/Header";

function App() {
  const LOCAL_STORAGE_KEY = "CONTACTS";

  const [contacts, setcontacts] = useState(() => {
    const retrievedContacts = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY)
    );
    if (retrievedContacts) {
      return retrievedContacts;
    }else return []
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContactsHandler = (contact) => {
    setcontacts([...contacts, {id: v4(), ...contact}]);
    console.log(contacts);
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter(contact => {
      return contact.id !== id
    })
    setcontacts(newContactList)
    console.log(newContactList);
  }

  

  return (
    <div className="ui container">
      <Header />
      <AddContact addContactsHandler={addContactsHandler} />
      <ContactList contacts={contacts} getContactId={removeContactHandler} />
    </div>
  );
}

export default App;
