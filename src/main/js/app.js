const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

import {CreatePositionForm} from './components/position/CreatePositionForm';
import {PositionListContainer} from './components/position/PositionListContainer';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {candidates: [], positions: []};
		this.reloadData = this.reloadData.bind(this);
	}

    reloadData(){
        client({method: 'GET', path: '/api/candidates'}).done(response => {
            this.setState({candidates: response.entity._embedded.candidates});
        });
    }

	componentDidMount() {
	    this.reloadData();
		setInterval(this.reloadData, 2000);
	}

	render() {
		return (
			<div className="container-fluid">
                <CandidateList candidates={this.state.candidates} />
                <div className="row">
                    <div className="col-sm-4">
                        <PositionListContainer />
                    </div>
                    <div className="col-sm-8">
                        <CreatePositionForm />
                    </div>
                </div>
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