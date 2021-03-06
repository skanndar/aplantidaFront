import React from "react";
import { Row, Col } from "antd";
import AplantidaIcon from "./../components/AplantidaIcon";
import axiosRequestFunctions from "./auth-service";

const { Consumer, Provider } = React.createContext();

// HOC
function withAuth(WrappedComponent) {
  return function (props) {
    return (
      <Consumer>
        {(valueFromProvider) => (
          <WrappedComponent
            {...props}
            user={valueFromProvider.user}
            isLoggedIn={valueFromProvider.isLoggedIn}
            isLoading={valueFromProvider.isLoading}
            login={valueFromProvider.login}
            signup={valueFromProvider.signup}
            logout={valueFromProvider.logout}
            errorMessage={valueFromProvider.errorMessage}
            me={valueFromProvider.me}
          />
        )}
      </Consumer>
    );
  };
}

class AuthProvider extends React.Component {
  state = {
    user: null,
    isLoggedIn: false,
    isLoading: true,
    errorMessage: undefined,
  };

  componentDidMount() {
    // When app and AuthProvider load for the first time
    // make a call to the server '/me' and check if user is authenitcated

    axiosRequestFunctions
      .me()
      .then((response) => {
        console.log("response from first load :>> ", response);
        const user = response;
        this.setState({
          isLoggedIn: true,
          user,
          errorMessage: undefined,
          isLoading: false,
        });
      })
      .catch((err) =>
        this.setState({
          isLoggedIn: false,
          isLoading: false,
          user: null,
          // errorMessage: "Something went wrong, try again!",
        })
      );
  }

  me = () => {
    axiosRequestFunctions
      .me()
      .then((response) => {
        const user = response;
        this.setState({
          isLoggedIn: true,
          isLoading: false,
          user,
          errorMessage: undefined,
        });
      })
      .catch((err) =>
        this.setState({
          isLoggedIn: false,
          isLoading: false,
          user: null,
          errorMessage: "Something went wrong, try again!",
        })
      );
  };

  login = (email, password) => {
    axiosRequestFunctions
      .login(email, password)
      .then((response) => {
        console.log("response :>> ", response);
        const user = response;
        this.setState({
          isLoggedIn: true,
          isLoading: false,
          user,
          errorMessage: undefined,
        });
      })
      .catch((err) => {
        this.setState({
          isLoggedIn: false,
          isLoading: false,
          errorMessage: "Something went wrong, try again!",
        });
        console.log(err);
      });
  };

  signup = (agreement, confirm, email, fName, genre, lName, password) => {
    axiosRequestFunctions
      .signup(agreement, confirm, email, fName, genre, lName, password)
      .then((response) => {
        const user = response;
        this.setState({
          isLoggedIn: true,
          isLoading: false,
          user,
          errorMessage: undefined,
        });
      })
      .catch((err) => {
        this.setState({
          isLoggedIn: false,
          isLoading: false,
          errorMessage: "Something went wrong, try again!",
        });
        console.log(err);
      });
  };

  logout = () => {
    axiosRequestFunctions
      .logout()
      .then((response) => {
        this.setState({ isLoggedIn: false, isLoading: false, user: null });
      })
      .catch((err) => console.log(err));
  };

  render() {
    // const antIcon = <LoadingOutlined style={{ fontSize: 99 }} spin />;
    const { user, isLoggedIn, isLoading, errorMessage } = this.state;
    const { login, signup, logout, me } = this;

    return (
      <Provider
        value={{
          user,
          isLoggedIn,
          isLoading,
          login,
          signup,
          logout,
          errorMessage,
          me,
        }}
      >
        {isLoading ? (
          <Row className="loading" justify="center" align="middle">
            <Col>
              <AplantidaIcon
                className="logoLoading"
                style={{ fontSize: "200px" }}
              />
              {/* <Spin indicator={antIcon} /> */}
            </Col>
          </Row>
        ) : (
          this.props.children
        )}
      </Provider>
    );
  }
}

export { withAuth, AuthProvider };
