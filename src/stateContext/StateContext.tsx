import { createContext } from 'react';
import { Action, State } from '../types/types';

export const StateContext = createContext<null | State>(null);
export const StateDispatchContext =
  createContext<null | React.Dispatch<Action>>(null);
