import { useEffect, useState } from "react";
import { addToLog } from "./ReduxDucksFuncs";

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
					dispatch(addToLog(`Added to modals`));
				} else {
					const newModals = modals.filter(m => m !== setIsOpen);
					setModals(newModals);
					dispatch(addToLog(`Removed from modals (non-button) old: ${modals.length} new: ${newModals.length}`));
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
