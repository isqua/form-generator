import { Dispatch } from 'react';
import { IFormGeneratorAction, IFormGeneratorState } from '../../model';

export interface IFormParserProps {
  state: IFormGeneratorState;
  dispatch: Dispatch<IFormGeneratorAction>;
}
