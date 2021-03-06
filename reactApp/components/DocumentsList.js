import React from 'react';
import axios from 'axios';
import {Editor, EditorState} from 'draft-js';
import styles from '../styles/styles';
import '../styles/container.scss';
import { Link } from 'react-router-dom';

class DocumentsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documentIds: ['yo'],
      documents: [],
      newDocName: '',
      newDocPassword: '',
      docId: '',
      modalVisible: false
    };
    this.createDoc = this.createDoc.bind(this);
    this.attemptColaboration = this.attemptColaboration.bind(this);
  }

  componentDidMount() {
    console.log("PARAMS", this.props);
    axios({
      method: 'post',
      url: 'http://localhost:3000/docs',
      data: {
        userId: this.props.userId,
      }
    })
    .then((resp) => {
      console.log("DocsList Fetch Response: ", resp);
      this.setState({documentIds: resp.data.user.docs});
    })
    .catch(err => console.log("DocsList Fetch Error Response: ", err));

    var docsObjPromiseArr = this.state.documents.map((doc) => {
      return new Promise(function(res, rej) {
        axios({
          method: 'post',
          url: 'http://localhost:3000/editor',
          data: {
            docId: doc.id
          }
        }, function(err, res) {
          if (err) {
            rej(err);
            return;
          } else {
            res(res);
          }
        });
      });
    });
    this.setState({documents: Promise.all(docsObjPromiseArr)});
  }

  setModalVisible() {
    this.setState({modalVisible: !this.state.modalVisible});
  }

  createDoc() {


    axios({
      method: 'post',
      url: 'http://localhost:3000/createDoc',
      data: {
        title: this.state.newDocName,
        author: this.props.history.username,
        password: this.state.newDoc.password                                                           // TODO: make the doc id = the id generated by mongo
      }
    })
    .then((resp) => {
      console.log("DocsList Fetch Response: ", resp);
      this.setState({documentIds: resp.data.user.docs});
    })
    .catch(err => console.log("DocsList Fetch Error Response: ", err));
  }

  attemptColaboration() {

  }

  render() {


    return(
      <div>

        <h1 style={styles.title}>👋🏼  Hey {this.props.history.username}!</h1>
        <div className="alignRow">
          <input
            type="text"
            value={this.state.newDoc}
            onChange={(e) => {
              this.setState({
                newDocName: e.target.value
              });
            }}
            style={styles.inputBox}
            placeholder="e.g. Asif's Grocery List">
            </input>
            <input
              type="text"
              value={this.state.newDocPassword}
              onChange={(e) => {
                this.setState({
                  newDocPassword: e.target.value
                });
              }}
              style={styles.inputBox}
              placeholder="Document Password">
              </input>
          <button
            style={styles.buttonLong}
            onClick={() => {this.createDoc();}}>
            <span><i className="fa fa-plus-circle" aria-hidden="true"></i> New Document</span>
          </button>
          <input
            type="text"
            style={styles.inputBox}
            placeholder="Document ID here"
            value={this.state.docId}
            onChange={(e) => {
              this.setState({
                docId: e.target.value
              });
            }}>
            </input>
          <button
            style={styles.buttonLongY}
            onClick={() => {this.attemptColaboration()}}>
            <span><i className="fa fa-users" aria-hidden="true"></i> Collaborate</span>
          </button>
        </div>
        <div className="spacer"></div>
        <div className="alignRow">
          <div className="card">
            <h1 style={styles.h2}>My Documents</h1>
            <hr style={styles.hr}></hr>
            {
              // this.state.documents.then((docs) => {
              //   docs.map((doc) => {
              //     if (doc.isOwner) {
              //       // The <p> tags should have Links around them!
              //       return (<p style={styles.p}>{doc.title}</p>);
              //     }
              //   });
              // })
            }
          </div>
          <div className="card2">
            <h1 style={styles.h2}>My Collaborations</h1>
            <hr style={styles.hr}></hr>
            {
              // this.state.documents.then((docs) => {
              //   docs.map((doc) => {
              //     if (doc.isOwner) {
              //       // The <p> tags should have Links around them!
              //       return (<p style={styles.p}>{doc.title} by: <i>{doc.author}</i></p>);
              //     }
              //   });
              // })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default DocumentsList;
