
import React, { Component } from 'react'
import { Dropdown, Icon, Label } from 'semantic-ui-react'

import firebase from 'firebase';


export default class ProfileDropdown extends Component {
  state = { searchQuery: '' }

  constructor(props) {
    super(props);

    let that = this;

    this.user;

    
  }

  componentDidMount () {
    var user = firebase.auth().currentUser
    this.setState({user: user})
  }

  
  handleChange = (e, { searchQuery, value }) => {
    console.log(value);

    if(value === 'login') {
      this.props.router.push({pathname: '/login', state: { nav: true }});
    }

    if(value === 'register') {
      this.props.router.push({pathname: '/register', state: { nav: true }});
    }

    if(value === 'signout') {
      //TODO: signout of firebase account
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
        this.props.router.push({pathname: '/login', state: { nav: true }});
      }).catch(function(error) {
        // An error happened.
      });
    }

    if(value === 'settings') {
      //TODO: redirect to settings
      this.props.router.push({pathname: '/settings', state: { nav: true }});
    }

    this.setState({ searchQuery, value })
  }

  handleSearchChange = (e, { searchQuery }) => this.setState({ searchQuery })

  render() {
    const { searchQuery, value } = this.state

    this.activePlan = ''

    if(this.props.user) {
      if(this.props.user.subscription) {
        if(this.props.user.subscription.status === 'trialing')
        {
          this.activePlan = 'Trial'
        } else {
          this.activePlan = this.props.user.activePlan.plan;
        }
      }
    }

    this.options = [
      {
        key: 'user',
        text: <span><strong>{this.props.user.email} <Label>{this.activePlan}</Label></strong></span>,
        disabled: true,
      },
      { key: 'settings', text: 'Settings', value: 'settings' },

      { key: 'signout', text: 'Sign Out', value: 'signout' },
   
    ]

    this.user = firebase.auth().currentUser

    let that = this;
  
    this.trigger = (
      <span>
        <Icon name='settings' size="large" />
      </span>
    )

    return (
      <Dropdown trigger={this.trigger} options={this.options} onChange={this.handleChange} />
    )
  }
}

