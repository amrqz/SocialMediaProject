import logo from './logo.svg';
import './App.css';
import React from 'react';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { PostDisplay } from './PostCreator.jsx'


function App() {
  const postsHere = [{text: "Hi this is a post", time: "12:26:47", user: "me"}, {text: "Hi this is a post", time: "12:26:47", user: "me"}];
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Social Media Project</h1>
      </header>
      <PostDisplay postsNow={[{text: "Hi this is a post", time: "12:26:47", user: "me"}, {text: "Hi this is a post", time: "12:26:47", user: "me"}]} user="aelyssa" />
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);
