const React = require('react');
const client = require('../../client');



export class CreatePositionForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {step: 1,
                    position: {
                          roleName     : "",
                          description  : "",
                          requiredSkills : [],
                          minExperienceInYrsRequired      : 1,
                          salaryMax   : 5000,
                          status: "OPEN"
                          }
                 };
        this.saveValues = this.saveValues.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.previousStep = this.previousStep.bind(this);
    }

    savePosition(position){
        client({method: 'POST', path: '/api/positions', entity: position, headers: {'Content-Type': 'application/json'}})
            ;
    }

    saveValues(fields){
        this.setState({
            position: fields
        });
    }

    nextStep(){
        this.setState({
            step: this.state.step + 1
        });
    }
    previousStep(){
            this.setState({
                step: this.state.step - 1
            });
    }
    render(){
        switch(this.state.step){
            case 1: return <PositionRoleFields fieldValues={this.state.position} nextStep={this.nextStep} saveValues={this.saveValues} />
            case 2: return <PositionDetailsFields fieldValues={this.state.position} nextStep={this.nextStep} saveValues={this.saveValues} />
            case 3: return <div>{this.state.position.requiredSkills}</div>
        }
    }
}

class PositionRoleFields extends React.Component {

    constructor(props){
        super(props)
        this.handleInputChange = this.handleInputChange.bind(this);
        this.saveAndContinue = this.saveAndContinue.bind(this);
        this.positionData = this.props.fieldValues;
    }

    handleInputChange(e){
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.positionData[target.name] = value
    }

    saveAndContinue(e){
        e.preventDefault();
        this.props.saveValues(this.positionData);
        this.props.nextStep();
    }

    render(){
        return (<div>
              <div className="form-group">
                  <label>Role Name</label>
                  <input type="text"  className="form-control"
                         name="roleName"
                         defaultValue={this.props.fieldValues.roleName}
                         onChange={this.handleInputChange} />
              </div>
              <div className="form-group">
                  <label>Description</label>
                  <input type="text"  className="form-control"
                         name="description"
                         defaultValue={ this.props.fieldValues.description }
                         onChange={this.handleInputChange} />
              </div>
              <div className="form-group">
                    <button type="button" className="btn" onClick={ this.saveAndContinue }>Save and Continue</button>
              </div>
          </div>)
    }
}

class PositionDetailsFields extends React.Component {

    constructor(props){
        super(props)
        this.handleInputChange = this.handleInputChange.bind(this);
        this.saveAndContinue = this.saveAndContinue.bind(this);
        this.positionData = this.props.fieldValues;
    }

    handleInputChange(e){
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.positionData[target.name] = value
    }

    saveAndContinue(e){
        e.preventDefault();
        this.props.saveValues(this.positionData);
        this.props.nextStep();
    }

    render(){
        return (<div>
            <div className="form-group">
                <label>Min Experience Required</label>
                <input type="number" className="form-control"
                    name="minExperienceInYrsRequired"
                    defaultValue={this.props.fieldValues.minExperienceInYrsRequired}
                    onChange={this.handleInputChange} />
            </div>
            <div className="form-group">
                <label>Salary Max</label>
                <input type="number"
                    name="salaryMax" className="form-control"
                    defaultValue={ this.props.fieldValues.salaryMax }
                    onChange={this.handleInputChange} />
            </div>
            <div className="form-group">
                <label>Salary Max</label>
                <select multiple
                    name="requiredSkills" className="form-control"
                    value={ this.props.fieldValues.requiredSkills }
                    onChange={this.handleInputChange} >
                    <option value="Java">Java</option>
                    <option value="Spring">Spring</option>
                    <option value="Hibernate">Hibernate</option>
                    <option value="Oracle">Oracle</option>
                    <option value="MVC">MVC</option>
               </select>
            </div>
            <div className="form-group">
                <button type="button" className="btn" onClick={ this.saveAndContinue }>Save and Continue</button>
            </div>
          </div>)
    }
}

class PositionInterviewRoundsFields extends React.Component {

    constructor(props){
        super(props)
        this.handleInputChange = this.handleInputChange.bind(this);
        this.saveAndContinue = this.saveAndContinue.bind(this);
        this.interviewRoundsData = this.props.fieldValues.interviewRounds;
    }

    handleInputChange(e){
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.positionData[target.name] = value
    }

    saveAndContinue(e){
        e.preventDefault();
        this.props.saveValues(this.positionData);
        this.props.nextStep();
    }



    render(){
        return (<div>
            <div className="form-group">
                <label>Min Experience Required</label>
                <input type="text" className="form-control"
                    name="interviewRound"
                    defaultValue={this.props.fieldValues.interviewRounds.ag}
                    onChange={this.handleInputChange} />
            </div>
            <div className="form-group">
                <label>Salary Max</label>
                <input type="number" className="form-control"
                    name="salaryMax"
                    defaultValue={ this.props.fieldValues.salaryMax }
                    onChange={this.handleInputChange} />
            </div>
            <div className="form-group">
                <label>Salary Max</label>
                <select multiple
                    name="requiredSkills"  className="form-control"
                    value={ this.props.fieldValues.requiredSkills }
                    onChange={this.handleInputChange} >
                    <option value="Java">Java</option>
                    <option value="Spring">Spring</option>
                    <option value="Hibernate">Hibernate</option>
                    <option value="Oracle">Oracle</option>
                    <option value="MVC">MVC</option>
               </select>
            </div>
            <div className="form-group">
                <button type="button" className="btn" onClick={ this.saveAndContinue }>Save and Continue</button>
            </div>
          </div>)
    }
}