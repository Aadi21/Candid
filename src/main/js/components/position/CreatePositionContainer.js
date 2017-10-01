const React = require('react');
const client = require('../../client');

import {AutoComplete} from '../common/Autocomplete';

export class CreatePositionContainer extends React.Component {

    constructor(props){
        super(props);
        this.state = {  position: {
                              roleName     : "",
                              description  : "",
                              minExperienceInYrsRequired      : 1,
                              salaryMax   : 5000,
                              status: "OPEN"
                              },
                        possibleSkills: [],
                        requiredSkills: [],
                        interviewRounds: [{type: "", order:""}]
                     };
        this.positionData ={};
        this.loadSkills = this.loadSkills.bind(this);
        this.savePosition = this.savePosition.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAutocompleteChange = this.handleAutocompleteChange.bind(this);
        this.handleInterviewTypeChange = this.handleInterviewTypeChange.bind(this);
    }

    loadSkills(){
        client({method: 'GET', path: '/api/skills'})
        .done(response => {
            this.setState({possibleSkills: response.entity._embedded.skills})
        });
    }
    componentDidMount(){
        this.loadSkills();
    }

    savePosition(){
        client({method: 'POST',
                path: '/api/positions',
                entity: this.positionData,
                headers: {'Content-Type': 'application/json'}
        })
        .then(response => {return response.entity;})
        .then(createdPosition => {
            client({method: 'PUT',
                    path: createdPosition._links.requiredSkills.href,
                    entity: this.state.requiredSkills,
                    headers: {'Content-Type': 'text/uri-list'}
            });
            this.state.interviewRounds.forEach(r => {
                client({method: 'POST',
                        path: '/api/interviewRounds',
                        entity: r,
                        headers: {'Content-Type': 'application/json'}
                }).then(response =>{
                    client({method: 'PUT',
                            path: response.entity._links.position.href,
                            entity: createdPosition,
                            headers: {'Content-Type': 'text/uri-list'}
                    });
                })
            });
        });


    }

    handleInputChange(e){
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.positionData[target.name] = value;
    }

    handleAutocompleteChange(skills){
        this.setState({'requiredSkills': skills});
    }
    showNewInterview(){
        this.setState({interviewRounds: this.state.interviewRounds.concat([{type: "", order:""}])});
    }
    handleInterviewTypeChange(changedIdx){
        console.log(changedIdx);
        return (e) => {
            console.log(e.target.value);
            const rounds = this.state.interviewRounds.map((round, idx) => {
                if(idx !== changedIdx) return round;
                return {type: e.target.value, order: idx};
            });
            this.setState({interviewRounds: rounds});
        };
    }
    render(){
        return (<div className="modal fade" id="positionCreateModal" tabIndex="-1" role="dialog">
                  <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="positionModalLabel">Create New Position</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <legend><small>Position</small></legend>
                        <div className="container">
                            <div className="form-group form-row">
                                <label  className="col-sm-3 col-form-label">Role Name</label>
                                <div className="col-sm-9">
                                    <input type="text"  className="form-control"
                                        name="roleName"
                                        defaultValue={this.state.position.roleName}
                                        onChange={this.handleInputChange} />
                                 </div>
                            </div>
                            <div className="form-group form-row">
                                <label  className="col-sm-3 col-form-label">Description</label>
                                <div className="col-sm-9">
                                    <input type="text"  className="form-control"
                                        name="description"
                                        defaultValue={ this.state.position.description }
                                        onChange={this.handleInputChange} />
                                 </div>
                            </div>
                            <div className="form-group form-row">
                                <label  className="col-sm-3 col-form-label">Experience Required</label>
                                <div className="col-sm-3">
                                    <input type="number" className="form-control"
                                        name="minExperienceInYrsRequired"
                                        defaultValue={this.state.position.minExperienceInYrsRequired}
                                        onChange={this.handleInputChange} />
                                </div>
                                <label  className="col-sm-3 col-form-label">Salary Max</label>
                                <div className="col-sm-3">
                                     <input type="number"
                                         name="salaryMax" className="form-control"
                                         defaultValue={ this.state.position.salaryMax }
                                         onChange={this.handleInputChange} />
                                </div>
                            </div>
                            <div className="form-group form-row">
                                <label  className="col-sm-3 col-form-label">Skills</label>
                                <div className="col-sm-9">
                                    <AutoComplete
                                        labelKey={option => `${option.name}`}
                                        defaultSelected={this.state.position.requiredSkills}
                                        options={this.state.possibleSkills}
                                        onChange={this.handleAutocompleteChange}/>
                                </div>
                            </div>
                        </div>
                        <legend><small>Interview Rounds</small></legend>
                        <div className="container">
                            {this.state.interviewRounds.map((interview,idx) =>
                                <AddInterviewRoundForm key={idx}
                                    round={interview}
                                    handleInterviewTypeChange={this.handleInterviewTypeChange(idx)}
                                    handleAddAnother={this.showNewInterview.bind(this)} />
                            )}
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={this.savePosition} data-dismiss="modal">Save changes</button>
                      </div>
                    </div>
                  </div>
                </div>);
    }
}


class AddInterviewRoundForm  extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
        <div className="form-group form-row">
            <label  className="col-sm-2 col-form-label">Type</label>
            <div className="col-sm-3">
                <input type="text" className="form-control"
                                defaultValue={this.props.round.type}
                                onChange={this.props.handleInterviewTypeChange} />
            </div>
            <label  className="col-sm-2 col-form-label">Order</label>
            <div className="col-sm-3">
                <input type="number" className="form-control"
                            defaultValue={this.props.round.order} />
            </div>
            <div className="col-sm-2">
                <button type="button" className="btn btn-secondary" onClick={this.props.handleAddAnother}>Add Another</button>
            </div>
        </div>
        );
    }
}