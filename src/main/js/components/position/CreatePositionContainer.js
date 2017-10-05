const React = require('react');
const client = require('../../client');

import FormAutoComplete from '../common/FormAutoComplete';
import BootLabelField from '../common/BootLabelField';

import { Form, Text, Select, Textarea, Checkbox, Radio, RadioGroup, NestedForm, FormError } from 'react-form'


export class CreatePositionContainer extends React.Component {

    constructor(props){
        super(props);
        this.state = {  possibleSkills: []
                     };
        this.form = {};
        this.loadSkills = this.loadSkills.bind(this);
        this.savePosition = this.savePosition.bind(this);
    }

    loadSkills(){
        client({method: 'GET', path: '/api/skills'})
        .done(response => {
            this.setState({possibleSkills: response.entity._embedded.skills.map((s) => {
                   return {'value': s._links.self.href, 'label': s.name};
               })
           });
        });
    }
    componentDidMount(){
        this.loadSkills();
    }

    savePosition(vals){
        var position  = (({ roleName, client, location, project, hireType, minExperienceInYrsRequired, salaryMax }) => {
            return ({ roleName, client, location, project, hireType, minExperienceInYrsRequired, salaryMax });
        })(vals);

        client({method: 'POST',
                path: '/api/positions',
                entity: position,
                headers: {'Content-Type': 'application/json'}
        })
        .then(response => {return response.entity;})
        .then(createdPosition => {
            if(vals.requiredSkills.length > 0){
                client({method: 'PUT',
                        path: createdPosition._links.requiredSkills.href,
                        entity: vals.requiredSkills.map(o => { return {'_links': {'self': {'href': o.value}}}; }),
                        headers: {'Content-Type': 'text/uri-list'}
                });
            }
            vals.interviewRounds.forEach(r => {
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
                });
            });
        });


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
                            <Form ref={e => this.form = e}
                                    defaultValues={{  interviewRounds: [{}] }}
                                    onSubmit={this.savePosition}
                            >
                                {({ values, submitForm, addValue, removeValue, getError }) => {
                                    return (
                                     <form onSubmit={submitForm}>
                                        <BootLabelField label="Role Name" field={<Text field='roleName' placeholder='Name' className="form-control"/>} />
                                        <BootLabelField label="Description" field={<Text field='description' placeholder='Description' className="form-control"/>} />
                                        <BootLabelField label="Client" field={<Text field='client' placeholder='Client' className="form-control"/>} />
                                        <BootLabelField label="Location" field={<Text field='location' placeholder='Location' className="form-control"/>} />
                                        <BootLabelField label="Project" field={<Text field='project' placeholder='Project' className="form-control"/>} />
                                        <BootLabelField label="Hire Type" field={<Text field='hireType' placeholder='Hire Type' className="form-control"/>} />
                                        <div className="form-group form-row">
                                            <label  className="col-sm-3 col-form-label">Experience Required</label>
                                            <div className="col-sm-3">
                                                <Text field='minExperienceInYrsRequired' placeholder='Exp' className="form-control"/>
                                            </div>
                                            <label  className="col-sm-3 col-form-label">Salary Max</label>
                                            <div className="col-sm-3">
                                                <Text field='salaryMax' placeholder='Salary' className="form-control"/>
                                            </div>
                                        </div>
                                        <BootLabelField label="Required Skills" field={<FormAutoComplete multi={true} field="requiredSkills" options={this.state.possibleSkills} />} />
                                        <legend><small>Interview Rounds</small></legend>
                                        <div className="container">
                                            {values.interviewRounds.map((interview,idx) =>
                                                <AddInterviewRoundForm key={idx}
                                                    index={idx}
                                                    addValue={addValue} />
                                            )}
                                        </div>
                                      </form>
                                     )
                               }}
                          </Form>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={this.form.submitForm} data-dismiss="modal">Save changes</button>
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
                <Text field={['interviewRounds', this.props.index, 'type']}  placeholder="Type" className="form-control"/>
            </div>
            <label  className="col-sm-2 col-form-label">Order</label>
            <div className="col-sm-3">
                <Text field={['interviewRounds', this.props.index, 'order']}  placeholder="Order" className="form-control"/>
            </div>
            <div className="col-sm-2">
                <button type="button" className="btn btn-secondary" onClick={() => {this.props.addValue('interviewRounds', {})} }>Add Another</button>
            </div>
        </div>
        );
    }
}

//<AutoComplete
//                                        labelKey={option => `${option.name}`}
//                                        defaultSelected={this.state.position.requiredSkills}
//                                        options={this.state.possibleSkills}
//                                        onChange={this.handleAutocompleteChange}/>