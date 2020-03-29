import React from 'react';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
const Text = styled.div`
  font-size: 3rem;
  font-weight: bold;
`

const SoftText = styled(Text)`
  color: #389acf;
`

const ValuesText = styled.div`
  font-size: 5rem;
  font-weight: bold;
  color: red;
  margin-bottom: 50px;
`

class App extends React.Component {

  state = {
    infected: 0,
    views: 0,
    chance: 0,
    fetched: false,
  }
  componentDidMount() {
    fetch("http://localhost:3001/visit");
    setInterval(() => {
      fetch("http://localhost:3001/count", {
        headers: {
          'Origin': 'http://localhost:3001',
        }
      })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          this.setState((state) => ({
            infected: result.infected,
            views: result.visitors,
            chance: result.chance,
            fetched: true
          }))
        }
      )
    }, 1000);
  }
  render() {
    return (
      <Wrapper>
        { this.state.fetched ? (
          <>
            <Text>
              Views
            </Text>
            <ValuesText>
              {this.state.views.toFixed(0)}
            </ValuesText>
            <Text>
              Infected
            </Text>
            <ValuesText>
              {this.state.infected.toFixed(0)}
            </ValuesText>
            <Text>
              Infection chance
            </Text>
            <ValuesText>
              {(this.state.chance * 100).toFixed(3)}%
            </ValuesText>
          </>
        ): (
          <SoftText>Be careful...</SoftText>
        )}
        
      </Wrapper>
    );
  }
}

export default App;
