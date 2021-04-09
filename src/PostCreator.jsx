import React from 'react';
import ReactDOM from 'react-dom';

export class PostDisplay extends React.Component {
  constructor(props){
    super(props);
    this.state = {posts: this.props.postsNow, formText: '', user: this.props.user};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(text) {
    this.setState({formText: text})
    
  }
  
  handleSubmit() {

    let currentTime = new Date().toLocaleString();
    let post = {
      text: this.state.formText,
      time: currentTime,
      user: this.props.user
    }
    let postCopy = this.state.posts;
    postCopy.push(post);
    this.setState({posts: postCopy, formText: ''});
    
  }
  
  render() {
    let display = this.state.posts.map((x, i) => {return(<div key={i}>
        <h3>{x.text}</h3>
        <div>{x.user + '    '+ x.time}</div> 
      </div>)})
    return(
      <div>
      <div>{display}
      </div>
        <PostCreator formText={this.state.formText} onFormChange={this.handleChange} onFormSubmit={this.handleSubmit} />
        </div>)
  }
}


export class PostCreator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(e) {
    this.props.onFormChange(e.target.value)
  }
  
  handleSubmit() {
    this.props.onFormSubmit()
  }
  
  render() {
    return(
      <div>
        <input type='text' style={{rows:'5', cols:'40'}} placeholder='Enter post here' value={this.props.formText} onChange={this.handleChange}/>
        <button onClick={this.handleSubmit}>Post</button>
        </div>
      )
  }
}

//let postsHere = [{text: "Hi this is a post", time: "12:26:47", user: "me"}, {text: "Hi this is a post", time: "12:26:47", user: "me"}];
//ReactDOM.render(<PostDisplay postNow={postsHere} user={'me'} />, document.getElementById("root"));