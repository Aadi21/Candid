const React = require('react');

export class PositionHeadBar extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return (
            <ul className="nav">
               <li className="nav-item">
                    <a className="nav-link active" href="#">{this.props.project}</a>
                </li>
            </ul>
        );
    }
}