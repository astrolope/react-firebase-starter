import React, { Component } from 'react'
import { Grid, Menu, Segment, Accordion, Icon, Form, Input, Button, Container, Header, Divider, Statistic, List, Tab, Modal, Message } from 'semantic-ui-react'


import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import firebase from 'firebase';

import {StripeProvider} from 'react-stripe-elements';
import PaymentManager from './PaymentManager';
import SubscriptionPicker from './SubscriptionPicker';

import * as constants from '../../contstants';

const publicKey = constants.STRIPE_KEY;

import moment from 'moment';

import './Settings.css';

export default class SettingsManager extends Component {

  state = { activeItem: 'bio', activeIndex: 0 }

  constructor(props) {
      super(props);

      

      this.state = {
        activeItem: 'bio', 
        activeIndex: 0 , 
        modalOpen: false, 
        deleteModal: false,
        openExchanges: false,
        openAccount: false
      }

      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.userRef = firebase.database().ref('users');
  }

  componentDidMount () {
    let that = this;

    console.log(this.props, this.state);
    if(this.props.location.state.openExchanges) {
      this.setState({openExchanges: true})
    }
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        that.userRef = firebase.database().ref(`users/${user.uid}`);

        that.userRef.on('value', function(data) {
          console.log(data.val())
          that.setState({user: data.val()})
          console.log(that.state);
        });
        console.log(user);
        // ...
      } else {
        // User is signed out.
        this.props.history.push({pathname: '/login', state: { nav: true }});
        
        // ...
      }
    });
  }

  handleSubmit(event) {
    console.log(this.state);

    event.preventDefault();
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    console.log(value);

    this.setState({
      [name]: value
    });
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  changePassword () {
    firebase.auth().sendPasswordResetEmail(this.state.user.email).then(function() {
      // Email sent.
    }).catch(function(error) {
      // An error happened.
      console.log(error);
    });
  }

  deleteAccount = () => {
    var user = firebase.auth().currentUser;

    user.delete().then(function() {
      // User deleted.
      this.props.history.push({pathname: '/login', state: { nav: true }});
      
    }).catch(function(error) {
      // An error happened.
    });
  }

  signOut () {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      this.props.history.push({pathname: '/login', state: { nav: true }});
    }).catch(function(error) {
      // An error happened.
    });
  }

  cancelSubscription = () => {
    firebase.database().ref(`users/${this.state.user.uid}/cancel-plan`).remove();
    firebase.database().ref(`users/${this.state.user.uid}/cancel-plan`).set(true);
    
    this.setState({ modalOpen: false })
  }


  deleteCard = () => {
    firebase.database().ref(`users/${this.state.user.uid}/remove-card`).remove();
    firebase.database().ref(`users/${this.state.user.uid}/remove-card`).set(true);
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  openDeleteAccount = () => this.setState({ deleteModal: true })

  closeDeleteAccount = () => this.setState({ deleteModal: false })

  render() {
    const { activeItem, activeIndex } = this.state
    let stateCopy = this.state;
    this.activePlan = ''
    this.trialDate;

    if(this.state.user) {
      this.loaded = true;
      if(this.state.user.hasCard) {
        this.cardBrand = this.state.user.activeCard.brand.toLowerCase();
      }

      if(this.state.user.subscription) {
        if(this.state.user.subscription.status === 'trialing')
        {
          this.activePlan = 'Trial'
          this.trialDate = this.state.user.subscription.trial_end
        } else {
          this.activePlan = this.state.user.activePlan.plan;
        }
      }
      
    }

    this.panes = [
      { menuItem: 'Overview', render: () => <Tab.Pane>         
         <Header as='h2' icon textAlign='center'>
      <Icon name='settings' circular />
      <Header.Content>
          Overview
      </Header.Content>
      </Header>

      
  </Tab.Pane> 
  },
      { menuItem: 'Account', render: () => <Tab.Pane>
        <Header as='h2' icon textAlign='center'>
      <Icon name='settings' circular />
      <Header.Content>
          Account
      </Header.Content>
      </Header>
      <Divider horizontal>Information</Divider>      <List>
      <List.Item icon='user' content={this.state.user.email} />
      </List>
      <Divider horizontal>Options</Divider>
      <List animated verticalAlign='middle'>
    <List.Item onClick={(e) => this.changePassword(e)}>
      
      <List.Content>
        <List.Header>Change Password</List.Header>
      </List.Content>
    </List.Item>
    <Divider />
    <List.Item onClick={(e) => this.signOut(e)}>
      
      <List.Content>
        <List.Header>Sign Out</List.Header>
      </List.Content>
    </List.Item>
    </List>
    <Divider />
    <Modal
    trigger={<Button onClick={this.openDeleteAccount}>Delete Account</Button>}
    open={this.state.deleteModal}
    onClose={this.closeDeleteAccount}
    basic
    size='small'
  >
    <Header icon='browser' content='Cancel Account' />
    <Modal.Content>
      <h3>Cancel your account? This action is irreversible.</h3>
    </Modal.Content>
    <Modal.Actions>
    <Button onClick={this.closeDeleteAccount} inverted>
        <Icon name='close' /> Nevermind.
      </Button>
      <Button color='red' onClick={this.deleteAccount} inverted>
        <Icon name='checkmark' /> Yes, please.
      </Button>
    </Modal.Actions>
  </Modal>
  
  
      </Tab.Pane> },
      { menuItem: 'Subscription', render: () => <Tab.Pane>
        <Header as='h2' icon textAlign='center'>
      <Icon name='settings' circular />
      <Header.Content>
          Subscription
      </Header.Content>
      </Header>
     
      </Tab.Pane> },
    ]

    return (
        <Container>
            <br/><br/>
            <span>
            <Header as='h2' floated='right'>
            <Link to="/">Back</Link>
    </Header>
    <Header as='h2' className="logo">
      Settings
    </Header>
    </span>
    { this.loaded && <Tab menu={{ fluid: true, vertical: true, secondary: 'true', pointing: true }} panes={this.panes} />}
    
      </Container>
    )
  }
}