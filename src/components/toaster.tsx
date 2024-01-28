import { ToastButton, UseIonToastResult } from "@ionic/react"

interface Toast {
	color?: string
	message: string
	buttons?: ToastButton[]
	duration?: number
	position?: "top" | "middle" | "bottom"
	toast: UseIonToastResult
}

const toaster = (props: Toast) => {
	const {
		color = "primary",
		message,
		duration = 5000,
		toast,
		position,
		buttons = [
			{
				text: "Ok",
				role: 'cancel'
			}
		]
	} = props;
	const [ doToast, undoToast ] = toast;
	undoToast().then(() => doToast({
		message,
		duration,
		position,
		color,
		buttons
	}));
};

export default toaster;
