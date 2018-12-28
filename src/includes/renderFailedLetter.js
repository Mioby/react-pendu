import React from 'react'

export class FailedLetter extends React.Component {
  render() {
    return (
      <div className="w-100 text-bold">
          <p>Letter you already tried :
              <span className="text-uppercase"> { this.props.children }</span>
          </p>
      </div>
    )
  }
}
