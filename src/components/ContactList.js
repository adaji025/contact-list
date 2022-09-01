import React from "react";
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
import user from "../images/avatar.png";

const ContactList = (props) => {
  const navigate = useNavigate()
  const deleteContactHandler = ({ id }) => {
    props.getContactId(id);
  };
  return (
    <div className="ui celled list m_t">
      <div className="d-flex pt-3 justify-content-between align-items-center">
        <h2 className="fw-bold">Contact List</h2>
        <button className="btn btn-secondary py-3 px-4" onClick={() => navigate('/add-contact')}>Add Contact</button>
      </div>
      {props.contacts.map((contact, i) => (
        <div
          className="d-flex justify-content-between align-items-center border my-3 px-3 py-2 w_50 mx-auto"
          key={i}
        >
          {/* <Link to={''}> */}
          <div className="fw-semibold d-flex align-items-center pointer" onClick={() => navigate(`/contact/${contact.id}`, {state:{contact}})}>
            <div className="me-1">
              <img src={user} alt="" className="ui avatar image" />
            </div>
            <div className="">
              <div className="header mb-1">{contact.name}</div>
              <div>{contact.email}</div>
            </div>
          </div>
          {/* </Link> */}
          <div className="icon">
            <i
              className="trash alternate outline icon"
              style={{ color: "red" }}
              onClick={() => deleteContactHandler(contact)}
            ></i>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
