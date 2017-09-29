const React = require('react');

export class PositionFilter extends React.Component {

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.props.handleSearch(e.target.value);
    }

    render(){
        return (
                <div className="container-fluid py-3 px-0">
                    <div className="d-flex justify-content-end">
                        <div className="mr-auto py-2"><input type="text" placeholder="Search..." value={this.props.searchText} onChange={this.handleChange}/></div>
                        <div className="p-2">All Locations</div>
                        <div className="p-2">All Stream</div>
                    </div>
                </div>)
    }
}