import React from 'react'

class AddContact extends React.Component {
  state = {
    name: "",
    email: ""
  }

  add = e => {
    e.preventDefault()
    if(this.state.name === '' || this.state.email === '') {
      alert('All Fields are Mandatory!')
      return
    }
    this.props.addContactsHandler(this.state)
    this.setState({name: '', email: ''})
  }
render() {
  return(
    <div className='ui main w_50 m_t'>
      <h2 className='pt-3'>Add Contact</h2>
      <form className='ui form' onSubmit={this.add}>
        <div className="field">
          <label htmlFor="name">Name</label>
          <input type="text" name='name' id='name' placeholder='Name' value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input type="email" name='email' id='email' placeholder='Email' value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} />
        </div>
        <button className='ui button blue'>Add Contact</button>
      </form>
    </div>
  )
}
}

export default AddContact