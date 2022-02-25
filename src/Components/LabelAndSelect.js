import React from 'react';

const LabelAndSelect = ({
  labelContent,
  selectId,
  onChangeEvent,
  optionsContent,
  classNameComponent,
  dataTestId
}) => {
  return (
    <div className={ classNameComponent }>
      <label htmlFor={ selectId }>{ labelContent }</label>
      <br />
      <select id={ selectId } onChange={ onChangeEvent } data-testid={ dataTestId }>
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