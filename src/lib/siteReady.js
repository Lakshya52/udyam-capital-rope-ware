// Tiny event bus so entrance animations can wait for the preloader.
export function markSiteReady() {
	if (window.__siteReady) return;
	window.__siteReady = true;
	window.dispatchEvent(new Event("site:ready"));
}

export function onSiteReady(cb) {
	if (window.__siteReady) {
		cb();
		return () => {};
	}
	const handler = () => cb();
	window.addEventListener("site:ready", handler, { once: true });
	return () => window.removeEventListener("site:ready", handler);
}
