import React from 'react';

export default (props)=> {
    return (
        <div className="form-group form-row">
            <label  className="col-sm-3 col-form-label">{props.label}</label>
            <div className="col-sm-9">
                {props.field}
            </div>
        </div>
    )
}