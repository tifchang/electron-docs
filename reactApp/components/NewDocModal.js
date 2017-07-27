import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class AddNewDocModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      docName: '',
      docPassword: '',
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  handleSubmit() {
    const createDoc = this.props.createDoc;
    createDoc();  
    this.closeModal();
  }
  render() {
    return (
      <div>
        <button onClick={this.openModal}>Add Document!</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Add a new Document!"
          >

            <h2 ref={subtitle => this.subtitle = subtitle}>Enter a document name and password</h2>

            <form
              onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder="Document Name"
                value={this.state.docName}
                onChange={(e) => this.setState({docName: e.target.value})}
              /> <br></br>
              <input
                type="password"
                placeholder="Document Password"
                value={this.state.docPassword}
                onChange={(e) => this.setState({docPassword: e.target.value})}
              /> <br></br>
              <input
                type="submit"
              />
            </form>
          </Modal>
        </div>
    );
  }


}

export default AddNewDocModal;
