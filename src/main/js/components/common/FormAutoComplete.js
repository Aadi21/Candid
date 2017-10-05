import React from 'react';
import { FormInput } from 'react-form';
import Select from 'react-select';

export default ({field, ...rest}) => {
    return (
        <FormInput field={field}>
            {({setValue, getValue, setTouched}) => {
                return (
                        <Select
                            {...rest} // Send the rest of your props to React-Select
                            value={getValue()} // Set the value to the forms value
                            onChange={val => setValue(val)} // On Change, update the form value
                            onBlur={() => setTouched()} // And the same goes for touched
                          />
                        )
            }}
        </FormInput>
    )
}