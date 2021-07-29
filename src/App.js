import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
import Styles from './App.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = (name, number) => {
    if (this.state.contacts.find(contact => contact.name === name)) {
      alert('Attempt to create existing contact!');
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, { id: uuidv4(), name, number }],
    }));
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;

    const normalizeFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter),
    );
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsed = JSON.parse(contacts);
    if (parsed) {
      this.setState({ contacts: parsed });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <div className={Styles.container}>
        <h1 className={Styles.h1}>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2 className={Styles.h2}>Contacts</h2>
        {visibleContacts.length >= 1 && (
          <Filter value={filter} onChange={this.changeFilter} />
        )}
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;