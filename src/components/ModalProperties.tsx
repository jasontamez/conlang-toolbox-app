import { useEffect, useState } from "react";
//import { addToLog } from "./ReduxDucksFuncs";

// This returns a function which can then be used to create properties for a modal
function modalPropertiesFunc (modals: Function[], setModals: Function, dispatch: Function) {
	return function (isOpen: boolean, setIsOpen: Function) {
		const [previous, setPrevious] = useState<boolean>(isOpen);
		useEffect(() => {
			if(isOpen === previous) {
				// nada
			} else {
				setPrevious(isOpen);
				if(isOpen) {
					setModals([setIsOpen, ...modals]);
				} else {
					const newModals = modals.filter(m => m !== setIsOpen);
					setModals(newModals);
				}
			}
		}, [isOpen, setIsOpen, previous]);
		return {
			isOpen,
			setIsOpen
		};
	};
};

export default modalPropertiesFunc;
