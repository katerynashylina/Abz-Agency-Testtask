import { ReactNode, useState } from "react";

import './CustomTooltip.scss';

type Props = {
  content: string,
  children: ReactNode,
}

export const CustomTooltip: React.FC<Props> = ({ content, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div
      className="tooltip"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {showTooltip && (
        <div className="tooltip__content">{content}</div>
      )}
    </div>
  );
}