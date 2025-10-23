import React, { FC } from 'react';
import useElement from '../../../components/useElement';

type Input = [number, string, string, string];
type SaveFunc = (text: string, id: string, el: HTMLDivElement | HTMLSpanElement | null) => void;

interface Props {
	words: Input[]
	maybeSaveThisWord: SaveFunc
}
interface SelectableProps {
	original: string
	arrow: string
	result: string
	id: string
	maybeSaveThisWord: SaveFunc
}

const InputToOutput: FC<SelectableProps> = ({original, arrow, result, id, maybeSaveThisWord}) => {
	const [thisEl, elementRef] = useElement<HTMLSpanElement>();
	return (
		<div className="inputToOutput selectable">
			<span>{original}</span>{' '}
			<span>{arrow}</span>{' '}
			<span className="word" id={id} onClick={() => maybeSaveThisWord(result, id, thisEl)} ref={elementRef}>{result}</span>
		</div>
	);
}

const InOut: FC<Props> = ({words, maybeSaveThisWord}) => {
	return (
		<div>{words.map((input) => {
			const [i, original, arrow, result] = input;
			const id = `evolved:inout:${original} ${arrow} ${result}:${i}`;
			return <InputToOutput key={id} id={id} original={original} arrow={arrow} result={result} maybeSaveThisWord={maybeSaveThisWord} />;
		})}</div>
	);
};

export default InOut;
