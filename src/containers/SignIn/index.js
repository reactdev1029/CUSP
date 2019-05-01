import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { userSignIn } from '../../actions/Auth';

const styles = (theme, props) => ({
  body_height: {
    height: window.innerHeight,
    width: window.innerWidth
  }
});

class SignIn extends React.Component {
  state = {
    email: '',
    password: ''
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  userSignIn = () => {
    const { email, password } = this.state;
    this.props.userSignIn({ email, password });
  };

  render() {
    const { email, password } = this.state;
    const { loader, error, classes } = this.props;

    let errorText = '';
    if (error) {
      if (error.message) errorText = error.message;
      else if (error.errors) {
        if (error.errors.email) {
          if (error.errors.email[0]) {
            errorText = error.errors.email[0];
          } else {
            errorText = error.errors.email[1];
          }
        } else if (error.errors.password) {
          if (error.errors.password[0]) {
            errorText = error.errors.password[0];
          } else {
            errorText = error.errors.password[1];
          }
        }
      }
    }

    return (
      <div
        className={`d-flex justify-content-center align-items-center ${
          classes.body_height
        }`}
      >
        <div className="app-login-container d-flex justify-content-center align-items-center">
          <div className="app-login-main-content d-flex flex-column align-items-center justify-content-center animated slideInUpTiny animation-duration-3 p-2">
            <Link className="mt-3" to="/" title="CUSP">
              <img
                src="http://via.placeholder.com/177x65"
                alt="cusp"
                title="cusp"
              />
            </Link>
            <div className="app-login-content">
              <div className="app-login-form">
                <form>
                  <fieldset>
                    <TextField
                      error={error ? true : false}
                      label="email"
                      fullWidth
                      onChange={this.handleChange('email')}
                      defaultValue={email}
                      margin="normal"
                      className="my-sm-3"
                    />
                    <TextField
                      error={error ? true : false}
                      type="password"
                      label="password"
                      fullWidth
                      onChange={this.handleChange('password')}
                      defaultValue={password}
                      margin="normal"
                      className="my-sm-3"
                    />
                    {errorText && (
                      <FormHelperText error className="mb-4">
                        {errorText}
                      </FormHelperText>
                    )}
                    <div className="mt-2 d-flex align-items-center justify-content-center">
                      <Button
                        onClick={this.userSignIn}
                        variant="contained"
                        className={`bg-grey ${
                          (email && password) === '' ? 'darken-0' : 'darken-2'
                        } text-white`}
                        disabled={(email && password) === ''}
                      >
                        SIGN IN
                      </Button>
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
          {loader && (
            <div className="loader-view">
              <CircularProgress />
            </div>
          )}
        </div>
      </div>
    );
  }
}

SignIn.propTypes = {
  loader: PropTypes.bool,
  error: PropTypes.any,
  authUser: PropTypes.string,
  userSignIn: PropTypes.func,
  classes: PropTypes.object
};

const mapStateToProps = ({ auth, settings }) => {
  const { loader, error, authUser } = auth;
  return {
    loader,
    error,
    authUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userSignIn: params => dispatch(userSignIn(params))
  };
};

const withStylesProps = styles => Component => props => {
  const Comp = withStyles(theme => styles(theme, props))(Component);
  return <Comp {...props} />;
};

export default withStylesProps(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignIn)
);
