import React, { FC } from 'react';
import useElement from '../../../components/useElement';

type Input = [number, string, string, string];
type SaveFunc = (text: string, id: string, el: HTMLDivElement | HTMLSpanElement | null) => void;

interface Props {
	words: Input[]
	maybeSaveThisWord: SaveFunc
}
interface SelectableProps {
	result: string
	arrow: string
	original: string
	id: string
	maybeSaveThisWord: SaveFunc
}

const OutputToInput: FC<SelectableProps> = ({original, arrow, result, id, maybeSaveThisWord}) => {
	const [thisEl, elementRef] = useElement<HTMLSpanElement>();
	return (
		<div className="outputToInput selectable">
			<span className="word" id={id} onClick={() => maybeSaveThisWord(result, id, thisEl)} ref={elementRef}>{result}</span>{' '}
			<span>{arrow}</span>{' '}
			<span>{original}</span>
		</div>
	);
}

const OutIn: FC<Props> = ({words, maybeSaveThisWord}) => {
	return (
		<div>{words.map((input) => {
			const [i, original, arrow, result] = input;
			const id = `evolved:inout:${original} ${arrow} ${result}:${i}`;
			return <OutputToInput key={id} id={id} original={original} arrow={arrow} result={result} maybeSaveThisWord={maybeSaveThisWord} />;
		})}</div>
	);
};

export default OutIn;
