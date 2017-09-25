const React = require('react');
const client = require('../../client');

import {CandidateList} from './CandidateList';
import {CandidateHeadBar} from './CandidateHeadBar';


export class CandidateOverviewPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {candidates: [],
                      candidatesStates: ["Init","Ongoing","Hold","Rejected"]
                    };
        this.loadData = this.loadData.bind(this);
    }

    loadData(){
        client({method: 'GET', path: '/api/candidates'}).done(response => {
            this.setState({candidates: response.entity._embedded.candidates});
        });
    }

    componentDidMount(){
        this.loadData();
        this.poller = setInterval(this.loadData, 2000);
    }

    componentWillUnmount(){
        clearInterval(this.poller);
    }

    render(){
        const divStyle = {
          'background': '#EEE'
        };

        return (
            <div>
                <CandidateHeadBar candidatesStates={this.state.candidatesStates}/>
                <div className="container-fluid" style={divStyle}>
                    <CandidateList candidates={this.state.candidates} />
                </div>
            </div>
        );
    }
}