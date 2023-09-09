interface Alert {
	header?: string
	cssClass?: string
	message: string
	submit: string
	handler: Function
	doAlert: Function
}

const yesNoAlert = (props: Alert) => {
	const {
		header,
		cssClass,
		message,
		submit,
		handler,
		doAlert
	} = props;
	doAlert({
		header,
		cssClass,
		message,
		buttons: [
			{
				text: "Cancel",
				role: "cancel",
				cssClass: "cancel"
			},
			{
				text: submit,
				cssClass: "submit",
				handler
			}
		]
	});
};

export default yesNoAlert;