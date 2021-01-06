import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addArticle, addTitle } from "./ReduxDucks";

/*
function mapDispatchToProps(dispatch) {
	return {
		addArticle: article => dispatch(addArticle(article))
	};
}

class ConnectedForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: ""
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({ [event.target.id]: event.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();
		const { title } = this.state;
		this.props.addArticle({ title });
		this.setState({ title: "" });
	}
	render() {
		const { title } = this.state;
		return (
			<form onSubmit={this.handleSubmit}>
				<div>
					<label htmlFor="title">Title</label>
					<input
						type="text"
						id="title"
						value={title}
						onChange={this.handleChange}
					/>
				</div>
				<button type="submit">SAVE</button>
			</form>
		);
	}
}

const Form = connect(
	null,
	mapDispatchToProps
)(ConnectedForm);*/

const Form = () => {
	const title = useSelector(state => state.title);
	const dispatch = useDispatch();
	const useTitleForm_uS = (e) => {
		dispatch(addArticle(title));
		document.getElementById("title").value = '';
	};
	const useTitle_uS = (e) => {
		dispatch(addTitle(e.target.value));
	}
	return (
		<div>
			<label htmlFor="title">Title</label>
			<input
				type="text"
				id="title"
				value={title}
				onChange={useTitle_uS}
			/>
			<button onClick={useTitleForm_uS}>SAVE</button>
		</div>
	);
};

export default Form;
