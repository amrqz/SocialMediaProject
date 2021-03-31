export class PostCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(e) {
    this.setState({text: e.target.value})
  }
  
  handleSubmit() {
    currentTime = new Date().toLocaleTimeString();
    post = {
      text: this.state.text,
      time: currentTime,
      user: this.props.userName
    }
  }
  
  render() {
    return(
      <div>
        <h1>Create post</h1>
        <input type='text' placeholder='Enter post here' value={this.state.text} onChange={this.handleChange}/>
        <button onSubmit={this.handleSubmit}>Post</button>
        </div>
      )
  }
}

ReactDOM.render(<PostCreator />, document.getElementById("root"));