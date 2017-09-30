const React = require('react');
const client = require('../../client');

import {AutoComplete} from '../common/Autocomplete';

export class CreatePositionContainer extends React.Component {

    constructor(props){
        super(props);
        this.state = {position: {
                              roleName     : "",
                              description  : "",
                              requiredSkills : [],
                              minExperienceInYrsRequired      : 1,
                              salaryMax   : 5000,
                              status: "OPEN"
                              }
                     };
        this.positionData ={};
        this.savePosition = this.savePosition.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAutocompleteChange = this.handleAutocompleteChange.bind(this);
    }

    savePosition(){
        client({method: 'POST',
                path: '/api/positions',
                entity: this.positionData,
                headers: {'Content-Type': 'application/json'}
        });
    }

    handleInputChange(e){
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        console.log(value);
        this.positionData[target.name] = value;
    }

    handleAutocompleteChange(skills){
            this.positionData['requiredSkills'] = skills;
        }

    render(){
        return (<div className="modal fade" id="positionCreateModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="positionModalLabel">Create New Position</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <div className="container">
                        <div className="form-group row">
                            <label  className="col-sm-4 col-form-label">Role Name</label>
                            <div className="col-sm-8">
                                <input type="text"  className="form-control"
                                    name="roleName"
                                    defaultValue={this.state.position.roleName}
                                    onChange={this.handleInputChange} />
                             </div>
                        </div>
                        <div className="form-group row">
                            <label  className="col-sm-4 col-form-label">Description</label>
                            <div className="col-sm-8">
                                <input type="text"  className="form-control"
                                    name="description"
                                    defaultValue={ this.state.position.description }
                                    onChange={this.handleInputChange} />
                             </div>
                        </div>
                        <div className="form-group row">
                            <label  className="col-sm-4 col-form-label">Min Experience Required</label>
                            <div className="col-sm-8">
                                <input type="number" className="form-control"
                                    name="minExperienceInYrsRequired"
                                    defaultValue={this.state.position.minExperienceInYrsRequired}
                                    onChange={this.handleInputChange} />
                             </div>
                        </div>
                        <div className="form-group row">
                            <label  className="col-sm-4 col-form-label">Salary Max</label>
                            <div className="col-sm-8">
                                <input type="number"
                                    name="salaryMax" className="form-control"
                                    defaultValue={ this.state.position.salaryMax }
                                    onChange={this.handleInputChange} />
                             </div>
                        </div>
                        <div className="form-group row">
                            <label  className="col-sm-4 col-form-label">Skills</label>
                            <div className="col-sm-8">
                                <AutoComplete defaultSelected={this.state.position.requiredSkills} options={["Java","Scala","Hibernate","Oracle"]} onChange={this.handleAutocompleteChange}/>
                            </div>
                        </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={this.savePosition} data-dismiss="modal">Save changes</button>
                      </div>
                    </div>
                  </div>
                </div>)
    }
}
