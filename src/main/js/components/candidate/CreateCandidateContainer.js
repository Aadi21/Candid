const React = require('react');
const client = require('../../client');

import {AutoComplete} from '../common/Autocomplete';

export class CreateCandidateContainer extends React.Component {

    constructor(props){
        super(props);
        this.state = {  candidate: {
                              name     : "",
                              email  : "",
                              contactNo        : "",
                              address      : {address1:"", address2:"", city:""},
                              profile      : {}
                              },
                        possibleSkills: [],
                        candidateSkills: []
                     };
        this.loadSkills = this.loadSkills.bind(this);
        this.saveCandidate = this.saveCandidate.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAutocompleteChange = this.handleAutocompleteChange.bind(this);
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

    saveCandidate(){
        client({method: 'POST',
                path: '/api/candidates',
                entity: this.state.candidate,
                headers: {'Content-Type': 'application/json'}
        })
        .then(response => {return response.entity;})
        .then(createdCandidate => {
            if(this.state.candidateSkills.length > 0){
                client({method: 'PUT',
                        path: createdCandidate._links.skills.href,
                        entity: this.state.candidateSkills,
                        headers: {'Content-Type': 'text/uri-list'}
                });
            }
        });
    }

    handleInputChange(e){
            const target = e.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            this.setState({
                candidate: Object.assign({}, this.state.candidate, {[target.name]: value} )
            });
        }

    handleAutocompleteChange(skills){
        this.setState({'candidateSkills': skills});
    }

    render(){
        return (<div className="modal fade" id="candidateCreateModal" tabIndex="-1" role="dialog">
                  <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="candidateModalLabel">Create New Position</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <legend><small>Candidate</small></legend>
                        <div className="container">
                            <div className="form-group form-row">
                                <label  className="col-sm-3 col-form-label">Name</label>
                                <div className="col-sm-9">
                                    <input type="text"  className="form-control"
                                        name="name"
                                        defaultValue={this.state.candidate.name}
                                        onChange={this.handleInputChange} />
                                 </div>
                            </div>
                            <div className="form-group form-row">
                                <label  className="col-sm-3 col-form-label">e-mail</label>
                                <div className="col-sm-9">
                                    <input type="email"  className="form-control"
                                        name="email"
                                        defaultValue={this.state.candidate.email}
                                        onChange={this.handleInputChange} />
                                 </div>
                            </div>
                            <div className="form-group form-row">
                                <label  className="col-sm-3 col-form-label">Contact No</label>
                                <div className="col-sm-9">
                                    <input type="text"  className="form-control"
                                        name="contactNo"
                                        defaultValue={ this.state.candidate.contactNo}
                                        onChange={this.handleInputChange} />
                                 </div>
                            </div>
                            <div className="form-group form-row">
                                <label  className="col-sm-3 col-form-label">Skills</label>
                                <div className="col-sm-9">
                                    <AutoComplete
                                        labelKey={option => `${option.name}`}
                                        defaultSelected={this.state.candidateSkills}
                                        options={this.state.possibleSkills}
                                        onChange={this.handleAutocompleteChange}/>
                                </div>
                            </div>
                        </div>
                        <legend><small>Address</small></legend>

                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={this.saveCandidate} data-dismiss="modal">Save changes</button>
                      </div>
                    </div>
                  </div>
                </div>);
    }
}

//<div className="container">
//                            <div className="form-group form-row">
//                                 <label  className="col-sm-3 col-form-label">Address #1</label>
//                                 <div className="col-sm-9">
//                                     <input type="text"  className="form-control"
//                                         name="address.address1"
//                                         defaultValue={ this.state.candidate.address.address1}
//                                         onChange={e=> this.handleInputChange1({address['address1']: e.target.value})} />
//                                  </div>
//                             </div>
//                             <div className="form-group form-row">
//                                 <label  className="col-sm-3 col-form-label">Address #2</label>
//                                 <div className="col-sm-9">
//                                     <input type="text"  className="form-control"
//                                         name="address.address2"
//                                         defaultValue={ this.state.candidate.address.address2}
//                                         onChange={this.handleInputChange} />
//                                  </div>
//                             </div>
//                             <div className="form-group form-row">
//                                 <label  className="col-sm-3 col-form-label">City</label>
//                                 <div className="col-sm-9">
//                                     <input type="text"  className="form-control"
//                                         name="address.city"
//                                         defaultValue={ this.state.candidate.address.city}
//                                         onChange={this.handleInputChange} />
//                                  </div>
//                             </div>
//                         </div>


