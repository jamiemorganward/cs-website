import React from "react";
import s from "./Container.module.scss";

interface ContainerProps {
  children: React.ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  return <div className={s.container}>{children}</div>;
};
