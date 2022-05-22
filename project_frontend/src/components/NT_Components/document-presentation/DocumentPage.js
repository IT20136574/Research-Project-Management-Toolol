import React, { Component } from 'react'
import DisplayDocuments from './DisplayDocuments'

export default class DocumentPage extends Component {

  render() {
    return (
      <div>
          <h3>Document Page</h3>
          <a href='/DocumentUpload'><button>Add Document</button></a><br/>
          <DisplayDocuments/><br/>
      </div>
    )
  }
}
