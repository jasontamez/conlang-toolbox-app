import { createContext } from 'react';
import { SetBooleanState } from '../store/types';

export interface ModalContextProps {
	isOpen: boolean,
	setIsOpen: SetBooleanState
}
export const ModalMakingContext = createContext<(x:boolean, y:SetBooleanState) => ModalContextProps>(
	(isOpen, setIsOpen) => ({ isOpen, setIsOpen })
);
export const ExCharContext = createContext(
	() => { console.log("ExCharContext") }
);
