const React = require('react');

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
            </ul>
        );
    }
}