import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { API } from 'aws-amplify';
import { listPosts } from './graphql/queries';
import { createPost as createNoteMutation } from './graphql/mutations';
import { Auth } from 'aws-amplify';
import { PostDisplay, PostCreator } from './PostCreator.jsx';

function App() {

  const [posts, setPosts] = useState([]);
  const [formText, setFormText] = useState('');
  
  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const apiData = await API.graphql({ query: listPosts });
    let postList = apiData.data.listPosts.items;
    postList = postList.sort(function(a, b) {
      let dateSplitA = a.split(' ');
      let dateSplitB = b.split(' ');
      dateSplitA[0].replace(',', '');
      dateSplitB[0].replace(',', '');
      dateSplitA[0] = dateSplitA[0].split('/');
      dateSplitB[0] = dateSplitB[0].split('/');
      dateSplitA[1] = dateSplitA[1].split(':');
      dateSplitB[1] = dateSplitB[1].split(':');
      for (let x=2; x>0; x = x-1){
        if (dateSplitA[0][x] !== dateSplitB[0][x]) {
          return dateSplitB[0][x] - dateSplitA[0][x];
        }
      }  
      for (let x=2; x>0; x = x-1){
        if (dateSplitA[1][x] !== dateSplitB[1][x]) {
          return dateSplitB[1][x] - dateSplitA[1][x];
        }
      } 
      return 0;

    });
    setPosts(postList);
  }

  async function createPosts() {
    const user = await Auth.currentAuthenticatedUser();
    let userName = user.username;

    let currentTime = new Date.toLocaleString();
    let post = {
      text: formText,
      time: currentTime,
      user: userName
    }
    await API.graphql({ query: createNoteMutation, variables: { input: post } });
    setPosts([ ...posts, post ]);
    setFormText('');
  }

  function handleChange(value) {
    setFormText(value);
  }

  return (
    <div className="App">
      <header className="App-header">
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