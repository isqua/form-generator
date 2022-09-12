import { Children } from 'react';

export const hasChildren = (children: unknown) => (
  Children.count(children) > 0 && children !== false
);
