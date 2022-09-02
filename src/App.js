import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { v4 } from "uuid";
import api from "../src/api/contacts";
import "./App.css";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";
import Header from "./components/Header";
import ContactDetails from "./components/ContactDetail";
import EditContact from "./components/EditContact";

function App() {
  // const LOCAL_STORAGE_KEY = "CONTACTS";
  const navigate = useNavigate();

  // function to retrieve Contacts
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  // const [contacts, setcontacts] = useState(() => {
  //   const retrievedContacts = JSON.parse(
  //     localStorage.getItem(LOCAL_STORAGE_KEY)
  //   );
  //   if (retrievedContacts) {
  //     return retrievedContacts;
  //   } else return [];
  // });

  const [contacts, setcontacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setcontacts(allContacts);
    };

    getAllContacts();
  }, []);

  // useEffect(() => {
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  // }, [contacts]);

  const addContactsHandler = async (contact) => {
    const request = {
      id: v4(),
      ...contact,
    };
    const response = await api.post("/contacts", request);
    setcontacts([...contacts, response.data]);

    // setcontacts([...contacts, { id: v4(), ...contact }]); LOCAL STORAGE VERSION
  };

  const updateContactsHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id } = response.data;
    setcontacts(
      contacts.map((contact) => {
        return contact.id === id ? response.data : contact;
      })
    );
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setcontacts(newContactList);
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContacts = contacts.filter((contact) => {
      return  Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResult(newContacts)
      // console.log(newContacts);
    }else {
      setcontacts(contacts)
    }
  };

  const location = useLocation();

  return (
    <div className="ui container">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <ContactList
              contacts={searchTerm.length < 1 ? contacts : searchResult}
              getContactId={removeContactHandler}
              term={searchTerm}
              searchHandler={searchHandler}
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
        <Route
          path="/edit"
          element={
            <EditContact
              updateContactsHandler={updateContactsHandler}
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
