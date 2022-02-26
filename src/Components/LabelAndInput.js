import React from 'react';
import PropTypes from 'prop-types';

const LabelAndInput = ({
  labelContent,
  inputType,
  inputId,
  inputValue,
  onChangeEvent,
  classNameComponent,
  dataTestId,
}) => (
  <div className={ classNameComponent }>
    <label htmlFor={ inputId }>{ labelContent }</label>
    <br />
    <input
      type={ inputType }
      id={ inputId }
      value={ inputValue }
      onChange={ onChangeEvent }
      data-testid={ dataTestId }
    />
  </div>
);

LabelAndInput.propTypes = {
  labelContent: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
  inputId: PropTypes.string.isRequired,
  inputValue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  onChangeEvent: PropTypes.func,
  classNameComponent: PropTypes.string,
  dataTestId: PropTypes.string,
};

LabelAndInput.defaultProps = {
  onChangeEvent: () => '',
  classNameComponent: '',
  dataTestId: '',
};

export default LabelAndInput;
