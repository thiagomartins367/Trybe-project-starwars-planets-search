import React from 'react';

const LabelAndSelect = ({
  labelContent,
  selectId,
  onChangeEvent,
  optionsContent,
  classNameComponent,
  selectDataTestId,
}) => {
  return (
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
}

export default LabelAndSelect;