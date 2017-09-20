const React = require('react');

export class PositionFilter extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return (
                <div className="container">
                    <div className="row">
                        <input type="text" placeholder="search..." />
                    </div>
                </div>)
    }
}