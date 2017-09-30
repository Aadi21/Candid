const React = require('react');

import {Typeahead} from 'react-bootstrap-typeahead';

export class AutoComplete extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <Typeahead
                multiple
                clearButton
                labelKey={this.props.labelKey}
                options={this.props.options}
                placeholder={this.props.placeholder}
                onChange={this.props.onChange}
                defaultSelected={this.props.defaultSelected}
            />
        );
    }
}