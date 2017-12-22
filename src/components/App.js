import React, { Component } from 'react';
import { render } from 'react-dom'
import update from 'immutability-helper';
import OptionallyDisplayed from './Util/OptionallyDisplayed.js';

const fieldValidations = {
  first_name: { required: true },
  last_name: { required: true },
  email: { required: true }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values : {
        first_name : "", 
        last_name : "", 
        email : "",
        comments: "",
        chkbox: false
      },
      showErrors: {
        first_name: false,
        last_name: false,
        email: false,
        comments: false,
        chkbox: false
      },
      hasErrors: true
    };

    this.handleFieldChanged = this.handleFieldChanged.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFieldChanged(field) {
    return (e) => {
      let newState = update(this.state, {
        values: {[field]: {$set: e.target.value}},
        showErrors: {[field]: {$set: true}}
      });
      this.setState(newState);
    };
  }

  handleSubmit(event) {
    alert("A comment was submitted with:" + 
    " First Name : " + this.state.values.first_name + "\n" +
    " Last Name : " + this.state.values.last_name + "\n" +
    " Email : " + this.state.values.email + "\n" +
    " Comments : " + this.state.values.comments + "\n" +
    " Subscription : " + this.state.values.chkbox);
    event.preventDefault();
  }

  shouldDisplayError(field) {
    const value = this.state.values[field];
    const isFieldRequired = fieldValidations[field].required;
    const isValidValue = field === "email" ? this.validateEmail(value) : value !== "";
    const showErrors = this.state.showErrors[field];
    const shouldShowError = showErrors && isFieldRequired && !isValidValue;
    return shouldShowError;
  }

  hasValidForm() {
    return this.state.values.first_name !== "" && this.state.values.last_name !== "" && this.validateEmail(this.state.values.email);
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  }

  render() {
    return (
      <div className="form-container">
        <div className="form-title-container">
          <h2 className="form-title">
            Let us know your thoughts.
          </h2>
        </div>
        <form onSubmit={this.handleSubmit}>
        <div className="user-input-container">
          <div className="info-container">
            <label className="input-label">
              <span className="text">First Name</span>
              <input className="input-field" type="text" 
                data-error={this.shouldDisplayError("first_name")} value={this.state.values.first_name} onChange={this.handleFieldChanged("first_name")} />
            </label>
            <OptionallyDisplayed display={this.shouldDisplayError("first_name")}>
              <div className="validation-error">
                <span className="text">First Name Is Required</span>
              </div>
            </OptionallyDisplayed>
            <label className="input-label">
            <span className="text">Last Name</span>
              <input className="input-field" type="text" 
                data-error={this.shouldDisplayError("last_name")} value={this.state.values.last_name} onChange={this.handleFieldChanged("last_name")} />
            </label>
            <OptionallyDisplayed display={this.shouldDisplayError("last_name")}>
              <div className="validation-error">
                <span className="text">Last Name Is Required</span>
              </div>
            </OptionallyDisplayed>
            <label className="input-label">
            <span className="text">Email</span>
              <input className="input-field" type="text"
                data-error={this.shouldDisplayError("email")} value={this.state.values.email} onChange={this.handleFieldChanged("email")} />
            </label>
            <OptionallyDisplayed display={this.shouldDisplayError("email")}>
              <div className="validation-error">
                <span className="text">Not valid Email</span>
              </div>
            </OptionallyDisplayed>
          </div>
          <div className="comments-container">
            <label className="input-label">
              <span className="text">Comments</span>
              <textarea className="input-area" value={this.state.values.comments} onChange={this.handleFieldChanged("comments")} />
            </label>
          </div>
        </div>
        <div className="submit-form-container">
          <label className="input-label">
            <input type="checkbox" defaultChecked={this.state.values.chkbox} onChange={this.handleFieldChanged("chkbox")} />
            Subscribe to follow-up comments for this post
          </label>
          <input className="submit-button" type="submit" data-valid={this.hasValidForm()} value="Submit Comment" />
        </div>
      </form>
      </div>
    );
  }
}

export default App;