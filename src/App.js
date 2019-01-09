import React, { Component } from "react"
import { ModalEndGame } from "./includes/modalEndGame"
import { Alert } from './includes/alert'
import { FailedLetter } from './includes/renderFailedLetter'
import { Gamebody } from './includes/gameBody'
import $ from 'jquery';

	class App extends Component {

		state = {
			words: ['fork', 'foret', 'reactjs', 'rabaa', 'vittel'],
			word: '',
      letter: '',
      isAlreadyTried: false,
      failed: 0,
      maxAttempt: 10,
      failedLetters: [],
      goodLetters: [],
			nbFoundLetter: 0,
      gameState: -1
		}

		start = () => {
			const rand = this.state.words[Math.floor(Math.random() * this.state.words.length)]
	    console.log(rand)
	    this.setState({ letter: '', gameState: -1, word: rand, failedLetters: [], failed: 0, goodLetters: [], nbFoundLetter: 0 })
		}

    isAlreadyTried = (letter) => {
        return this.state.failedLetters.includes(letter) || this.state.goodLetters.includes(letter)
    }

    handleKeyPress = (evt) => {
      if(evt.key == 'Enter' && !this.state.isAlreadyTried){
          this.validateChoosen()
      }
    }

    handleKeyUp = (evt) => {
      const given = evt.target.value
      if(given !== '') {
          this.setState({letter: given, isAlreadyTried: this.isAlreadyTried(given)})
      }
    }

    validateChoosen = () => {
        const choosen = this.state.letter,
              theWord = this.state.word,
							nbLetters = theWord.split("").length,
              letterField = document.getElementById('js-input');

				// if choosen letter is in the word
        if(theWord.includes(choosen)) {
            const found = (theWord.split('')).find(function(element, index) {
                return element === choosen;
            });
						// concat found in goodLetters tab
						const newGoodTab = [...this.state.goodLetters, found]
						//update state with good letter
            this.setState({goodLetters: newGoodTab})
						// check if number of letter already filled : take acount of double and change game state if won
						if(theWord.split("").filter(elt => newGoodTab.includes(elt)).length === nbLetters) this.setState({gameState: 1})
        }
				// if choosen letter is not in the word
				else {
					// update state with failed letter
					this.setState({failed: this.state.failed + 1, failedLetters: [...this.state.failedLetters, choosen]})
					// update game state if game's lost
          if (this.state.failed + 1 === this.state.maxAttempt) this.setState({gameState: 0})
        }
				// empty field and letter state after validation
        letterField.value = ''
				this.setState({letter: ''})
    }

		render() {
	    const { letter, word, goodLetters, isAlreadyTried, failedLetters, gameState, nbFoundLetter } = this.state,
						tabWord = word.split(""),
						gameParameters = {
							tabWord: tabWord,
							goodLetters: goodLetters,
							handleKeyUp: this.handleKeyUp,
							handleKeyPress: this.handleKeyPress,
							testIsAlreadyTried: this.state.isAlreadyTried,
							validateChoosen: this.validateChoosen,
							isAlreadyTried: isAlreadyTried,
							failedAttempt: this.state.failed,
							failedLetters: failedLetters
						}

      if(gameState != -1) {
          $('#js-modal-end').modal('show')
      }

			return (
				<div className="container pt-3">

					<div className="d-flex">
              <h1 className="mr-3">Let's play !</h1>
              <button type="button" className="btn btn-primary" onClick={this.start}>Start a new game</button>
          </div>

					{
					    word != '' ? <Gamebody gameParameters={gameParameters}/> : ''
					}

	        <ModalEndGame gameState={gameState} start={this.start}>
						{ word }
					</ModalEndGame>
				</div>
			)
		}
	}

	export default App
