import React, { Component } from 'react'

export default class UserManagementPage extends Component {
  render() {
    return (
      <div className='alignMargin'>
          <ul><li>
                   <a href="/adminpage"> Dashboard</a>
                </li>
                <li>
                   <a href="/adminaccount"> Admin Account</a>
                </li>
                <li>
                   <a href={`/showgroups/${"Accepted"}`}> Allocate Panel member</a>
                </li>
                <li>
                   Submition Types Management
                </li>
                <li>
                    Marking Schemes Management
                </li>
                <li>
                   <a href="/documentPage"> Document/Presentaion</a>
                </li>
                <li>
                   <a href="/student"> Student management</a>
                </li>

                <li>
                    Staff management
                    <ul>
                        <li>
                        <a href={`/staff/${"supervisor"}`}> Supervisor</a>
                        </li>

                        <li>
                        <a href={`/staff/${"co-supervisor"}`}>Co-Supervisor</a>
                        </li>

                        <li>
                         <a href={`/staff/${"panal_member"}`}> Panel Member</a>
                        </li>
                    </ul>
                </li>
          </ul>
      </div>
    )
  }
}
