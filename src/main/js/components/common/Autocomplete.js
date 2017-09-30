const React = require('react');

import {Typeahead} from 'react-bootstrap-typeahead';

export class AutoComplete extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <Typeahead
                allowNew
                multiple
                clearButton
                newSelectionPrefix={this.props.newSelectionPrefix}
                options={this.props.options}
                placeholder={this.props.placeholder}
                onChange={this.props.onChange}
                defaultSelected={this.props.defaultSelected}
            />
        );
    }
}