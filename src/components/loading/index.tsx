import React, { FC, ReactElement } from 'react';
interface ILoading {
  enabled: boolean;
  message: string;
}

import './style.css';

const Loading: FC<ILoading> = ({
  enabled,
  message,
}): ReactElement => {
  if (!enabled) return <></>;
  return (
    <div className="loading-container">
      <span
        className="loading-container-content"
        role="alert"
        aria-label={message}
      >
        {message}
      </span>
    </div>
  );
};

export default Loading;
