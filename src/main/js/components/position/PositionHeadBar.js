const React = require('react');

import {CreatePositionContainer} from './CreatePositionContainer';

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
               <li className="nav-item mr-auto">
                    <a className="nav-link active" href="#">{this.props.project}</a>
               </li>
               <li className="nav-item">
                    <CreatePositionContainer/>
                    <button type="button" className="btn btn-outline-success btn-sm my-2 mx-2" data-toggle="modal" data-target="#positionCreateModal">
                        Add Position
                    </button>

               </li>
            </ul>
        );
    }
}