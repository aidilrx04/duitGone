<script>
	export let isMenuOpen = false;
</script>

<div class="menu-container">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="menu-bg fixed w-full h-full {isMenuOpen
			? 'left-0'
			: '-left-full'} top-0 bg-black opacity-25 z-20"
		on:click={() => {
			isMenuOpen = false;
		}}
	/>
	<div
		class="menu fixed h-full top-0 {isMenuOpen
			? 'left-0'
			: '-left-full'} z-30 bg-slate-50 w-60 transition-all"
	>
		<div class="title text-slate-100 bg-orange-500 p-3.5 flex items-center justify-start mb-9">
			<button
				class="w-min mr-4 flex items-center justify-center"
				on:click={() => {
					isMenuOpen = false;
				}}
			>
				<i class="ph ph-x" />
			</button>
			<span class="text-lg">duitGone</span>
		</div>

		<div class="items">
			<ul>
				<li>
					<a href="/" class="menu-link">
						<i class="ph ph-house" />
						<span>Dashboard</span>
					</a>
				</li>
				<li>
					<a href="/about" class="menu-link">
						<i class="ph ph-info" />
						<span>About</span>
					</a>
				</li>
			</ul>
		</div>
	</div>
</div>

<style lang="postcss">
	.menu-link {
		@apply px-3.5 py-2 text-base flex items-center justify-start text-slate-800 font-medium;
	}

	.menu-link i {
		@apply mr-4;
	}
</style>
