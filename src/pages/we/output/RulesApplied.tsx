import React, { FC } from 'react';
import useElement from '../../../components/useElement';

type Input = [number, string, string, string, [string, string][]];
type SaveFunc = (text: string, id: string, el: HTMLDivElement | HTMLSpanElement | null) => void;

interface Props {
	words: Input[]
	maybeSaveThisWord: SaveFunc
}
interface SelectableProps {
	result: string
	arrow: string
	original: string
	rules: [string, string][]
	id: string
	maybeSaveThisWord: SaveFunc
}

const InputToOutput: FC<Omit<SelectableProps, "rules">> = ({original, arrow, result, id, maybeSaveThisWord}) => {
	const [thisEl, elementRef] = useElement<HTMLSpanElement>();
	return (
		<div className="inputToOutput selectable">
			<span>{original}</span>{' '}
			<span>{arrow}</span>{' '}
			<span className="word" id={id} onClick={() => maybeSaveThisWord(result, id, thisEl)} ref={elementRef}>{result}</span>
		</div>
	);
}
const RulesLine: FC<SelectableProps> = ({original, arrow, result, id, rules, maybeSaveThisWord}) => {
	return (
		<div className="rulesApplied selectable">
			<InputToOutput key={id} id={id} original={original} arrow={arrow} result={result} maybeSaveThisWord={maybeSaveThisWord} />
			<div className="rules selectable">
				{rules.map((pair: string[], i: number) => {
					const [rule, result] = pair;
					return (
						<div className="inputToOutput selectable" key={`${id}:output:${rule}:${result}:${i}`}>
							<span>{rule}</span>{' '}
							<span>{arrow}</span>{' '}
							<span>{result}</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}

const RulesApplied: FC<Props> = ({words, maybeSaveThisWord}) => {
	return (
		<div>{words.map((input) => {
			const [i, original, arrow, result, rules] = input;
			const id = `evolved:rules:${original} ${arrow} ${result}:${i}`;
			return <RulesLine key={id} id={id} original={original} arrow={arrow} result={result} maybeSaveThisWord={maybeSaveThisWord} rules={rules} />;
		})}</div>
	);
};

export default RulesApplied;
