import React, { FC, ReactElement } from 'react';
import './style.css';

interface IMainLayout {
  children: ReactElement[] | ReactElement;
}

const MainLayout: FC<IMainLayout> = ({
  children,
}): ReactElement => {
  return (
    <div
      data-testid="layout-container"
      className="layout-container"
    >
      <div
        data-testid="layout-content"
        className="layout-content"
      >
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
