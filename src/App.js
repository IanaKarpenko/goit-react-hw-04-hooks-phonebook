import './App.css';
import { useState, useEffect } from 'react';
import { ContactForm } from './components/ContactForm';
import { v4 as uuidv4 } from 'uuid';
import { ContactList } from './components/ContactList';
import { Filter } from './components/Filter';

const App = () => {

  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const existingContacts = localStorage.getItem('contacts') ? JSON.parse(localStorage.getItem('contacts')) : [];
    setContacts(existingContacts);
  }, [])

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    if (contacts.find(contact => contact.name === name)) {
      alert(name + ' is already in contacts');
      return;
    }
    const contact = { id: uuidv4(), name: name, number: number };
    setContacts([...contacts, contact]);
  }

  const getFilteredArray = () => {
    return contacts.filter(contact => contact.name.toUpperCase().includes(filter.toUpperCase()),0);
  }

  const deleteContact = (evt) => {
    const nameForDelete = evt.target.name;
    setContacts(contacts.filter(contact => contact.name !== nameForDelete));
  }

  return (
    <div className="App">
        <header className="App-header">
          <h1>Phonebook</h1>
          <ContactForm onClick={addContact} />
          <h2>Contacts</h2>
          <Filter value={filter} onChange={ evt => setFilter(evt.target.value) }/>
          <ContactList contacts={getFilteredArray()} onDelete={deleteContact} />
        </header>
      </div>
  )
}

export default App;
