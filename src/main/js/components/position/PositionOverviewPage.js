const React = require('react');

import {PositionListContainer} from './PositionListContainer';
import {PositionHeadBar} from './PositionHeadBar';
import {CreatePositionForm} from './CreatePositionForm';


export class PositionOverviewPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {project: "SuperProject"};
    }

    render(){
        return (
            <div>
                <PositionHeadBar project={this.state.project}/>
                <PositionListContainer project={this.state.project} />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <CreatePositionForm />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}