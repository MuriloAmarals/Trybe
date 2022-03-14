import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '',
      cardAttr2: '',
      cardAttr3: '',
      cardImage: '',
      cardRare: 'Normal',
      cardTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
      deckMaster: [],
    };

    this.handleOnInputChange = this.handleOnInputChange.bind(this);
    this.handleButtonValidation = this.handleButtonValidation.bind(this);
    this.handleOnSaveButtonClick = this.handleOnSaveButtonClick.bind(this);
    this.handleHasTrunfo = this.handleHasTrunfo.bind(this);
  }

  handleOnInputChange(event) {
    const { target } = event;
    const { name } = target;
    this.setState({
      [name]: target.type === 'checkbox' ? target.checked : target.value,
    }, () => this.handleButtonValidation());
  }

  handleButtonValidation = () => {
    const minNum = 0;
    const maxNum = 90;
    const maxPoints = 210;

    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
    } = this.state;

    if (cardName !== ''
    && cardDescription !== ''
    && cardAttr1 !== ''
    && Number(cardAttr1) >= minNum
    && Number(cardAttr1) <= maxNum
    && cardAttr2 !== ''
    && Number(cardAttr2) >= minNum
    && Number(cardAttr2) <= maxNum
    && cardAttr3 !== ''
    && Number(cardAttr3) >= minNum
    && Number(cardAttr3) <= maxNum
    && Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3) <= maxPoints
    && cardImage !== ''
    ) {
      this.setState({ isSaveButtonDisabled: false });
    } else {
      this.setState({ isSaveButtonDisabled: true });
    }
  }

  handleOnSaveButtonClick(event) {
    event.preventDefault();

    this.setState((prevState) => ({
      deckMaster: [...prevState.deckMaster, {
        cardName: prevState.cardName,
        cardDescription: prevState.cardDescription,
        cardAttr1: prevState.cardAttr1,
        cardAttr2: prevState.cardAttr2,
        cardAttr3: prevState.cardAttr3,
        cardImage: prevState.cardImage,
        cardRare: prevState.cardRare,
        cardTrunfo: prevState.cardTrunfo,
      }],
    }));
    this.handleHasTrunfo();
    this.setState({
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'Normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
    });
  }

  handleHasTrunfo() {
    const { cardTrunfo } = this.state;
    if (cardTrunfo) {
      this.setState({ hasTrunfo: true });
    } else {
      this.setState({ hasTrunfo: false });
    }
  }

  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      deckMaster,
    } = this.state;
    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          onInputChange={ this.handleOnInputChange }
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          hasTrunfo={ hasTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onSaveButtonClick={ this.handleOnSaveButtonClick }
        />
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />
        <ul>
          {deckMaster.map((cardDeck) => (
            <li key={ cardDeck.cardName }>
              <h1>{ cardDeck.cardName }</h1>
              <img
                src={ cardDeck.cardImage }
                alt={ cardDeck.cardName }
              />
              <p>{ cardDeck.cardDescription }</p>
              <ul>
                <li>{ cardDeck.cardAttr1 }</li>
                <li>{ cardDeck.cardAttr2 }</li>
                <li>{ cardDeck.cardAttr3 }</li>
              </ul>
              <p>{ cardDeck.cardRare }</p>
              {cardTrunfo && <p>Super Trunfo</p>}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default App;
