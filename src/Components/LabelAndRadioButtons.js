import React from 'react';
import PropTypes from 'prop-types';

const LabelAndRadioButtons = ({
  nameInputs,
  inputsContents,
  onClickEvent,
  inputsDataTestIds,
}) => (
  <div>
    <label htmlFor={ nameInputs }>
      {inputsContents.map((content, index) => (
        <div key={ content }>
          <input
            type="radio"
            name={ nameInputs }
            value={ content }
            onClick={ onClickEvent }
            data-testid={ inputsDataTestIds[index] }
          />
          { content }
          <br />
        </div>
      ))}
    </label>
  </div>
);

LabelAndRadioButtons.propTypes = {
  nameInputs: PropTypes.string.isRequired,
  inputsContents: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickEvent: PropTypes.func,
  inputsDataTestIds: PropTypes.arrayOf(PropTypes.string),
};

LabelAndRadioButtons.defaultProps = {
  onClickEvent: () => '',
  inputsDataTestIds: [],
};

export default LabelAndRadioButtons;
