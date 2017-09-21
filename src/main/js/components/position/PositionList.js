const React = require('react');

export class PositionList extends React.Component {

    render() {
            var positions = this.props.positions.map(p =>
    			<Position key={p._links.self.href} position={p}/>
    		);
    		return (
    			<div className="list-group">
    					{positions}
    			</div>
    		)
    }
}

class Position extends React.Component {
    render() {
        return (<div className="list-group-item mb-3 list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1 text-capitalize">{this.props.position.roleName}</h5>
                        <p><span className="badge badge-info">{this.props.position.status}</span></p>
                    </div>
                    <p className="mb-1">{this.props.position.description}</p>
                    <small>Other Content</small>
                </div>
                );
    }
}