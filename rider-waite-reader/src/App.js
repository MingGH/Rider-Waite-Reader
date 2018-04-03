import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import './App.css';

class Header extends Component {

  render() {
    return (

      <header>
        <h1><a href="/">The Rider-Waite Reader</a></h1>
      </header>

    )
  }
}
class NotFound404 extends Component {

  render() {
    return (

      <div>
        <h4>Page not found</h4>
      </div>
    )
  }
}

class FormGetAReading extends Component {

  static propTypes = {
    cards: PropTypes.array.isRequired
  }

  state = {
    question: '',
    layout: 'onecard',
    getReading: false,
    redirect: false,
    cardResult: []
  }

  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({[name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();

    // calculate cards
    switch (this.state.layout) {
      case 'onecard':
        this.setState({
          cardResult: this.getCards(1),
          getReading: true
        })
        break;
      case 'threecard':
        this.setState({
          cardResult: this.getCards(3),
          getReading: true
        })
        break;
      case 'directional':
        this.setState({
          cardResult: this.getCards(6),
          getReading: true
        })
        break;
      case 'celticcross':
        this.setState({
          cardResult: this.getCards(10),
          getReading: true
        })
        break;
      case 'treeoflife':
        this.setState({
          cardResult: this.getCards(10),
          getReading: true
        })
        break
      default:
        this.setState({
          cardResult: this.getCards(1),
          getReading: true
        })
    }
  }


  // Return an array with the desired number of cards.
  // Each time a card is chosen, remove it from the deck.
  getCards(howMany) {

    var fullTarotDeck = this.props.cards;
    var numCardsLeftInFullTarotDeck = 78;

    var dealtCards = [];
    var randCard = 0;

    for (var i = 0; i < howMany; i++) {
      randCard = Math.floor(Math.random() * (numCardsLeftInFullTarotDeck - 1) + 1);
      dealtCards.push(fullTarotDeck[randCard]);
      fullTarotDeck.splice(randCard, 1);
      numCardsLeftInFullTarotDeck--;
    }
    console.log(dealtCards);
    return dealtCards
  }

  render() {
    if (this.state.getReading) {
      switch (this.state.layout) {
        case 'onecard':
          return (<LayoutOneCard
                    question={this.state.question}
                    card={this.state.cardResult}
                  />)
        case 'threecard':
          return (<LayoutThreeCard
                    question={this.state.question}
                    cards={this.state.cardResult}
                  />)
        case 'directional':
          return (<LayoutDirectional
                    question={this.state.question}
                    cards={this.state.cardResult}
                  />)
        case 'celticcross':
          return (<LayoutCelticCross
                    question={this.state.question}
                    cards={this.state.cardResult}
                  />)
        case 'treeoflife':
          return (<LayoutTreeOfLife
                    question={this.state.question}
                    cards={this.state.cardResult}
                  />)
        default:
          return (<Redirect to="/" />)
      }
    } else {
      return (
        <div>
          <section className="reading">
            <h1>Get a Reading</h1>
            <form onSubmit={this.handleSubmit}>
              <p>
                Enter your question:
                <input type="text" name="question" onChange={this.handleChange}/>
              </p>
              <p>
                Which layout?<br />
                <input type="radio" name="layout" value="onecard"
                  defaultChecked onChange={this.handleChange}/> One Card
                <input type="radio" name="layout" value="threecard"
                  onChange={this.handleChange}/> Three Cards
                <input type="radio" name="layout" value="directional"
                  onChange={this.handleChange}/> Directional
                <input type="radio" name="layout" value="celticcross"
                  onChange={this.handleChange}/> Celtic Cross
                <input type="radio" name="layout" value="treeoflife"
                  onChange={this.handleChange}/> Tree of Life
              </p>
              <p>
                <input type="submit" value="Read the cards!" />
              </p>
            </form>
          </section>
        </div>
      )
    }
  }
}

class LayoutOneCard extends Component {

  static propTypes = {
    card: PropTypes.array.isRequired,
    question: PropTypes.string.isRequired
  }

  state = {
    card: this.props.card,
    question: this.props.question
  }

  render() {

    const { question } = this.state

    return (
      <div className="reading">
        { question
            ? <h1>{question}</h1>
            : <div>
                <h1>One Card</h1>
                <p>Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo</p>
              </div>
        }
					<div className="flex-row cards">
						<div className="flex-col">
              <div className="item" style={{backgroundImage: `url(${this.props.card[0].path})`}} />
						</div>
					</div>
      </div>

    )
  }
}

class LayoutThreeCard extends Component {

  static propTypes = {
    cards: PropTypes.array.isRequired,
    question: PropTypes.string.isRequired
  }

  state = {
    cards: this.props.cards,
    question: this.props.question
  }

  render() {

    const { question } = this.state

    return (

    <div className="reading">
      { question
          ? <h1>{question}</h1>
          : <div>
              <h1>Three Card</h1>
              <p>Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo</p>
            </div>
      }
      <div className="flex-row cards">
        <div className="flex-col">
          <div className="item" style={{backgroundImage: `url(${this.props.cards[0].path})`}}>
            <h2>Past</h2>
          </div>
        </div>
        <div className="flex-col">
          <div className="item" style={{backgroundImage: `url(${this.props.cards[1].path})`}}>
            <h2>Present</h2>
          </div>
        </div>
        <div className="flex-col">
          <div className="item" style={{backgroundImage: `url(${this.props.cards[2].path})`}}>
            <h2>Future</h2>
          </div>
        </div>
      </div>
      </div>

    )
  }
}

class LayoutDirectional extends Component {

  static propTypes = {
    cards: PropTypes.array.isRequired,
    question: PropTypes.string.isRequired
  }

  state = {
    cards: this.props.cards,
    question: this.props.question
  }

  render() {

    const { question } = this.state

    return (
      <div className="reading">
        { question
            ? <h1>{question}</h1>
            : <div>
                <h1>Directional Spread</h1>
                <p>Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo</p>
              </div>
        }
        <div className="flex-row cards">
          <div className="flex-col">
            <div className="item"
              style={{backgroundImage: `url(${this.props.cards[4].path})`}}>
              <h2>West</h2>
            </div>
          </div>
          <div className="flex-col">
            <div className="item directional-north"
              style={{backgroundImage: `url(${this.props.cards[5].path})`}}>
              <h2>North</h2>
            </div>
            <div className="item directional-center"
              style={{backgroundImage: `url(${this.props.cards[0].path})`}}>
              <h2>Center</h2>
            </div>
            <div className="item rotated directional-union"
              style={{backgroundImage: `url(${this.props.cards[1].path})`}}>
              <h2>Union</h2>
            </div>
            <div className="item"
              style={{backgroundImage: `url(${this.props.cards[3].path})`}}>
              <h2>South</h2>
            </div>
          </div>
          <div className="flex-col">
            <div className="item"
              style={{backgroundImage: `url(${this.props.cards[2].path})`}}>
              <h2>East</h2>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class LayoutCelticCross extends Component {

  static propTypes = {
    cards: PropTypes.array.isRequired,
    question: PropTypes.string.isRequired
  }

  state = {
    cards: this.props.cards,
    question: this.props.question
  }

  render() {

    const { question } = this.state

    return (
    <div className="reading">
        { question
            ? <h1>{question}</h1>
            : <div>
                <h1>Celtic Cross</h1>
                <h1>Directional Spread</h1>
                <p>Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo</p>
              </div>
        }
      <div className="flex-row cards">
        <div className="flex-col">
          <div className="item"
            style={{backgroundImage: `url(${this.props.cards[3].path})`}}>
            <h2>Card 4</h2>
          </div>
        </div>
        <div className="flex-col celticcross-col-second">
          <div className="item"
            style={{backgroundImage: `url(${this.props.cards[4].path})`}}>
            <h2>Card 5</h2>
          </div>
          <div className="item celticcross-card-one"
            style={{backgroundImage: `url(${this.props.cards[0].path})`}}>
            <h2>Card 1</h2>
          </div>
          <div className="item rotated celticcross-card-two"
            style={{backgroundImage: `url(${this.props.cards[1].path})`}}>
            <h2>Card 2</h2>
          </div>
          <div className="item celticcross-card-three"
            style={{backgroundImage: `url(${this.props.cards[2].path})`}}>
            <h2>Card 3</h2>
          </div>
        </div>
        <div className="flex-col celticcross-col-third">
          <div className="item"
            style={{backgroundImage: `url(${this.props.cards[5].path})`}}>
            <h2>Card 6</h2>
          </div>
        </div>
        <div className="flex-col">
          <div className="item taller"
            style={{backgroundImage: `url(${this.props.cards[9].path})`}}>
            <h2>Card 10</h2>
          </div>
          <div className="item taller"
            style={{backgroundImage: `url(${this.props.cards[8].path})`}}>
            <h2>Card 9</h2>
          </div>
          <div className="item taller"
           style={{backgroundImage: `url(${this.props.cards[7].path})`}}>
            <h2>Card 8</h2>
          </div>
          <div className="item taller"
            style={{backgroundImage: `url(${this.props.cards[6].path})`}}>
            <h2>Card 7</h2>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

class LayoutTreeOfLife extends Component {

  static propTypes = {
    cards: PropTypes.array.isRequired,
    question: PropTypes.string.isRequired
  }

  state = {
    cards: this.props.cards,
    question: this.props.question
  }

  render() {

    const { question } = this.state

    return (
      <div className="reading">
        { question
            ? <h1>{question}</h1>
            : <div>
                <h1>Tree of Life</h1>
                <h1>Directional Spread</h1>
                <p>Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo Lorem ipsum deo</p>
              </div>
        }
      <div className="flex-row cards treeoflife-row">
        <div className="flex-col treeoflife-col-one">
          <div className="item taller"
            style={{backgroundImage: `url(${this.props.cards[2].path})`}}>
            <h2>Card 3</h2>
          </div>
          <div className="item taller"
            style={{backgroundImage: `url(${this.props.cards[4].path})`}}>
            <h2>Card 5</h2>
          </div>
          <div className="item taller"
            style={{backgroundImage: `url(${this.props.cards[7].path})`}}>
            <h2>Card 8</h2>
          </div>
        </div>
        <div className="flex-col">
          <a href="http://google.com" target="_blank"><div className="item taller"
            style={{backgroundImage: `url(${this.props.cards[0].path})`}}>
            <h2>Card 1</h2>
          </div></a>
          <div className="item taller treeoflife-card-six"
            style={{backgroundImage: `url(${this.props.cards[5].path})`}}>
            <h2>Card 6</h2>
          </div>
          <div className="item taller"
            style={{backgroundImage: `url(${this.props.cards[8].path})`}}>
            <h2>Card 9</h2>
          </div>
          <div className="item taller"
            style={{backgroundImage: `url(${this.props.cards[9].path})`}}>
            <h2>Card 10</h2>
          </div>
        </div>
        <div className="flex-col treeoflife-col-three">
          <div className="item taller"
            style={{backgroundImage: `url(${this.props.cards[1].path})`}}>
            <h2>Card 2</h2>
          </div>
          <div className="item taller"
            style={{backgroundImage: `url(${this.props.cards[3].path})`}}>
            <h2>Card 4</h2>
          </div>
          <div className="item taller"
            style={{backgroundImage: `url(${this.props.cards[6].path})`}}>
            <h2>Card 7</h2>
          </div>
        </div>
      </div>
      </div>

    )
  }
}

class App extends Component {

  state = {
    cards: [
      { 'name': 'Ace of Cups', 'path': 'img/cups01.jpg'},
      { 'name': 'Two of Cups', 'path': 'img/cups02.jpg'},
      { 'name': 'Three of Cups', 'path': 'img/cups03.jpg'},
      { 'name': 'Four of Cups', 'path': 'img/cups04.jpg'},
      { 'name': 'Five of Cups', 'path': 'img/cups05.jpg'},
      { 'name': 'Six of Cups', 'path': 'img/cups06.jpg'},
      { 'name': 'Seven of Cups', 'path': 'img/cups07.jpg'},
      { 'name': 'Eight of Cups', 'path': 'img/cups08.jpg'},
      { 'name': 'Nine of Cups', 'path': 'img/cups09.jpg'},
      { 'name': 'Ten of Cups', 'path': 'img/cups10.jpg'},
      { 'name': 'Page of Cups', 'path': 'img/cups11.jpg'},
      { 'name': 'Knight of Cups', 'path': 'img/cups12.jpg'},
      { 'name': 'Queen of Cups', 'path': 'img/cups13.jpg'},
      { 'name': 'King of Cups', 'path': 'img/cups14.jpg'},
      { 'name': 'Ace of Swords', 'path': 'img/swords01.jpg'},
      { 'name': 'Two of Swords', 'path': 'img/swords02.jpg'},
      { 'name': 'Three of Swords', 'path': 'img/swords03.jpg'},
      { 'name': 'Four of Swords', 'path': 'img/swords04.jpg'},
      { 'name': 'Five of Swords', 'path': 'img/swords05.jpg'},
      { 'name': 'Six of Swords', 'path': 'img/swords06.jpg'},
      { 'name': 'Seven of Swords', 'path': 'img/swords07.jpg'},
      { 'name': 'Eight of Swords', 'path': 'img/swords08.jpg'},
      { 'name': 'Nine of Swords', 'path': 'img/swords09.jpg'},
      { 'name': 'Ten of Swords', 'path': 'img/swords10.jpg'},
      { 'name': 'Page of Swords', 'path': 'img/swords11.jpg'},
      { 'name': 'Knight of Swords', 'path': 'img/swords12.jpg'},
      { 'name': 'Queen of Swords', 'path': 'img/swords13.jpg'},
      { 'name': 'King of Swords', 'path': 'img/swords14.jpg'},
      { 'name': 'Ace of Wands', 'path': 'img/wands01.jpg'},
      { 'name': 'Two of Wands', 'path': 'img/wands02.jpg'},
      { 'name': 'Three of Wands', 'path': 'img/wands03.jpg'},
      { 'name': 'Four of Wands', 'path': 'img/wands04.jpg'},
      { 'name': 'Five of Wands', 'path': 'img/wands05.jpg'},
      { 'name': 'Six of Wands', 'path': 'img/wands06.jpg'},
      { 'name': 'Seven of Wands', 'path': 'img/wands07.jpg'},
      { 'name': 'Eight of Wands', 'path': 'img/wands08.jpg'},
      { 'name': 'Nine of Wands', 'path': 'img/wands09.jpg'},
      { 'name': 'Ten of Wands', 'path': 'img/wands10.jpg'},
      { 'name': 'Page of Wands', 'path': 'img/wands11.jpg'},
      { 'name': 'Knight of Wands', 'path': 'img/wands12.jpg'},
      { 'name': 'Queen of Wands', 'path': 'img/wands13.jpg'},
      { 'name': 'King of Wands', 'path': 'img/wands14.jpg'},
      { 'name': 'Ace of Pentacles', 'path': 'img/pents01.jpg'},
      { 'name': 'Two of Pentacles', 'path': 'img/pents02.jpg'},
      { 'name': 'Three of Pentacles', 'path': 'img/pents03.jpg'},
      { 'name': 'Four of Pentacles', 'path': 'img/pents04.jpg'},
      { 'name': 'Five of Pentacles', 'path': 'img/pents05.jpg'},
      { 'name': 'Six of Pentacles', 'path': 'img/pents06.jpg'},
      { 'name': 'Seven of Pentacles', 'path': 'img/pents07.jpg'},
      { 'name': 'Eight of Pentacles', 'path': 'img/pents08.jpg'},
      { 'name': 'Nine of Pentacles', 'path': 'img/pents09.jpg'},
      { 'name': 'Ten of Pentacles', 'path': 'img/pents10.jpg'},
      { 'name': 'Page of Pentacles', 'path': 'img/pents11.jpg'},
      { 'name': 'Knight of Pentacles', 'path': 'img/pents12.jpg'},
      { 'name': 'Queen of Pentacles', 'path': 'img/pents13.jpg'},
      { 'name': 'King of Pentacles', 'path': 'img/pents14.jpg'},
      { 'name': 'The Fool', 'path': 'img/tarot-0-fool.jpg'},
      { 'name': 'The Magician', 'path': 'img/tarot-1-magician.jpg'},
      { 'name': 'The High Priestess', 'path': 'img/tarot-2-high-priestess.jpg'},
      { 'name': 'The Empress', 'path': 'img/tarot-3-the-empress.jpg'},
      { 'name': 'The Emperor', 'path': 'img/tarot-4-the-emperor.jpg'},
      { 'name': 'The Hierophant', 'path': 'img/tarot-5-the-hierophant.jpg'},
      { 'name': 'The Lovers', 'path': 'img/tarot-6-the-lovers.jpg'},
      { 'name': 'The Chariot', 'path': 'img/tarot-7-the-chariot.jpg'},
      { 'name': 'Strength', 'path': 'img/tarot-8-strength.jpg'},
      { 'name': 'The Hermit', 'path': 'img/tarot-9-hermit.jpg'},
      { 'name': 'Wheel of Fortune', 'path': 'img/tarot-10-wheel-of-fortune.jpg'},
      { 'name': 'Justice', 'path': 'img/tarot-11-justice.jpg'},
      { 'name': 'The Hanged Man', 'path': 'img/tarot-12-the-hanged-man.jpg'},
      { 'name': 'Death', 'path': 'img/tarot-13-death.jpg'},
      { 'name': 'Temperance', 'path': 'img/tarot-14-temperance.jpg'},
      { 'name': 'The Devil', 'path': 'img/tarot-15-the-devil.jpg'},
      { 'name': 'The Tower', 'path': 'img/tarot-16-the-tower.jpg'},
      { 'name': 'The Star', 'path': 'img/tarot-17-the-star.jpg'},
      { 'name': 'The Moon', 'path': 'img/tarot-18-the-moon.jpg'},
      { 'name': 'The Sun', 'path': 'img/tarot-19-the-sun.jpg'},
      { 'name': 'Judgement', 'path': 'img/tarot-20-judgement.jpg'},
      { 'name': 'The World', 'path': 'img/tarot-21-the-world.jpg'}
    ]
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' render={({ history }) => (
            <div>
              <Header />
              <FormGetAReading cards={this.state.cards}/>
            </div>          )}/>
          <Route path='*' render={({ history }) => (
            <div>
              <Header />
              <NotFound404 />
            </div>
          )}/>
        </Switch>

      </div>
    );
  }
}

export default App;
