import React from "react";
import user from "../images/avatar.png";

const ContactList = (props) => {
const deleteContactHandler = ({id}) => {
  props.getContactId(id)
}
  return (
    <div className="ui celled list">
      {props.contacts.map((contact, i) => (
        <div className="d-flex justify-content-between align-items-center border my-3 px-3 py-2 w_50 mx-auto" key={i}>
          <div className="fw-semibold d-flex align-items-center">
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
