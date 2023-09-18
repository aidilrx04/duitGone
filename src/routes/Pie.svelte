<script lang="ts">
	import {
		PieController,
		ArcElement,
		Colors,
		Chart,
		Legend,
		type ChartData,
		type ChartConfiguration,
		Tooltip
	} from 'chart.js';
	import { onDestroy, onMount } from 'svelte';
	import type { DuitRecord } from './types';

	export let records: DuitRecord[];

	let labels: { [key: string]: number } = {};

	$: labels = records.reduce((acc, val) => {
		let label = val.details || 'Unknown';

		return { ...acc, [label]: acc[label] ? acc[label] + val.amount : val.amount };
	}, {} as { [key: string]: number });

	$: console.log(labels);
	$: console.log(Object.keys(labels));
	$: console.log(Object.values(labels));

	Chart.register(Colors);
	Chart.register(PieController);
	Chart.register(ArcElement);
	Chart.register(Legend);
	Chart.register(Tooltip);

	let data: ChartData;
	$: data = {
		labels: records.length > 0 ? Object.keys(labels) : ['No data'],
		datasets: [
			{
				label: 'Expenses',
				data: records.length > 0 ? Object.values(labels) : [1],
				backgroundColor: records.length > 0 ? undefined : 'gray'
			}
		]
	};

	let config: ChartConfiguration;
	$: config = {
		type: 'pie',
		data: data,
		options: {
			pie: {
				datasets: {
					borderWidth: 5,
					borderColor: 'red',
					animation: false
				}
			},
			plugins: {
				legend: {
					position: 'bottom',
					labels: {
						boxWidth: 15,
						boxHeight: 15
					}
				}
			}
		}
	};

	let chartCanvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let chart: Chart;

	$: if (ctx) {
		if (chart) {
			chart.destroy();
		}
		chart = new Chart(ctx, config);
	}

	onMount(() => {
		ctx = chartCanvas.getContext('2d') as CanvasRenderingContext2D;

		// chart = new Chart(ctx, config);
	});

	onDestroy(() => {
		if (chart) {
			chart.destroy();
		}
	});
</script>

<div class="">
	<canvas class="mx-auto" bind:this={chartCanvas} id="distribution-pie" />
</div>
