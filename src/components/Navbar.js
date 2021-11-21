import React, { Component } from "react";
import Identicon from "identicon.js";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="https://images.pexels.com/photos/1447418/pexels-photo-1447418.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sid University
        </a>
        <ul className="navbar-nav px-20">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-light">
              <small id="account"> {this.props.account} </small>
            </small>
            {this.props.account ? (
              <img
                className="ml-2"
                alt=""
                width="30"
                height="30"
                src={`data:image/png;base64, ${new Identicon(
                  this.props.account,
                  30
                ).toString()}`}
              />
            ) : (
              <span> YOOOO</span>
            )}
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
