import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "react-loader-spinner";
import styles from "./ContactForm.module.css";
import contactsOperations from "../../redux/contacts/contactsOperations";
import {
  getAllContacts,
  getLoading,
} from "../../redux/contacts/contactsSelectors";

// =================================================
//  HOOKS
// =================================================

export default function ContactForm() {
  const dispatch = useDispatch();
  const isLoadingContacts = useSelector(getLoading);
  const contacts = useSelector(getAllContacts);

  const onFetchContacts = () => dispatch(contactsOperations.fetchContacts());
  useEffect(() => {
    onFetchContacts();
  }, []);

  const [name, setName] = useState("");

  const HandleNameChange = (evt) => {
    setName(evt.target.value);
  };

  const [number, setNumber] = useState("");
  const HandleNumberChange = (evt) => {
    setNumber(evt.target.value);
  };
  const onHandleSubmit = (evt) => {
    evt.preventDefault();
    const addingContact = contacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (addingContact) {
      alert(`${name} is already in contacts`);
      return;
    }
    dispatch(contactsOperations.addContact({ name: name, number: number }));
    setName("");
    setNumber("");
    return;
  };

  return (
    <form className={styles.form} onSubmit={onHandleSubmit}>
      <label className={styles.formName}>
        <span className={styles.formPhonebookText}>Name:</span>
        <input
          className={styles.formInput}
          type="text"
          name="name"
          autoComplete="off"
          placeholder="Enter name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          value={name}
          onChange={HandleNameChange}
          required
        />
      </label>
      <label className={styles.formName}>
        <span className={styles.formPhonebookText}>Phone№:</span>
        <input
          className={styles.formInput}
          type="tel"
          name="number"
          autoComplete="off"
          placeholder="Enter phone number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          value={number}
          onChange={HandleNumberChange}
          required
        />
      </label>
      <button type="submit" className={styles.formButton}>
        Add contact
      </button>
      {isLoadingContacts && (
        <Loader type="ThreeDots" color="#40e0d0" height={70} width={70} />
      )}
    </form>
  );
}

// =================================================
// BEFORE HOOKS
// =================================================

// import React, { Component } from "react";
// import contactsOperations from "../../redux/contacts/contactsOperations";
// import { connect } from "react-redux";
// import Loader from "react-loader-spinner";
// import styles from "./ContactForm.module.css";
// import {
//   getAllContacts,
//   getLoading,
// } from "../../redux/contacts/contactsSelectors";

// class ContactForm extends Component {
//   state = { name: "", number: "" };

//   componentDidMount() {
//     this.props.fetchContacts();
//   }

//   onHandleChange = (e) => {
//     const { name, value } = e.target;
//     this.setState({ [name]: value });
//   };

//   onHandleSubmit = (e) => {
//     e.preventDefault();
//     console.log(`this.props.contacts`, this.props.contacts);
//     const addingContact = this.props.contacts.find(
//       (contact) => contact.name.toLowerCase() === this.state.name.toLowerCase()
//     );
//     if (addingContact) {
//       alert(`${this.state.name} is already in contacts`);
//       return;
//     }
//     this.props.addContact({ ...this.state });
//     this.setState({ name: "", number: "" });
//   };

//   render() {
//     return (
//       <form className={styles.form} onSubmit={this.onHandleSubmit}>
//         <label className={styles.formName}>
//           <span className={styles.formPhonebookText}>Name:</span>
//           <input
//             className={styles.formInput}
//             type="text"
//             name="name"
//             autoComplete="off"
//             placeholder="Enter name"
//             pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//             title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
//             value={this.state.name}
//             onChange={this.onHandleChange}
//             required
//           />
//         </label>
//         <label className={styles.formName}>
//           <span className={styles.formPhonebookText}>Phone№:</span>
//           <input
//             className={styles.formInput}
//             type="tel"
//             name="number"
//             autoComplete="off"
//             placeholder="Enter phone number"
//             pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//             title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
//             value={this.state.number}
//             onChange={this.onHandleChange}
//             required
//           />
//         </label>
//         <button type="submit" className={styles.formButton}>
//           Add contact
//         </button>
//         {this.props.isLoadingContacts && (
//           <Loader type="ThreeDots" color="#40e0d0" height={70} width={70} />
//         )}
//       </form>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   contacts: getAllContacts(state),
//   isLoadingContacts: getLoading(state),
// });

// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchContacts: () => dispatch(contactsOperations.fetchContacts()),
//     addContact: (newContact) =>
//       dispatch(contactsOperations.addContact(newContact)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
