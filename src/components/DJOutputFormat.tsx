import { DJGroup } from "../store/types";

export type DJDisplayData = null | {
	order: DJOrders,
	input: string[]
};
export type DJDisplayTypes = "text" | "chart";
export type DJOrders = "group" | "groupAlpha" | "input" | "inputAlpha";

export const displayChart = (groups: DJGroup[], data: DJDisplayData) => {};

export const displayText = (groups: DJGroup[], data: DJDisplayData) => {
	const x:string[] = [];
	return x;
};
