import React, { Component } from "react";
import "./App.less";
import { Switch, Route } from "react-router-dom";

// PAGES & COMPONENTS
import Home from "./pages/Home";
import LoginForm from "./pages/LoginForm";
import Profile from "./pages/Profile";
import PlantsList from "./pages/PlantsList";
import PlantDetail from "./pages/PlantDetail";
import RegistrationForm from "./pages/RegistrationForm";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";

import { Layout, Row, Col } from "antd";
import NotFound from "./pages/NotFound";

const { Header, Content, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <>
        <Layout>
          <Navbar></Navbar>

          <Content
            className="site-layout"
            style={{ padding: "0 10px", marginTop: 114 }}
          >
            <div
              className="site-layout-background"
              style={{ padding: 14, minHeight: "75vh" }}
            >
              <Switch>
                <Route exact path="/" component={Home} />
                <PublicRoute
                  exact
                  path="/signup"
                  component={RegistrationForm}
                />
                <PublicRoute exact path="/login" component={LoginForm} />
                <PrivateRoute exact path="/profile" component={Profile} />
                <PrivateRoute exact path="/search" component={PlantsList} />
                <PrivateRoute
                  exact
                  path="/plant/:latinName"
                  component={PlantDetail}
                />
                <Route component={NotFound} />
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            APLANTIDA ©{new Date().getFullYear()} <br /> Powered by ALIADOS
          </Footer>
        </Layout>
      </>
    );
  }
}

export default App;

//  {/* <Breadcrumb style={{ margin: "16px 0" }}>
//             <Breadcrumb.Item>Home</Breadcrumb.Item>
//             <Breadcrumb.Item>List</Breadcrumb.Item>
//             <Breadcrumb.Item>App</Breadcrumb.Item>
//           </Breadcrumb> */}
