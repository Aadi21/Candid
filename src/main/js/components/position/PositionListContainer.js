const React = require('react');
const client = require('../../client');

import {PositionList} from './PositionList';
import {PositionFilter} from './PositionFilter';

export class PositionListContainer extends React.Component {

    constructor(props){
        super(props);
        this.state = {positions: [], searchText: ''};
        this.loadData = this.loadData.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount(){
        this.loadData();
        this.poller = setInterval(this.loadData, 2000);
    }

    componentWillUnmount(){
        clearInterval(this.poller);
    }

    loadData(){
        client({method: 'GET', path: '/api/positions?projection=inlineSkills'})
        .done(response => {
            this.setState({positions: response.entity._embedded.positions});
        });
    }

    handleSearch(searchText){
        this.setState({searchText: searchText})
    }

    render() {
        const divStyle = {
          'background': '#EEE'
        };

            return (
                <div className="container-fluid" style={divStyle}>
                    <PositionFilter handleSearch={this.handleSearch}/>
                    <PositionList searchText={this.state.searchText} positions={this.state.positions} />
    		    </div>
    		)
    }

}