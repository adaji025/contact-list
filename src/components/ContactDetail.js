import React from "react";
import {useLocation} from 'react-router-dom'
import user from "../images/user.png";

const ContactDetails = (props) => {
  // const contactDet = 
  // const contact = props.contacts.find();

  const location = useLocation()
  const {contact} = location.state

  return (
    <div className="m_t">
      <h2 className="py-3">Contact Details</h2>
      <div className="main">
        {/* {contact.map((item) => ( */}
          <div className="ui card centered">
            <div className="image">
              <img src={user} alt="user" />
              {/* {console.log(item)} */}
            </div>
            <div className="content">
              <div className="header">{contact.name}</div>
              <div className="description">{contact.email}</div>
            </div>
          </div>
        {/* ))} */}
      </div>
    </div>
  );
};

export default ContactDetails;
