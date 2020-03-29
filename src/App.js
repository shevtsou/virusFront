import React from 'react';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const Text = styled.div`
  font-size: 120px;
  font-weight: bold;
  margin-top: -30%;
  color: red;
`

class App extends React.Component {

  state = {
    count: 669312
  }
  componentDidMount() {
    setInterval(() => {
      fetch("http://localhost:3001/count", {
        headers: {
          'Origin': 'http://localhost:3001',
        }
      })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState((state) => ({
            count: result.infected
          }))
        }
      )
    }, 1000);
  }
  render() {
    return (
      <Wrapper>
        <Text>
          {this.state.count.toFixed(0)}
        </Text>
      </Wrapper>
    );
  }
}

export default App;
