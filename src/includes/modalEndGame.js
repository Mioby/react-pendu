import React from 'react'

export class ModalEndGame extends React.Component {
    render () {
      return (
        <div id="js-modal-end" className="modal" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                    {
                        this.props.gameState ? 'You won !' : 'You lost...'
                    }
                </h5>
              </div>
              <div className="modal-body">
                { this.props.gameState ? `You found the word ${this.props.children}` : `The word was ${this.props.children}` }
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.props.start}>
                    Start again !
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }
}
