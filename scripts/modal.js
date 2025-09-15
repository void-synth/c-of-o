window.initModal = function(){};

function openPaymentPortal() {
	const modal = document.getElementById('paymentModal');
	// Close mobile drawer if open
	const drawer = document.getElementById('mobile-menu');
	const backdrop = document.getElementById('drawer-backdrop');
	if (drawer && drawer.classList.contains('open')) {
		drawer.classList.remove('open');
		if (backdrop) backdrop.classList.remove('visible');
	}
	if (modal) {
		modal.classList.add('active');
		document.body.style.overflow = 'hidden';
	}
}

function closePaymentModal() {
	const modal = document.getElementById('paymentModal');
	if (modal) {
		modal.classList.remove('active');
		document.body.style.overflow = 'auto';
	}
}

function validateApplicationForm(formData) {
	const requiredFields = ['fullName', 'email', 'phone', 'propertyAddress', 'landSize'];
	const errors = [];
	
	// Clear previous errors
	requiredFields.forEach(field => {
		const errorEl = document.getElementById(field + '-error');
		const inputEl = document.getElementById(field);
		if (errorEl) errorEl.classList.remove('show');
		if (inputEl) inputEl.classList.remove('error');
	});
	
	requiredFields.forEach(field => {
		const value = formData[field] || '';
		const errorEl = document.getElementById(field + '-error');
		const inputEl = document.getElementById(field);
		
		if (!value.trim()) {
			const fieldName = field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
			errors.push(`${fieldName} is required`);
			if (errorEl) {
				errorEl.textContent = `${fieldName} is required`;
				errorEl.classList.add('show');
			}
			if (inputEl) inputEl.classList.add('error');
		}
	});
	
	if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
		errors.push('Please enter a valid email address');
		const errorEl = document.getElementById('email-error');
		const inputEl = document.getElementById('email');
		if (errorEl) {
			errorEl.textContent = 'Please enter a valid email address';
			errorEl.classList.add('show');
		}
		if (inputEl) inputEl.classList.add('error');
	}
	
	if (formData.phone && !/^[\+]?\d[\d\s\-\(\)]{9,}$/.test(formData.phone)) {
		errors.push('Please enter a valid phone number');
		const errorEl = document.getElementById('phone-error');
		const inputEl = document.getElementById('phone');
		if (errorEl) {
			errorEl.textContent = 'Please enter a valid phone number';
			errorEl.classList.add('show');
		}
		if (inputEl) inputEl.classList.add('error');
	}
	
	return { isValid: errors.length === 0, errors };
}

function processPayment() {
	const formData = {
		fullName: document.getElementById('fullName')?.value || '',
		email: document.getElementById('email')?.value || '',
		phone: document.getElementById('phone')?.value || '',
		propertyAddress: document.getElementById('propertyAddress')?.value || '',
		landSize: document.getElementById('landSize')?.value || ''
	};
	
	const validation = validateApplicationForm(formData);
	if (!validation.isValid) {
		return; // Errors are now shown inline
	}
	
	// Initialize BluePay and process payment
	if (typeof BluePay !== 'undefined') {
		console.log('BluePay loaded successfully');
		BluePay.init('blue_test_289de48ef5e64');
		console.log('Processing payment for ₦48,000');
		BluePay.checkout({
			amount: "48000",
			productID: '19985',
			payerEmail: formData.email,
			cardHolderName: formData.fullName,
			payerPhoneNumber: formData.phone,
			successUrl: '/success.html',
			failureUrl: '/failure.html'
		});
	} else {
		console.error('BluePay not loaded - check script source');
		alert('Payment gateway not available. Please try again later.');
	}
}

function formatCurrency(amount) {
	return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
	const modal = document.getElementById('paymentModal');
	if (e.target === modal) {
		closePaymentModal();
	}
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
	if (e.key === 'Escape') {
		closePaymentModal();
	}
});

