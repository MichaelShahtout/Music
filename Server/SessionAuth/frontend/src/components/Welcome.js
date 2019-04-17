import React, {Component, Stylesheet} from 'react';
import style
import {Link} from 'react-router-dom';

export default () => (
	<>	
		<h1> Welcome! </h1>
		<br />
		<Link className="auth" id="login" to='/login'> Login </Link>
		<br /> 
		<Link className="auth" id="signup" to='/signup'> Signup </Link>
		<br /> 
		<Link className="auth" id="dashboard" to='/dashboard'> Dashboard </Link>

	</>
	);

let styles = Stylesheet.create( 
	
  .Login {
    	padding: 60 px 0;
  }

  .Login form {
   		margin: 0 auto;
   		max-width: 320 px;
  }


	auth: {

	}

	.login: {
		padding: 60 px 0;

	}

	.loginForm: {
		 margin: 0 auto,
    max-width: 320 px,
	}

	.dashboard: {

	}


	.signup: {
	
	}


);


const ReactCSSTG = React.addons.CSSTransitionGroup;

// Main app
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isVisible: true,
      }
      // Bindings
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemount = this.handleRemount.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      isVisible: false
    }, function() {
      console.log(this.state.isVisible)
    });
    return false;
  }
  handleRemount(e) {
    this.setState({
      isVisible: true
    }, function() {
      console.log(this.state.isVisible)
    });
    e.preventDefault();
  }
  render() {

    // const for React CSS transition declaration
    let component = this.state.isVisible ? <Modal onSubmit={ this.handleSubmit } key='modal'/> : <ModalBack onClick={ this.handleRemount } key='bringitback'/>;

    return <ReactCSSTG transitionName="animation" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
             { component }
           </ReactCSSTG>
  }
}

// Modal
class Modal extends React.Component {
  render() {
    return <div className='Modal'>
              <Logo />
              <form onSubmit= { this.props.onSubmit }>
                <Input type='text' name='username' placeholder='username' />
                <Input type='password' name='password' placeholder='password' />
                <button> Sign In</button>
              </form>
              <div className='social-signin'>
                <button className="fb" onClick={ this.props.onClick }><i className="fa fa-facebook" aria-hidden="true"></i></button>
                <button className="tw" onClick={ this.props.onClick }><i className="fa fa-twitter" aria-hidden="true"></i></button>
              </div>
                <a href='#'>Lost your password ?</a>
           </div>
  }
}

// Generic input field
class Input extends React.Component {
  render() {
    return <div className='Input'>
              <input type={ this.props.type } name={ this.props.name } placeholder={ this.props.placeholder } required autocomplete='false'/>
              <label for={ this.props.name } ></label>
           </div>
  }

}

// Fake logo
class Logo extends React.Component {
	
	 let defaultTooling = useState(0, true);
	 let logo;

	 this.state == true ? logo = "Login to" : logo = "Signup for";

  render() {
    return <div className="logo">
                <i className="fa fa-bug" aria-hidden="true"></i> 
                <span> ${logo} your account</span>
              </div>
  }
}

// Button to brind the modal back
class ModalBack extends React.Component {
  render() {
    return <Button className="bringitback" onTouch={ this.props.onTouch } key={ this.props.className }> Sign Out  </Button> <Route to="../"> Sign Out </Route> 

  }
}
/
class GoBack extends React.Component {

	render() {
		return <Route to="../home"> Return to home </Route> 
	}
}


export const MyReactNativeForm = props => (
  <Formik
    initialValues={{ email: '' }}
    onSubmit={values => console.log(values)}
  >
    {props => (
      <View>
        <TextInput
          onChangeText={props.handleChange('email')}
          onBlur={props.handleBlur('email')}
          value={props.values.email}
        />
        <Button onPress={props.handleSubmit} title="Submit" />
      </View>
    )}
  </Formik>
);


ReactDOM.render(<App />, document.getElementById('app'));
	