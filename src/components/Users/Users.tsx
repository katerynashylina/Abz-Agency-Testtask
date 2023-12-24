import { User } from "../../types/User";
import { Button } from "../Button/Button";
import { UserCard } from "../UserCard/UserCard";
import './Users.scss';

type Props = {
  users: User[],
  handleShowMore: () => void,
  // hasNextPage: boolean,
}

export const Users: React.FC<Props> = ({ users, handleShowMore }) => {
  return (
    <section className='page__section users' id="users">
      <h1>
        Working with GET request
      </h1>

      <div className="users__container">
        {users.map(user => (
          <UserCard
            key={user.id}
            user={user}
          />
        ))}
      </div>

      <Button
        text="Show more"
        handleShowMore={handleShowMore}
      />
    </section>
  );
}