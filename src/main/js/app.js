import '../scss/app.scss';

const React = require('react');
const ReactDOM = require('react-dom');

import {HashRouter as Router, Route} from 'react-router-dom';

import {PositionOverviewPage} from './components/position/PositionOverviewPage';
import {CandidateOverviewPage} from './components/candidate/CandidateOverviewPage';
import {NavBar} from './components/nav/NavBar'

class App extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Router>
                <div>
                    <NavBar />
                    <Route path="/candidate" component={CandidateOverviewPage}/>
                    <Route path="/position" component={PositionOverviewPage}/>
                </div>
			</Router>
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