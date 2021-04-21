import React from 'react';
import './PostCreator.css';

export class PostDisplay extends React.Component {

  render() {
    let display = this.props.postsNow.map((x, i) => {return(<div key={i}>
        <h3>{x.text}</h3>
        <div>{x.user + '    '+ x.time}</div> 
      </div>)})
    return(
      <div>{display}
      </div>)    
  }
}


export class PostCreator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) {
    this.props.onFormChange(event.target.value)
  }
  
  handleSubmit() {
    this.props.onFormSubmit()
  }
  
  render() {
    return(
      <div>
        <input type='text' style={{rows:5, cols:40}} placeholder='Enter post here' value={this.props.formText} onChange={this.handleChange}/>
        <button onClick={this.handleSubmit}>Post</button>
        </div>
      )
  }
}