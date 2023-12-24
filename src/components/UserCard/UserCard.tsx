import { User } from '../../types/User';
import { CustomTooltip } from '../CustomTooltip/CustomTooltip';
import './UserCard.scss';

type Props = {
  user: User,
}

export const UserCard: React.FC<Props> = ({ user }) => {
  const { photo, name, phone, position, email } = user;

  const truncateString = (str: string, maxLength: number) => {
    return str.length > maxLength ? str.substring(0, maxLength - 3) + '...' : str;
  };

  const truncatedName = truncateString(name, 30);
  const truncatedEmail = truncateString(email, 30);

  return (
    <div className="user-card">
      <div className="user-card__container">
        <img src={photo} alt={name} className="user-card__photo" />

        {name.length > 30 ? (
          <CustomTooltip content={name}>
            <p className="user-card__name">{truncatedName}</p>
          </CustomTooltip>
        ) : (
          <p className="user-card__name">{name}</p>
        )}

        <div className="user-card__info">
          <p title={position.name}>{position.name}</p>

          {email.length > 30 ? (
            <CustomTooltip content={email}>
              <p className="user-card__name">{truncatedEmail}</p>
            </CustomTooltip>
          ) : (
            <p className="user-card__name">{email}</p>
          )}

          <p title={phone}>{phone}</p>
        </div>
      </div>
    </div>
  );
};
