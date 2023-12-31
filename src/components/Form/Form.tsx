import { useEffect, useState } from 'react';
import { Position } from '../../types/Position';
import { Button } from '../Button/Button';
import { RadioInput } from '../RadioInput/RadioInput';
import './Form.scss';
import { User } from '../../types/User';
import { createUser } from '../../helpers/fetchUsers';

type Props = {
  users: User[],
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  token: string,
  positions: Position[],
}

export const Form: React.FC<Props> = ({
  users,
  setUsers,
  token,
  positions,
}) => {
  const initialValue = {
    name: '',
    email: '',
    phone: '',
    position: positions[0],
    photo: null as File | null,
    id: 0,
  };
  const [newUser, setNewUser] = useState(initialValue);
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [formChanges, setFormChanges] = useState({});
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);

  const handlePositionChange = (positionId: number) => {
    setSelectedPosition(positionId);
    const selectedPosition = positions.find(
      position => position.id === positionId
    );
  
    if (selectedPosition) {
      setNewUser({ ...newUser, position: selectedPosition });
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewUser(prev => ({ ...prev, [name]: value }))
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setNewUser({ ...newUser, photo: file });
  };

  const handleSubmit = async (e: {preventDefault: () => void}) => {
    e.preventDefault();
    setNewUser({ ...newUser, ...formChanges });

    const newErrors = {
      name: '',
      email: '',
      phone: '',
    };

    if (!newUser.name.trim()) {
      newErrors.name = 'Name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!newUser.email.trim() || !emailRegex.test(newUser.email)) {
      newErrors.email = 'Valid email is required';
    }

    const phoneRegex = /^\+?\d{1,3}[-\s]?\d{3,}[-\s]?\d{3,}[-\s]?\d{3,}$/;
    if (!newUser.phone.trim() || !phoneRegex.test(newUser.phone)) {
      newErrors.phone = 'Valid 10-digit phone number is required';
    }

    const isFormValid =
      !newErrors.name && !newErrors.email && !newErrors.phone;

    setFormErrors(newErrors);

    if (isFormValid) {
      try {
        const createdUser = await createUser({
          success: true,
          user_id: Math.max(...users.map(user => user.id)) + 1,
          message: "New user successfully registered"
        });
  
  
        setUsers((prevUsers) => [...prevUsers, createdUser]);
      } catch (error) {
        console.error('Error while creating:', error);
      }
  
      setNewUser(initialValue);
    }
  };

  console.log(newUser)


  return (
    <section className='page__section' id="form">
      <h1>
        Working with POST request
      </h1>

      <form className="form" action="post" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="form__input"
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form__input"
          onChange={handleInputChange}
        />
        <input
          type="phone"
          name="phone"
          placeholder="Phone"
          className="form__input"
          id='input-phone'
          onChange={handleInputChange}
        />
        <p className='form__input--phone'>
          {'+38 (XXX) XXX - XX - XX'}
        </p>

        <p style={{ marginBottom: 11 }}>
          Select your position
        </p>

        <div className="form__positions">
          {positions.map(position => (
            <RadioInput
              key={position.id}
              position={position}
              handlePositionChange={handlePositionChange}
            />
          ))}
        </div>

        <div className="file">
          <label className='file__upload' htmlFor="upload-photo">
            Upload

          </label>
            <label htmlFor="upload-photo" className='file__photo'>
              {newUser.photo ? newUser.photo.name : 'Upload your photo'}
            </label>
            <input
              type="file"
              name="upload"
              placeholder="Upload your photo"
              className="form__input"
              onChange={handleFileInputChange}
              id="upload-photo"
            />
        </div>

        <div className="form__button">
          <Button
            text='Sign up'
          />
        </div>
      </form>
    </section>
  );
}