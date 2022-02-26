import React from 'react';
import PropTypes from 'prop-types';

const LabelAndSelect = ({
  labelContent,
  selectId,
  onChangeEvent,
  optionsContent,
  classNameComponent,
  selectDataTestId,
}) => (
  <div className={ classNameComponent }>
    <label htmlFor={ selectId }>{ labelContent }</label>
    <br />
    <select id={ selectId } onChange={ onChangeEvent } data-testid={ selectDataTestId }>
      {
        optionsContent.map((element) => (
          <option key={ element }>{ element }</option>
        ))
      }
    </select>
  </div>
);

LabelAndSelect.propTypes = {
  labelContent: PropTypes.string.isRequired,
  selectId: PropTypes.string.isRequired,
  onChangeEvent: PropTypes.func,
  optionsContent: PropTypes.arrayOf(PropTypes.string).isRequired,
  classNameComponent: PropTypes.string,
  selectDataTestId: PropTypes.string,
};

LabelAndSelect.defaultProps = {
  onChangeEvent: () => '',
  classNameComponent: '',
  selectDataTestId: '',
};

export default LabelAndSelect;
