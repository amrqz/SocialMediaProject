import logo from './logo.svg';
import './App.css';
import React from 'react';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { PostDisplay } from './PostCreator.jsx'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Social Media Project</h1>
      </header>
      <PostDisplay postsNow={[]} user="aelyssa" />
      <br />
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);
