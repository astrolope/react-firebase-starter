// CheckoutForm.js
import React from 'react';
import {injectStripe} from 'react-stripe-elements';

import { Button } from 'semantic-ui-react'

import CardSection from './CardSection';

import firebase from 'firebase';

class CheckoutForm extends React.Component {

  
  handleSubmit = (ev) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();

    let that = this;

    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    var user = firebase.auth().currentUser

    this.cardsRef = firebase.database().ref(`card-tokens/${user.uid}`);

    this.props.stripe.createToken({description: user.uid}).then(({token}) => {

      console.log('Received Stripe token:', token);
      this.cardsRef.push(token);

    });


    // However, this line of code will do the same thing:
    // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        
        <CardSection />
        <br />
        <Button type="submit" primary>Add Card</Button>
      </form>
    );
  }
}

export default injectStripe(CheckoutForm);