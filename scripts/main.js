// Simple component loader to inject HTML fragments
async function loadComponent(selector, url) {
	const host = document.querySelector(selector);
	if (!host) return;
	try {
		const res = await fetch(url, { cache: 'no-cache' });
		if (!res.ok) throw new Error('Failed to load ' + url);
		host.innerHTML = await res.text();
	} catch (err) {
		console.error(err);
	}
}

document.addEventListener('DOMContentLoaded', async function() {
	await Promise.all([
		loadComponent('#header-root', './components/header.html'),
		loadComponent('#modal-root', './components/modal.html')
	]);
	if (window.initHeader) window.initHeader();
	if (window.initModal) window.initModal();
});

