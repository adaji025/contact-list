import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { v4 } from "uuid";
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
    } else return [];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContactsHandler = (contact) => {
    setcontacts([...contacts, { id: v4(), ...contact }]);
    console.log(contacts);
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setcontacts(newContactList);
    console.log(newContactList);
  };

  return (
    <div className="ui container">
      <Header />
      <Routes>
        <Route
          path="/add-contact"
          element={<AddContact addContactsHandler={addContactsHandler} />}
        />
        <Route
          path="/"
          element={
            <ContactList
              contacts={contacts}
              getContactId={removeContactHandler}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
