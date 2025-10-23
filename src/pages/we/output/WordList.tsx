import React, { FC } from 'react';
import useElement from '../../../components/useElement';

type Input = [number, string];

interface Props {
	words: Input[]
	maybeSaveThisWord: <T extends Element>(text: string, id: string, el: T | null) => void
}
interface MinSelectableProps {
	result: string
	id: string
	maybeSaveThisWord: (text: string, id: string, el: HTMLDivElement | null) => void
}

const OutputOnly: FC<MinSelectableProps> = ({id, result: word, maybeSaveThisWord}) => {
	const [thisEl, elementRef] = useElement<HTMLDivElement>();
	return <div className="word selectable" key={id} id={id} onClick={() => maybeSaveThisWord(word, id, thisEl)} ref={elementRef}>{word}</div>;
};

const WordList: FC<Props> = ({words, maybeSaveThisWord}) => {
	return (
		<div>{words.map((input) => {
			const [i, word] = input;
			const id = `evolved:basic:${word}:${i}`;
			return <OutputOnly key={id} id={id} result={word} maybeSaveThisWord={maybeSaveThisWord} />;
		})}</div>
	);
};

export default WordList;
