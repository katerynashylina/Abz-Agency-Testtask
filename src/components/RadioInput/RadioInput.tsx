import { useState } from 'react';
import { Position } from '../../types/Position';
import './RadioInput.scss';

type Props = {
  position: Position,
}

export const RadioInput: React.FC<Props> = ({ position }) => {
  // const [isChecked, setIsChecked] = useState(false); 

  return (
    <div className="radio">
      <input
        type="radio"
        id={`position.id`}
        name="position"
        value={`position`}
        // checked={isChecked}
        className='radio__input'
        // onChange={() => setIsChecked(true)}
      />
      <label 
        htmlFor={`position.id`}
        className='radio__label'
      >
        {position.name}
      </label>
    </div>
  );
}
