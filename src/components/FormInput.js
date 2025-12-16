import PropTypes from 'prop-types';
import Rating from './Rating';
import Suggest from './Suggest';
import './FormInput.css'

function FormInput({ type = 'input', defaultValue = '', options = [], ...rest }) {
    switch (type) {
        case 'year':
            return (
                <input
                    {...rest}
                    type='number'
                    defaultValue={(defaultValue && parseInt(defaultValue, 10)) || new Date().getFullYear()}
                ></input>
            );
        case 'suggest':
            return (
                <Suggest
                    {...rest}
                    defaultValue={defaultValue}
                    options={options}
                />
            );
        case 'rating':
            return (
                <Rating
                    {...rest}
                    defaultValue={defaultValue ? parseInt(defaultValue, 10) : 0}
                />
            );
        case 'textarea':
            return (
                <textarea
                    {...rest}
                    defaultValue={defaultValue}
                />
            );
        default:
            return (
                <input
                    {...rest}
                    type='text'
                    defaultValue={defaultValue}
                />
            );
    }
}

FormInput.propTypes = {
    input: PropTypes.oneOf(['textarea', 'input', 'year', 'suggest', 'rating']),
    defaultValue: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
    options: PropTypes.array
}

export default FormInput;