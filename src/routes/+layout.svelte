<script>
	import Menu from '$lib/components/Menu.svelte';
	import Title from '$lib/components/Title.svelte';
	import '../app.css';

	let isMenuOpen = false;
</script>

<slot />

<style>
	:global(html) {
		@apply bg-slate-100;
	}
	:global(body) {
		@apply bg-slate-50 relative;
		@apply w-[560px] max-w-full mx-auto h-full pb-1;
	}

	:global(.ph) {
		font-size: 24px;
	}
</style>
