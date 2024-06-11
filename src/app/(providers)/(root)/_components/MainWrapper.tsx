import React from 'react';

type MainWrapperProps = {
  children: React.ReactNode;
};

export default function MainWrapper({ children }: MainWrapperProps) {
  return <div>{children}</div>;
}
