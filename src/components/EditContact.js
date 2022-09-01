import React from "react";

class EditContact extends React.Component {
  constructor(props) {
    super(props)
    const {id, name, email} = props.location.state .contact
    this.state = {
      id,
      name,
      email
    }
  }

  update = (e) => {
    e.preventDefault();
    if (this.state.name === "" || this.state.email === "") {
      alert("All Fields are Mandatory!");
      return;
    }
    this.props.updateContactsHandler(this.state);
    this.setState({ name: "", email: "" });

    this.props.navigate("/");
  };
  render() {
    console.log(this.props.location);
    return (
      <div className="ui main w_50 m_t">
        <h2 className="pt-3">Edit Contact</h2>
        <form className="ui form" onSubmit={this.update}>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </div>
          <button className="ui button blue">Update Contact</button>
        </form>
      </div>
    );
  }
}

export default EditContact;
