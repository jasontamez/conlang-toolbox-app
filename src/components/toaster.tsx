import { ToastButton } from "@ionic/react"

interface Toast {
	color?: string
	message: string
	buttons?: ToastButton[]
	duration?: number
	position?: "top" | "middle" | "bottom"
	doToast: Function
	undoToast: Function
}

const toaster = (props: Toast) => {
	const {
		color = "primary",
		message,
		duration = 5000,
		doToast,
		undoToast,
		position,
		buttons = [
			{
				text: "Ok",
				role: 'cancel'
			}
		]
	} = props;
	undoToast().then(() => doToast({
		message,
		duration,
		position,
		color,
		buttons
	}));
};

export default toaster;
