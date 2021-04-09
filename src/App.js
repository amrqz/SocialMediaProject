import logo from './logo.svg';
import './App.css';
import React from 'react';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { PostCreator, PostDisplay } from './PostCreator.jsx'

let postsHere = [{text: "Hi this is a post", time: "12:26:47", user: "me"}, {text: "Hi this is a post", time: "12:26:47", user: "me"}];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Social Media Project</h1>
      </header>
      <PostDisplay posts={postsHere} />
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);
