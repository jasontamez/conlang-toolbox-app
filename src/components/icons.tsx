import React from "react";
import { IonIcon } from "@ionic/react";
import {
	create,
//	createOutline
} from "ionicons/icons";

interface Map {
	[key: string]: string
}

const map: Map = {
	concepts: "thought-bubble-material-design",
	conceptsOutline: "thought-bubble-outline-material-design",
	lexicon: "notebook-material-design",
	lexiconOutline: "notebook-outline-material-design",
	morphoSyntax: "folder-table-material-design",
//	morphoSyntaxOutline: "folder-table-outline-material-design",
	wordEvolve: "pipe-icon-material-design",
//	wordEvolveOutline: "middleware-outline-material-design",
	syllables: "table-row-material-design",
	transformations: "transfer-right-material-design",
	soundChanges: "transit-connection-variant-material-design"
};

export interface IonIconProps {
	color?: string
	flipRtl?: boolean
	icon?: string
	ios?: string
	lazy?: boolean
	md?: string
	mode?: 'ios' | 'md'
	name?: string
	size?: string
	src?: string
	className?: string
	slot?: string
}

interface IconProps extends IonIconProps {
	which: keyof Map
}

const Icon = (props: IconProps) => {
	const { which, ...rest } = props;
	return <IonIcon {...rest} src={`svg/${map[which]}.svg`}></IonIcon>;
};

export const ConceptsIcon = (props: IonIconProps) => <Icon which="concepts" {...props}></Icon>;
export const ConceptsOutlineIcon = (props: IonIconProps) => <Icon which="conceptsOutline" {...props}></Icon>;
export const LexiconIcon = (props: IonIconProps) => <Icon flipRtl which="lexicon" {...props}></Icon>;
export const LexiconOutlineIcon = (props: IonIconProps) => <Icon flipRtl which="lexiconOutline" {...props}></Icon>;
export const MorphoSyntaxIcon = (props: IonIconProps) => <Icon which="morphoSyntax" {...props}></Icon>;
//export const MorphoSyntaxOutlineIcon = (props: IonIconProps) => <Icon which="morphoSyntaxOutline" {...props}></Icon>;
export const WordEvolveIcon = (props: IonIconProps) => <Icon flipRtl which="wordEvolve" {...props}></Icon>;
//export const WordEvolveOutlineIcon = (props: IonIconProps) => <Icon flipRtl which="wordEvolveOutline" {...props}></Icon>;

export const WordGenIcon = (props: IonIconProps) => <IonIcon flipRtl {...props} icon={create}></IonIcon>;
//export const WordGenOutlineIcon = (props: IonIconProps) => <IonIcon flipRtl {...props} icon={createOutline}></IonIcon>;

export const SyllablesIcon = (props: IonIconProps) => <Icon flipRtl which="syllables" {...props}></Icon>;
export const TransformationsIcon = (props: IonIconProps) => <Icon flipRtl which="transformations" {...props}></Icon>;
export const SoundChangesIcon = (props: IonIconProps) => <Icon flipRtl which="soundChanges" {...props}></Icon>;
