import React from 'react';
import PropTypes from 'prop-types';

const LabelAndInput = ({
  labelContent,
  inputType,
  inputId,
  onChangeEvent,
  dataTestId,
}) => (
  <div>
    <label htmlFor={ inputId }>{ labelContent }</label>
    <br />
    <input
      type={ inputType }
      id={ inputId }
      onChange={ onChangeEvent }
      data-testid={ dataTestId }
    />
  </div>
);

LabelAndInput.propTypes = {
  labelContent: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
  inputId: PropTypes.string.isRequired,
  onChangeEvent: PropTypes.func,
  dataTestId: PropTypes.string,
};

LabelAndInput.defaultProps = {
  onChangeEvent: () => '',
  dataTestId: '',
};

export default LabelAndInput;
