import { Button } from "../Button/Button";
import './Header.scss';
import logo from '../../photos/Logo.svg';

export const Header = () => {
  return (
    <header className="header">
      <div className="header__top">
        <a href="/">
          <img src={logo} alt="logo" className="header__logo" />
        </a>

        <div className="header__buttons">
          <a href="#users">
            <Button
              text='Users'
            />
          </a>
          <a href="#form">
            <Button
              text='Sign up'
            />
          </a>
        </div>
      </div>

      <div className="header__info">
        <div className="header__text">
          <h1>
            Test assignment for front-end developer
          </h1>

          <p>
            What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
          </p>

          <a href="#form">
            <Button
              text="Sign up"
            />
          </a>
        </div>
      </div>
    </header>
  );
}