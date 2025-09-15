// Smooth scrolling for navigation links in header
window.initHeader = function() {
	const navLinks = document.querySelectorAll('.nav-link');
	const toggle = document.querySelector('.menu-toggle');
	const drawer = document.getElementById('mobile-menu');
	const backdrop = document.getElementById('drawer-backdrop');
	const closeBtn = drawer ? drawer.querySelector('.drawer-close') : null;
	
	navLinks.forEach(link => {
		link.addEventListener('click', function(e) {
			e.preventDefault();
			const targetId = this.getAttribute('href');
			
			if (targetId && targetId.startsWith('#')) {
				const targetElement = document.querySelector(targetId);
				if (targetElement) {
					targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
				}
			}
		});
	});

	// Mobile drawer toggle
	if (toggle && drawer) {
		// Ensure drawer is not visible until JS initializes
		drawer.hidden = false;
		if (backdrop) backdrop.hidden = false;
		const setState = (open) => {
			drawer.classList.toggle('open', open);
			toggle.setAttribute('aria-expanded', String(open));
			drawer.setAttribute('aria-hidden', String(!open));
			document.body.style.overflow = open ? 'hidden' : 'auto';
			if (backdrop) backdrop.classList.toggle('visible', open);
		};
		toggle.addEventListener('click', () => setState(!drawer.classList.contains('open')));
		closeBtn && closeBtn.addEventListener('click', () => setState(false));
		drawer.addEventListener('click', (e) => { if (e.target === drawer) setState(false); });
		backdrop && backdrop.addEventListener('click', () => setState(false));
	}
};

// Navbar scroll effect
window.addEventListener('scroll', function() {
	const navContainer = document.querySelector('.nav-container');
	if (!navContainer) return;
	
	if (window.scrollY > 50) {
		navContainer.style.background = 'rgba(255, 255, 255, 0.98)';
		navContainer.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
	} else {
		navContainer.style.background = 'rgba(255, 255, 255, 0.95)';
		navContainer.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
	}
});

// CTA hover micro-interactions
window.initHeader = window.initHeader || function(){};
(function() {
	const ctaButton = document.querySelector('.cta-button');
	if (!ctaButton) return;
	
	ctaButton.addEventListener('mouseenter', function() {
		this.style.transform = 'translateY(-2px) scale(1.02)';
	});
	
	ctaButton.addEventListener('mouseleave', function() {
		this.style.transform = 'translateY(0) scale(1)';
	});
})();

