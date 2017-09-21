const React = require('react');

export class CandidateList extends React.Component {

    render() {
            var candidates = this.props.candidates.map(c =>
    			<Candidate key={c._links.self.href} candidate={c}/>
    		);
    		return (
    			<div className="list-group">
    					{candidates}
    			</div>
    		)
    }
}

class Candidate extends React.Component {
    render() {
        return (<div className="list-group-item mb-3 list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1 text-capitalize">{this.props.candidate.name}</h5>
                        <p><span className="badge badge-info">{this.props.candidate.status}</span></p>
                    </div>
                    <p className="mb-1">{this.props.candidate.email}</p>
                    <small>Other Content</small>
                </div>
                );
    }
}