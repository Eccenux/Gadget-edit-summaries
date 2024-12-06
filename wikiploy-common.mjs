import { DeployConfig } from 'wikiploy';

/**
 * Add config.
 * @param {Array} configs DeployConfig array.
 * @param {String} site Domian of a MW site.
 */
export function addConfig(configs, site, isRelease = false) {
	let deploymentName = isRelease ? 'MediaWiki:Gadget-edit-summaries-' : '~/edit-summaries-';
	configs.push(new DeployConfig({
		src: 'core.js',
		dst: `${deploymentName}core.js`,
		site,
		nowiki: false,
	}));
	configs.push(new DeployConfig({
		src: 'local.js',
		dst: `${deploymentName}local.js`,
		site,
	}));
}
export function addConfigRelease(configs, site) {
	addConfig(configs, site, true);
}
