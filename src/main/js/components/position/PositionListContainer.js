const React = require('react');
const client = require('../../client');

import {PositionList} from './PositionList';

export class PositionListContainer extends React.Component {

    constructor(props){
        super(props);
        this.state = {positions: []};
        this.loadData = this.loadData.bind(this);
    }

    componentDidMount(){
        this.loadData();
        setInterval(this.loadData, 2000);
    }

    loadData(){
        client({method: 'GET', path: '/api/positions'}).done(response => {
            this.setState({positions: response.entity._embedded.positions});
        });
    }

    render() {
            return (
    		    <PositionList positions={this.state.positions} />
    		)
    }

}