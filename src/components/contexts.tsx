import { createContext } from 'react';
import { SetBooleanState } from '../store/types';

export interface ModalContextProps {
	isOpen: boolean,
	setIsOpen: SetBooleanState
}
export const ModalContext = createContext(
	(isOpen: boolean, setIsOpen: SetBooleanState):ModalContextProps => ({ isOpen, setIsOpen })
);
