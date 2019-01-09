import React from 'react'

export class Gamebody extends React.Component {
    render () {
      return (
        <div>
            <p>{this.props.gameParameters.tabWord.length} letters word</p>
            <div className="d-flex justify-content-center">
              {
                this.props.gameParameters.tabWord.map( (value, index) => (
                    <span className="flex-fill text-center border-bottom border-primary py-2 m-3" key={'letter_'+index}>
                        { this.props.gameParameters.goodLetters.includes(value) ? value : '?' }
                    </span>
                  )
                )
              }
            </div>

            <div className="d-flex">
                <div className="input-group m-3 w-25">
                  <input id="js-input" type="text" className="form-control" maxLength="1" placeholder="Give a letter" aria-label="Give a letter" aria-describedby="button-addon2" onChange={this.props.gameParameters.handleKeyUp} onKeyPress={this.props.gameParameters.handleKeyPress}/>
                  <div className="input-group-append">
                    <button disabled={this.props.gameParameters.testIsAlreadyTried} className="btn btn-primary js-btn-submit" type="button" onClick={this.props.gameParameters.validateChoosen}>
                        Try !
                    </button>
                  </div>
                </div>
                { this.props.gameParameters.isAlreadyTried ? <Alert type='warning'>You already tried this letter !</Alert> : null }
            </div>

            <div id="js-message-area">
                <p className="mr-2">Failed attempt : {this.props.gameParameters.failedAttempt}/10</p>
                { this.props.gameParameters.failedLetters.length > 0 ? <FailedLetter>{ this.props.gameParameters.failedLetters.map((value, index) => value) }</FailedLetter> : null }
            </div>
        </div>
      )
    }
  }
