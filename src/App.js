import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { API } from 'aws-amplify';
import { listNotes } from './graphql/queries';
import { createNote as createNoteMutation } from './graphql/mutations';
import { Auth } from 'aws-amplify';
import { PostDisplay, PostCreator } from './PostCreator.jsx';

function App() {

  const [posts, setPosts] = useState([]);
  const [formText, setFormText] = useState('');
  
  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const apiData = await API.graphql({ query: listNotes });
    setPosts(apiData.data.listNotes.items);
  }

  async function createPosts() {
    const user = await Auth.currentAuthenticatedUser();
    let userName = user.username;

    let currentTime = new Date().toLocaleString();
    let post = {
      text: formText,
      time: currentTime,
      user: userName
    }
    await API.graphql({ query: createNoteMutation, variables: { input: post } });
    setPosts([ ...posts, post ]);
    setFormText('');
  }

  function handleChange(e) {
    setFormText(e.target.value);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Social Media Project</h1>
      </header>
      <br />
      <PostDisplay postsNow={posts} />
      <PostCreator formText={formText} onFormChange={handleChange} onFormSubmit={createPosts} />
      <br />
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);