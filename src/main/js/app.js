const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

import {CreatePositionForm} from './components/position/CreatePositionForm';
import {PositionList} from './components/position/PositionList';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {candidates: [], positions: []};
	}

	componentDidMount() {
		client({method: 'GET', path: '/api/candidates'}).done(response => {
			this.setState({candidates: response.entity._embedded.candidates});
		});

		client({method: 'GET', path: '/api/positions'}).done(response => {
            this.setState({positions: response.entity._embedded.positions});
        });
	}

	render() {
		return (
			<div className="container-fluid">
                <CandidateList candidates={this.state.candidates} />
                <PositionList positions={this.state.positions} />
                <CreatePositionForm />
			</div>
		)
	}
}

class CandidateList extends React.Component{
	render() {
        var candidates = this.props.candidates.map(c =>
			<Candidate key={c._links.self.href} candidate={c}/>
		);
		return (
			<table>
				<tbody>
					<tr>
						<th>Name</th>
						<th>Email</th>
						<th>No</th>
					</tr>
					{candidates}
				</tbody>
			</table>
		)
	}
}

class Candidate extends React.Component{
	render() {
		return (<tr>
		            <td>{this.props.candidate.name}</td>
		            <td>{this.props.candidate.email}</td>
		            <td>{this.props.candidate.contactNo}</td>
                </tr>);
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('react')
)