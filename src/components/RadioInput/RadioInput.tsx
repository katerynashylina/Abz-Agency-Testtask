import { useState } from 'react';
import { Position } from '../../types/Position';
import './RadioInput.scss';

type Props = {
  position: Position,
  handlePositionChange: (positionId: number) => void,
}

export const RadioInput: React.FC<Props> = ({ position, handlePositionChange }) => {
  return (
    <div className="radio">
      <input
        type="radio"
        id={`${position.id}`}
        name="position"
        value={`position`}
        className='radio__input'
        onChange={() => handlePositionChange(position.id)}
      />
      <label 
        htmlFor={`${position.id}`}
        className='radio__label'
      >
        {position.name}
      </label>
    </div>
  );
}
