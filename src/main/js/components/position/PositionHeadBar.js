const React = require('react');

export class PositionHeadBar extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        const divStyle = {
          'boxShadow': '0 4px 4px -2px #AFA'
        };

        return (
            <ul className="nav" style={divStyle}>
               <li className="nav-item">
                    <a className="nav-link active" href="#">{this.props.project}</a>
                </li>
                <li className="nav-item">
                    <button className="btn btn-outline-success my-2 my-sm-0" type="button">Add Position</button>
                </li>
            </ul>
        );
    }
}