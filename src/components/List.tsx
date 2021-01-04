import React from "react";
import { connect } from "react-redux";

const select = (state: any) => {
	return { articles: state.articles };
};

const ConnectedList = ({ articles }: any) => (
	<ul>
		{articles.map((el: any) => (
			<li key={el.id}>{el.title}</li>
		))}
	</ul>
);

const List = connect(select)(ConnectedList);

export default List;
