import React from 'react'

export class Alert extends React.Component  {
  render() {
    return (
      <div className={`alert alert-${this.props.type} alert-dismissible fade show`} role="alert">
        {this.props.children}
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    )
  }
}
