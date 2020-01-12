import React from 'react';
import beerImage from './beer.svg';
import './App.css';

const Header = () => {
  return (
    <div>
      <header>
        <img src={beerImage} alt="beer" />
        <h1>beerStuff</h1>
      </header>
    </div>
  )
}

const BeersList = ({ list }) => {
  return (
    <div className="list">
      {list.map(beer => <BeerCard key={beer.id} {...beer} />)}
    </div>
  )
}

class BeerCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: false
    }
  }
  toggleLike = () => {
    this.setState({
      isLiked: !this.state.isLiked
    })
  }

  render() {
    return (
      <div className="card">
        <details>
          <summary>{this.props.name} -- {this.props.tagline} </summary>
          <p>{this.props.abv}% ABV</p>
          <p>
            {this.props.description}
          </p>
          <p>
            Pairs well with: {this.props.pairsWith}
          </p>
        </details>
        <button onClick={this.toggleLike} className={this.state.isLiked ? "liked" : ""}>{this.state.isLiked ? "Unlike" : "Like"}</button>
      </div>
    )
  }
}

class App extends React.Component {
  state = {
    beers: [],
    isLoading: true
  }

  componentDidMount() {
    fetch('https://api.punkapi.com/v2/beers')
      .then(response => response.json())
      .then(parsedJSON => parsedJSON.map(beer => (
        {
          id: beer.id,
          name: beer.name,
          tagline: beer.tagline,
          description: beer.description,
          abv: beer.abv,
          pairsWith: beer.food_pairing[0]
        }
      )))
      .then(beers => {
        this.setState({
          beers: beers,
          isLoading: false
        })
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="App">
        <Header />
        <BeersList list={this.state.beers} />
      </div>
    )
  }
}

export default App;
