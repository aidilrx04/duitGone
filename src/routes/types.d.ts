export type DuitRecord = { amount: number; details?: string; time: string };
export type DailyDuitRecord = {
	date: string;
	records: DuitRecord[];
};
