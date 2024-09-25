<template>
	<div>
		<Layout/>
		<NuxtLink id="adminpanelbtn" to="/adminpanel"/>
	</div>
</template>

<script>
const fs = require('fs');
import addons from '~/assets/data/addons.json'

export default {
	data() {
		return {
			
		}
	},
	methods: {

	},
	mounted() {
		console.log(addons)

		document.addEventListener('keydown', function(event) {
			if (event.ctrlKey && event.key === '1') {
				document.querySelector('#adminpanelbtn').click();
			}
		});
	}
}
</script>
