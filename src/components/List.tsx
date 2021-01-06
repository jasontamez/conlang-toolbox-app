import React from "react";
import { shallowEqual, useSelector } from "react-redux";

const List = () => {
	const articles = useSelector((state: any) => state.articles, shallowEqual);
	return (
		<ul>
			{articles.map((el: any) => (
				<li key={el.id}>{el.title}</li>
			))}
		</ul>
	);
};

export default List;
