import React, { Component } from 'react';
import logo from '../logo3.png';
import Web3 from 'web3';
import './App.css';
import Navbar from './Navbar';

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3();
    console.log("loading blockchain");
    await this.loadBlockchainData();
  }

async loadWeb3() {
  if (window.ethereum){
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  }
  else if (window.web3){
    window.web3 = new Web3(window.web3.currentProvider);
  }
  else {
    window.alert("non ethereum browser detected. You should use MetaMask");
  }
}

async loadBlockchainData() {
  const web3 = window.web3;
  const accounts = await web3.eth.getAccounts()
  console.log(accounts);
  this.setState({ account: accounts[0]});
}

constructor(props) {
  super(props);
  this.state = {
    account: ''
  }
}

  render() {
    return (
      <div>
      <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href="https://images.pexels.com/photos/1447418/pexels-photo-1447418.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={logo} className="App-logo" alt="logo" />
                </a>
                <h1>Sids Eth starter kit</h1>
                <p>
                  Edit <code>src/components/App.js</code> and save to reload.
                </p>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
