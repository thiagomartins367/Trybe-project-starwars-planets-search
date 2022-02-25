import React from 'react';

const LabelAndRadioButtons = ({ nameInputs, inputsContents, onClickEvent, inputsDataTestIds }) => {
  return (
    <div>
      <label htmlFor={nameInputs}>
        {inputsContents.map((content, index) => (
          <div key={content}>
            <input
              type="radio"
              name={nameInputs}
              value={content}
              onClick={onClickEvent}
              data-testid={ inputsDataTestIds[index] }
            />
            {content}
            <br />
          </div>
        ))}
      </label>
    </div>
  );
}

export default LabelAndRadioButtons;