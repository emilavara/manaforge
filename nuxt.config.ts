// https://nuxt.com/docs/api/configuration/nuxt-config
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineNuxtConfig({
	typescript: {
		shim: false,
	},
	ssr: false,
	css: ['~/css/main.scss'],
	hooks: {
		'vite:extendConfig': (config) => {
			config.plugins!.push(nodePolyfills());
		}
	}
});
