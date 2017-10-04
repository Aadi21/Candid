const React = require('react');

import {CreateCandidateContainer} from './CreateCandidateContainer';

export class CandidateHeadBar extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        var filters = this.props.candidatesStates.map(s => {
                        return (<li key={s} className="nav-item">
                            <a className="nav-link" href="#">{s}</a>
                        </li>
                        )
                     });

        return (
            <ul className="nav justify-content-center">
                {filters}
                <li className="nav-item ml-auto">
                    <CreateCandidateContainer/>
                    <button type="button" className="btn btn-outline-success btn-sm my-2 mx-2" data-toggle="modal" data-target="#candidateCreateModal">
                        Add Candidate
                    </button>
                </li>
            </ul>
        );
    }
}