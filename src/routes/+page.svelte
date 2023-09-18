<script lang="ts">
	import { onMount } from 'svelte';
	import Pie from './Pie.svelte';
	import type { DailyDuitRecord, DuitRecord } from './types';
	import Title from '$lib/components/Title.svelte';
	import Menu from '$lib/components/Menu.svelte';

	onMount(() => {
		const savedRecords = localStorage.getItem('dailyRecords');

		if (savedRecords)
			try {
				const parsed = JSON.parse(savedRecords) as DailyDuitRecord[];

				const match = parsed.find((val) => val.date === date);

				if (match) records = match.records;
			} catch (e: any) {
				console.error('Failed to parse records object');
			}
	});

	const saveRecords = (records: DuitRecord[]) => {
		localStorage.setItem('records', JSON.stringify(records));
	};

	let records: DuitRecord[] = [];
	let date = new Date().toDateString();

	const saveDailyRecords = () => {
		const saved = localStorage.getItem('dailyRecords');

		if (!saved) {
			localStorage.setItem(
				'dailyRecords',
				JSON.stringify([
					{
						date: date,
						records: records
					}
				])
			);

			return;
		}

		try {
			const parsed = JSON.parse(saved) as DailyDuitRecord[];

			const index = parsed.findIndex((val) => val.date === date);
			console.log({ index });

			if (index >= 0) {
				parsed[index] = { date, records };

				localStorage.setItem('dailyRecords', JSON.stringify(parsed));
			} else {
				localStorage.setItem('dailyRecords', JSON.stringify([{ date, records }, ...parsed]));
			}
		} catch (e) {
			alert('Failed to save records');
		}
	};

	const addRecord = (record: DuitRecord) => {
		records = [record, ...records];

		saveDailyRecords();
	};

	$: console.log(date);

	// form
	let amount: number;
	let details: string;

	const submitForm = () => {
		const date = new Date();
		const hour = date.toLocaleString('en-US', { hour: 'numeric', hour12: true });
		const minute = date.toLocaleString('en-US', { minute: '2-digit' });
		const amPm = date.toLocaleString('en-US', { hour: 'numeric', hour12: true, hourCycle: 'h12' });
		const time = `${hour.split(' ')[0]}:${minute} ${amPm.split(' ')[1]}`;

		console.log(time);

		addRecord({
			amount,
			details,
			time: time
		});

		amount = 0;
		details = '';
	};

	// display records
	$: totalSpent = records.reduce((acc, curr) => acc + curr.amount, 0);

	const removeByIndex = (index: number) => {
		records = records.filter((_, i) => i !== index);

		saveDailyRecords();
	};

	let isFormOpen = false;

	let isMenuOpen = false;
</script>

<svelte:head>
	<title>Dashboard | duitGone</title>
</svelte:head>

<Title on:click={() => (isMenuOpen = true)} />
<Menu bind:isMenuOpen />

<div class="tabs px-3.5 mb-4">
	<ul class="flex gap-3 justify-center items-end">
		<li class="text-base text-slate-900 font-semibold">Today</li>
		<!-- <li class="text-base text-slate-400 font-semibold">This Week</li>
		<li class="text-base text-slate-400 font-semibold">This Month</li> -->
	</ul>
</div>

<div class="mb-6 px-3.5 pie-container">
	<div class="mb-4">
		<Pie {records} />
	</div>
	<span class="block text-3xl font-semibold text-center text-slate-900">
		RM {totalSpent}
	</span>
</div>

<div class="records">
	{#each records as record, i}
		<div
			class="bg-white py-3 px-3.5 flex justify-between items-center border-b border-slate-200 first-of-type:border-t"
		>
			<div class="details-and-time">
				<span class="details text-sm text-slate-900 mb-2 block">{record.details || 'Unknown'}</span>
				<span class="time text-xs text-slate-600">
					{record.time}
				</span>
			</div>
			<div class="amount">
				<span class="text-sm font-semibold text-red-500">- RM {record.amount}</span>
			</div>
		</div>
	{/each}
</div>

<div class="cta mt-24">
	<button
		class="p-5 bg-orange-500 text-slate-100 rounded-full w-16 h-16 flex items-center justify-center fixed bottom-7 right-5"
		on:click={() => {
			isFormOpen = true;
		}}
	>
		<i class="ph ph-plus" />
	</button>
</div>
<div>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="form-bg opacity-25 {isFormOpen
			? 'left-0'
			: 'left-full'} fixed bg-slate-900 w-full h-full top-0"
		on:click={() => {
			isFormOpen = false;
		}}
	/>
	<div
		class="forms fixed bg-slate-50 w-full top-0 h-full z-10 {isFormOpen
			? 'left-0 sm:right-0 sm:left-auto'
			: 'left-full sm:-right-full sm:left-auto'} transition-all w-[650px] max-w-full"
	>
		<div class="title p-3.5 bg-orange-500 text-slate-100 flex justify-start items-center mb-9">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<i
				class="ph ph-arrow-left mr-4"
				on:click={() => {
					isFormOpen = false;
				}}
			/>
			<h2 class="text-lg">Add Record</h2>
		</div>

		<form
			class="px-3.5"
			on:submit={() => {
				submitForm();
				isFormOpen = false;
			}}
		>
			<div class="input-group mb-4">
				<label for="amount" class="text-base text-slate-700 mb-2">Amount</label>
				<input
					class="rounded block bg-slate-100 border border-slate-300 px-3.5 py-2.5 w-full
					focus:active:border-orange-500"
					type="number"
					id="amount"
					min="0"
					step="0.01"
					required
					placeholder="0.00"
					bind:value={amount}
				/>
			</div>
			<div class="input-group mb-4">
				<label for="details" class="text-base text-slate-700 mb-2">
					Details <span>(optional)</span>
				</label>
				<input
					id="details"
					class="block rounded bg-slate-100 border border-slate-300 px-3.5 py-2.5 w-full focus:active:border-orange-500"
					placeholder="e.g Food"
					bind:value={details}
				/>
			</div>
			<div class="input-group mb-4 mt-8">
				<button type="submit" class="block w-full p-3.5 bg-orange-500 text-slate-100 rounded">
					Add
				</button>
			</div>
		</form>
	</div>
</div>
