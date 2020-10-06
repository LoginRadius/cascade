import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Link, NavLink, withRouter } from "react-router-dom";
import "./Navigation.scss";
import {Nav, Navbar, NavItem} from "reactstrap";

export interface NavigationProps extends RouteComponentProps {
  title: string;
  sections: {
    name: string;
    link: string;
  }[];
}
export interface NavigationState {}

class Navigation extends React.Component<NavigationProps, NavigationState> {
  render() {
    return (
      <Navbar dark expand="lg" color="secondary">
        <div className="container">
              <Link className="navbar-brand" to="/">
                {this.props.title}
              </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#Navbar"
                  aria-controls="Navbar"
                  aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
              <div className="collapse navbar-collapse" id="Navbar">
                <ul className="nav navbar-nav">
                  {this.props.sections.map((section, index) => {
                    return (
                      <li
                        key={index.toString()}
                        className="nav-item"
                        role="presentation"
                      >
                        <Nav pills>
                        <NavItem className={"btn btn-block"}>
                        <NavLink
                          className={
                            "nav-link" +
                            (this.props.location.pathname === section.link
                              ? " active"
                              : "")
                          }
                          to={section.link}
                        >
                          {section.name}
                        </NavLink>
                        </NavItem>
                        </Nav>
                      </li>
                    );
                  })}
                  <NavItem className={"btn text-center btn-block-sm"}>
                    <Link
                        className={"nav-link"}
                        to="/logout"
                    >
                      {"Logout"}
                    </Link>
                  </NavItem>
                </ul>

              </div>


              {config.ENABLE_LOGIN && (
                <Link className={"nav-link ml-auto text-white"} to="/logout">
                  {"Logout"}
                </Link>
              )}
            </div>
      </Navbar>
    );
  }
}

export default withRouter(Navigation);
