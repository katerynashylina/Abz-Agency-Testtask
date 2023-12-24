import './Button.scss';

type Props = {
  text: string,
  handleShowMore?: () => void,
}

export const Button: React.FC<Props> = ({ text, handleShowMore }) => {
  return (  
    <button
      className="button"
      onClick={handleShowMore}
    >
      {text}
    </button>
  );
}