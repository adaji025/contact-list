import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import user from "../images/avatar.png";

const ContactList = (props) => {
  const navigate = useNavigate();

  const deleteContactHandler = ({ id }) => {
    props.getContactId(id);
  };

  const inputRef = useRef();
  const getSearchTerm = () => {
    props.searchHandler(inputRef.current.value)
  };

  return (
    <div className="ui celled list m_t">
      <div className="d-flex pt-3 justify-content-between align-items-center">
        <h2 className="fw-bold">Contact List</h2>
        <button
          className="btn btn-secondary py-3 px-4"
          onClick={() => navigate("/add-contact")}
        >
          Add Contact
        </button>
      </div>
      <div className="w-100 my-3">
        <div className="ui search">
          <div className="ui icon input">
            <input
              type="text"
              placeholder="Search"
              className="prompt"
              value={props.term}
              onChange={getSearchTerm}
              ref={inputRef}
            />
            <i className="search icon"></i>
          </div>
        </div>
      </div>
      {props.contacts.map((contact, i) => (
        <div
          className="d-flex justify-content-between align-items-center border my-3 px-3 py-2 w_50 mx-auto"
          key={i}
        >
          <div
            className="fw-semibold d-flex align-items-center pointer"
            onClick={() =>
              navigate(`/contact/${contact.id}`, { state: { contact } })
            }
          >
            <div className="me-1">
              <img src={user} alt="" className="ui avatar image" />
            </div>
            <div className="">
              <div className="header mb-1">{contact.name}</div>
              <div>{contact.email}</div>
            </div>
          </div>
          <div className="icon">
            <i
              className="edit alternate outline icon"
              style={{ color: "blue", cursor: "pointer" }}
              // onClick={() => deleteContactHandler(contact)}
              onClick={() => navigate("/edit", { state: { contact } })}
            ></i>

            <i
              className="trash alternate outline icon"
              style={{ color: "red", marginLeft: "10px", cursor: "pointer" }}
              onClick={() => deleteContactHandler(contact)}
            ></i>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
