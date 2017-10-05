const React = require('react');
const client = require('../../client');

import FormAutoComplete from '../common/FormAutoComplete';
import BootLabelField from '../common/BootLabelField';

import { Form, Text, Select, Textarea, Checkbox, Radio, RadioGroup, NestedForm, FormError } from 'react-form'

export class CreateCandidateContainer extends React.Component {

    constructor(props){
        super(props);
        this.state = {  possibleSkills: []
                     };
        this.form = {};
        this.loadSkills = this.loadSkills.bind(this);
        this.saveCandidate = this.saveCandidate.bind(this);
    }

    loadSkills(){
        client({method: 'GET', path: '/api/skills'})
        .done(response => {
            this.setState({
                possibleSkills: response.entity._embedded.skills.map((s) => {
                    return {'value': s._links.self.href, 'label': s.name};
                })
            })
        });
    }
    componentDidMount(){
        this.loadSkills();
    }

    saveCandidate(vals){
        client({method: 'POST',
                path: '/api/candidates',
                entity: vals,
                headers: {'Content-Type': 'application/json'}
        })
        .then(response => response.entity )
        .then(createdCandidate => {
            if(vals.candidateSkills.length > 0){
                client({method: 'PUT',
                        path: createdCandidate._links.skills.href,
                        entity: vals.candidateSkills.map(o => { return {'_links': {'self': {'href': o.value}}}; }),
                        headers: {'Content-Type': 'text/uri-list'}
                });
            }
        });
    }

    render(){
        const AddressForm = (
                <Form validate={values => {
                            return {
                              address1: !values.address1 ? 'A address1 is required' : undefined,
                              city: !values.city ? 'A city is required' : undefined,
                              country: !values.country ? 'A country is required' : undefined
                            }
                          }}
                >
                    <div>
                        <legend><small>Address</small></legend>
                        <BootLabelField label="Street" field={<Text field='address1' placeholder='Street' className="form-control"/>} />
                        <BootLabelField label="City" field={<Text field='city' placeholder='City' className="form-control"/>} />
                        <BootLabelField label="Country" field={<Text field='country' placeholder='Country' className="form-control"/>} />
                    </div>
                </Form>
            );

        const candidateForm = (
                <Form ref={e => this.form = e}
                     onSubmit={this.saveCandidate}
                     defaultValues={{
                           name: "",
                           email:""
                     }}
                     validate={values => {
                         const { name, email } = values
                         return {
                                 name: !name ? 'A name is required' : undefined,
                                 email: !email ? 'A email is required' : undefined
                         }
                     }}
                     onValidationFail={() => {
                         window.alert('Wrong form');
                     }}
                >
                     {({ values, submitForm, addValue, removeValue, getError }) => {
                         return (
                             <form onSubmit={submitForm}>
                                  <legend><small>Candidate</small></legend>
                                  <BootLabelField label="Name" field={<Text field='name' placeholder='Name' className="form-control"/>} />
                                  <BootLabelField label="Email" field={<Text field='email' placeholder='Email' className="form-control"/>} />
                                  <BootLabelField label="Contact No" field={<Text field='contactNo' placeholder='Contact No' className="form-control"/>} />
                                  <BootLabelField label="Skills" field={<FormAutoComplete multi={true} field="candidateSkills" options={this.state.possibleSkills} />} />
                                  <NestedForm field="address">
                                        {AddressForm}
                                  </NestedForm>
                             </form>
                         )
                     }}
                </Form>
         );

        return (<div className="modal fade" id="candidateCreateModal" tabIndex="-1" role="dialog">
                  <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="candidateModalLabel">Create New Candidate</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                            {candidateForm}
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-primary" data-dismiss="modal" onClick={this.form.submitForm}>Save changes</button>
                      </div>
                    </div>
                  </div>
                </div>);
    }
}

//<div className="container">
// <AutoComplete
//                                        labelKey={option => `${option.name}`}
//                                        defaultSelected={this.state.candidateSkills}
//                                        options={this.state.possibleSkills}
//                                        onChange={this.handleAutocompleteChange}/>
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


