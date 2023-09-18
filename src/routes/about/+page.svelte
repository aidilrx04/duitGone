<script>
	import Menu from '$lib/components/Menu.svelte';
	import Title from '$lib/components/Title.svelte';

	let isMenuOpen = false;
</script>

<svelte:head>
	<title>About | duitGone</title>
</svelte:head>

<Title on:click={() => (isMenuOpen = true)} />

<Menu bind:isMenuOpen />

<div class="about p-3.5">
	<img src="/web/icon-192.png" class="mb-4" alt="App icon" />
	<h2 class="text-lg mb-4 text-slate-900">About</h2>
	<p class="text-sm text-slate-700">
		duitGone is a simple finance manager where you record all your money expenses and can review
		where all your money 'gone' later
		<br />
		<br />
		Created by <a class="link" href="https://github.com/aidilrx04" target="_blank">@aidilrx04</a>
		<br />
		Public repo: <a class="link" href="https://github.com/aidilrx04" target="_blank">duitGone</a>
		<br />
		Powered by: <a class="link" href="https://kit.svelte.dev" target="_blank">Svelte/Kit</a>
	</p>
</div>

<style>
	.link {
		@apply text-orange-500 underline;
	}
</style>
