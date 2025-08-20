// Global variables
let currentPage = 'home';
let totalVisitors = 1247;
let totalCards = 892;
let successRate = 98.7;
let avgTime = 1.2;

// Enhanced demo card data with more comprehensive information
const demoCard = {
    number: '5524610588774135',
    expiry: '01/30',
    cvv: '774',
    holder: 'ANSARI RAGH',
    type: 'Mastercard',
    issuer: 'JS BANK LIMITED',
    bank: 'JS BANK LIMITED',
    cardLevel: 'STD',
    cardCategory: 'DEBIT CARD',
    balance: '₹89,000',
    credit: '₹0.00',
    limit: '₹100,000.00',
    availableCredit: '₹0.00',
    lastPayment: '₹0.00',
    paymentDue: '₹0.00',
    dueDate: 'N/A',
    lastTransaction: '₹5,000 - ATM Withdrawal',
    lastTransactionDate: '2024-01-10 14:30:25',
    cardStatus: 'Active',
    fraudScore: 'Low Risk',
    fullName: 'ANSARI RAGH',
    address: 'Karachi, Pakistan',
    city: 'Karachi',
    state: 'Sindh',
    zip: '75000',
    country: 'Pakistan',
    phone: '+92-300-1234567',
    email: 'ansari.ragh@email.com',
    ssn: '***-**-1234',
    creditScore: 'N/A',
    accountOpenDate: '2022-06-15',
    cardNetwork: 'Mastercard',
    cardBrand: 'JS BANK DEBIT CARD',
    internationalUsage: 'Enabled',
    contactlessEnabled: 'Yes',
    chipEnabled: 'Yes',
    magneticStripe: 'Yes',
    onlinePurchases: 'Enabled',
    atmWithdrawals: 'Enabled',
    dailyLimit: '₹50,000.00',
    monthlyLimit: '₹500,000.00'
};

// Enhanced random data arrays
const randomNames = [
    'Sarah Elizabeth Johnson', 'Michael Chen Wei', 'Emily Rodriguez Martinez', 
    'David Thompson Smith', 'Lisa Anderson Brown', 'James Wilson Davis',
    'Maria Garcia Lopez', 'Robert Brown Miller', 'Jennifer Davis Wilson',
    'Christopher Lee Anderson', 'Amanda Martinez Garcia', 'Daniel Taylor Johnson'
];

const randomAddresses = [
    '456 Oak Avenue, Suite 12', '789 Pine Street, Unit 5', '321 Elm Road, Apt 8',
    '654 Maple Drive, Floor 3', '987 Cedar Lane, Building A', '147 Birch Way, Room 15',
    '258 Spruce Court, Unit 7', '369 Willow Street, Apt 22', '741 Aspen Boulevard, Suite 9'
];

const randomCities = ['Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];
const randomStates = ['CA', 'IL', 'TX', 'AZ', 'PA', 'FL', 'NY', 'OH', 'GA'];
const randomZips = ['90210', '60601', '77001', '85001', '19101', '33101', '10001', '43201', '30301'];

const randomTransactions = [
    { amount: 'PKR 2,350', merchant: 'Imtiaz Super Market', date: '2024-01-10 16:45:12', category: 'Retail' },
    { amount: 'PKR 5,800', merchant: 'Chase Up', date: '2024-01-09 14:20:33', category: 'Retail' },
    { amount: 'PKR 750', merchant: 'Gloria Jeans', date: '2024-01-09 08:15:45', category: 'Food & Beverage' },
    { amount: 'PKR 18,999', merchant: 'Daraz.pk', date: '2024-01-08 19:30:18', category: 'Online Retail' },
    { amount: 'PKR 1,250', merchant: 'KFC Pakistan', date: '2024-01-08 12:45:22', category: 'Fast Food' },
    { amount: 'PKR 4,490', merchant: 'Al-Fatah', date: '2024-01-07 15:20:10', category: 'Retail' },
    { amount: 'PKR 3,299', merchant: 'Hyperstar (Carrefour)', date: '2024-01-07 11:30:55', category: 'Retail' },
    { amount: 'PKR 9,999', merchant: 'Metro Pakistan', date: '2024-01-06 17:15:40', category: 'Wholesale' }
];

const cardTypes = [
    { name: 'Visa', issuer: 'Chase Bank', network: 'Visa', color: '#1a1f71' },
    { name: 'Mastercard', issuer: 'Bank of America', network: 'Mastercard', color: '#eb001b' },
    { name: 'American Express', issuer: 'American Express', network: 'Amex', color: '#006fcf' },
    { name: 'Discover', issuer: 'Discover Bank', network: 'Discover', color: '#ff6000' }
];

const cardLevels = ['Classic', 'Gold', 'Platinum', 'Signature', 'Infinite', 'Black'];
const cardCategories = ['Rewards', 'Cash Back', 'Travel', 'Business', 'Student', 'Secured'];
const fraudScores = ['Low Risk', 'Medium Risk', 'High Risk'];
const creditScores = ['Poor (300-579)', 'Fair (580-669)', 'Good (670-739)', 'Very Good (740-799)', 'Excellent (800-850)'];

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeFormHandling();
    updateStats();
    loadRecentActivity();
    
    setInterval(() => {
        totalVisitors += Math.floor(Math.random() * 3) + 1;
        updateStats();
    }, 30000);
});

// Normalize expiry inputs like "01 1030" or "01-30" to "01/30"
function normalizeExpiry(input) {
    if (!input) return '';
    const digits = String(input).replace(/\D/g, '').slice(0, 4);
    if (digits.length <= 2) return digits;
    return digits.slice(0, 2) + '/' + digits.slice(2);
}

// Navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            navigateToPage(targetPage);
            
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

function navigateToPage(pageName) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    const targetPage = document.getElementById(pageName);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageName;
        
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageName) {
                link.classList.add('active');
            }
        });
    }
}

// Enhanced form handling with better validation
function initializeFormHandling() {
    const cardForm = document.getElementById('cardForm');
    const cardNumberInput = document.getElementById('cardNumber');
    const expiryInput = document.getElementById('expiryDate');
    const cvvInput = document.getElementById('cvv');
    const activateBtn = document.getElementById('activateButton');
    const holderInput = document.getElementById('cardHolder');

    cardNumberInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s/g, '');
        value = value.replace(/\D/g, '');
        value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        e.target.value = value;
        
        // Real-time card type detection
        detectCardType(value.replace(/\s/g, ''));
        maybeEnableActivate();
    });

    expiryInput.addEventListener('input', function(e) {
        e.target.value = normalizeExpiry(e.target.value);
        maybeEnableActivate();
    });

    cvvInput.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/\D/g, '');
        maybeEnableActivate();
    });

    // Also react to holder name edits
    if (holderInput) {
        holderInput.addEventListener('input', function() {
            maybeEnableActivate();
        });
    }

    cardForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            processCardVerification();
        }
    });

    // Enable/disable Activate button based on naive validity
    function maybeEnableActivate() {
        const enteredNumber = cardNumberInput.value.replace(/\s/g, '');
        const enteredExpiry = normalizeExpiry(expiryInput.value);
        const enteredCvv = cvvInput.value.trim();
        const numberOk = enteredNumber.length >= 13;
        const expiryOk = /^\d{2}\/\d{2}$/.test(enteredExpiry);
        const cvvOk = enteredCvv.length >= 3;

        const holderVal = holderInput ? holderInput.value.toUpperCase().trim() : '';
        const isDemoCandidate = (
            enteredNumber === demoCard.number &&
            enteredExpiry === demoCard.expiry &&
            enteredCvv === demoCard.cvv &&
            holderVal === demoCard.holder
        );

        // Always keep button clickable to show toast when not allowed
        activateBtn.disabled = false;

        if (numberOk && expiryOk && cvvOk && isDemoCandidate) {
            activateBtn.classList.add('enabled');
            activateBtn.dataset.allowed = 'true';
        } else {
            activateBtn.classList.remove('enabled');
            activateBtn.dataset.allowed = 'false';
        }
    }

    // Simulate activation flow
    activateBtn.addEventListener('click', function() {
        // Only allow activation for purchased (saved) cards
        if (activateBtn.dataset.allowed !== 'true') {
            showToast('Only purchased cards can be activated');
            return;
        }
        const text = activateBtn.querySelector('.button-text');
        const spinner = activateBtn.querySelector('.loading-spinner');
        text.style.display = 'none';
        spinner.style.display = 'block';
        activateBtn.disabled = true;
        setTimeout(() => {
            spinner.style.display = 'none';
            text.style.display = 'block';
            text.textContent = 'Activated';
            activateBtn.classList.remove('enabled');
            // Add an entry to activity list
            addRecentActivity(cardNumberInput.value.replace(/\s/g, ''), true);
            showToast('Card activated successfully');
        }, 1800);
    });
}

// Toast helper
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => {
        toast.classList.remove('show');
    }, 2200);
}

function detectCardType(cardNumber) {
    const cardTypeDisplay = document.createElement('div');
    cardTypeDisplay.className = 'card-type-display';
    
    let cardType = 'Unknown';
    let cardColor = '#666';
    
    if (cardNumber.startsWith('4')) {
        cardType = 'Visa';
        cardColor = '#1a1f71';
    } else if (cardNumber.startsWith('5')) {
        cardType = 'Mastercard';
        cardColor = '#eb001b';
    } else if (cardNumber.startsWith('34') || cardNumber.startsWith('37')) {
        cardType = 'American Express';
        cardColor = '#006fcf';
    } else if (cardNumber.startsWith('6')) {
        cardType = 'Discover';
        cardColor = '#ff6000';
    }
    
    // Remove existing card type display
    const existing = document.querySelector('.card-type-display');
    if (existing) existing.remove();
    
    if (cardNumber.length >= 4) {
        cardTypeDisplay.innerHTML = `
            <i class="fas fa-credit-card" style="color: ${cardColor}"></i>
            <span style="color: ${cardColor}">${cardType}</span>
        `;
        cardTypeDisplay.style.cssText = `
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            align-items: center;
            gap: 5px;
            font-weight: 600;
            font-size: 0.9rem;
        `;
        
        const inputGroup = document.querySelector('#cardNumber').parentElement;
        inputGroup.style.position = 'relative';
        inputGroup.appendChild(cardTypeDisplay);
    }
}

function validateForm() {
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
    const expiryDate = normalizeExpiry(document.getElementById('expiryDate').value);
    const cvv = document.getElementById('cvv').value;
    const cardHolder = document.getElementById('cardHolder').value;

    // Basic validation - no algorithm checks
    if (cardNumber.length < 13 || cardNumber.length > 19) {
        showError('Card number must be between 13 and 19 digits');
        return false;
    }

    if (!expiryDate.match(/^\d{2}\/\d{2}$/)) {
        showError('Please enter expiry date in MM/YY format');
        return false;
    }

    const [month, year] = expiryDate.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    if (parseInt(month) < 1 || parseInt(month) > 12) {
        showError('Invalid month in expiry date');
        return false;
    }

    if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
        showError('Card has expired');
        return false;
    }

    if (cvv.length < 3 || cvv.length > 4) {
        showError('CVV must be 3 or 4 digits');
        return false;
    }

    if (cardHolder.trim().length < 2) {
        showError('Please enter a valid card holder name');
        return false;
    }

    return true;
}



function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #dc3545;
        background: #f8d7da;
        border: 1px solid #f5c6cb;
        border-radius: 8px;
        padding: 12px;
        margin: 10px 0;
        font-size: 0.9rem;
        text-align: center;
    `;
    
    const form = document.getElementById('cardForm');
    const existingError = form.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    form.insertBefore(errorDiv, form.firstChild);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

function processCardVerification() {
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
    const expiryDate = normalizeExpiry(document.getElementById('expiryDate').value);
    const cvv = document.getElementById('cvv').value;
    const cardHolder = document.getElementById('cardHolder').value;

    const button = document.querySelector('.verify-button');
    const buttonText = button.querySelector('.button-text');
    const loadingSpinner = button.querySelector('.loading-spinner');
    
    buttonText.style.display = 'none';
    loadingSpinner.style.display = 'block';
    button.disabled = true;

    // Simulate processing steps
    const processingSteps = [
        'Validating card number...',
        'Checking card status...',
        'Verifying cardholder information...',
        'Retrieving account details...',
        'Analyzing transaction history...',
        'Generating security report...'
    ];

    let stepIndex = 0;
    const stepInterval = setInterval(() => {
        if (stepIndex < processingSteps.length) {
            buttonText.textContent = processingSteps[stepIndex];
            stepIndex++;
        } else {
            clearInterval(stepInterval);
            
            const isDemoCard = cardNumber === demoCard.number && 
                              normalizeExpiry(expiryDate) === demoCard.expiry && 
                              cvv === demoCard.cvv && 
                              cardHolder.toUpperCase() === demoCard.holder;

            if (isDemoCard) {
                showDemoCardResults();
            } else {
                showNotPurchasedHere(cardNumber);
            }

            totalCards++;
            updateStats();
            addRecentActivity(cardNumber, isDemoCard);

            document.getElementById('cardForm').reset();
            
            buttonText.textContent = 'Verify Card';
            buttonText.style.display = 'block';
            loadingSpinner.style.display = 'none';
            button.disabled = false;

            navigateToPage('results');
        }
    }, 300);
}

function showDemoCardResults() {
    // Enhanced demo card results with more comprehensive information
    document.getElementById('resultCardNumber').textContent = '**** **** **** ' + demoCard.number.slice(-4);
    document.getElementById('resultCardType').textContent = demoCard.type;
    document.getElementById('resultCardHolder').textContent = demoCard.holder;
    document.getElementById('resultExpiry').textContent = demoCard.expiry;
    document.getElementById('resultBalance').textContent = demoCard.balance;
    document.getElementById('resultCredit').textContent = demoCard.credit;
    document.getElementById('resultLimit').textContent = demoCard.limit;
    document.getElementById('resultLastTransaction').textContent = demoCard.lastTransaction;
    document.getElementById('resultFullName').textContent = demoCard.fullName;
    document.getElementById('resultAddress').textContent = demoCard.address;
    document.getElementById('resultCity').textContent = demoCard.city;
    document.getElementById('resultState').textContent = demoCard.state;
    document.getElementById('resultZip').textContent = demoCard.zip;
    document.getElementById('resultPhone').textContent = demoCard.phone;

    // Add additional comprehensive information
    addComprehensiveCardInfo(demoCard);
}

function showRandomCardResults(cardNumber, expiryDate, cvv, cardHolder) {
    showNotPurchasedHere(cardNumber);
}

function showNotPurchasedHere(cardNumber) {
    // Clear or set base fields
    document.getElementById('resultCardNumber').textContent = '**** **** **** ' + cardNumber.slice(-4);
    document.getElementById('resultCardType').textContent = 'Unknown';
    document.getElementById('resultCardHolder').textContent = 'N/A';
    document.getElementById('resultExpiry').textContent = 'N/A';

    // Replace account and personal sections with a warning message
    const resultsContent = document.querySelector('.results-content');
    const existingSections = resultsContent.querySelectorAll('.comprehensive-section');
    existingSections.forEach(s => s.remove());

    // Update account info quick grid
    document.getElementById('resultBalance').textContent = 'N/A';
    document.getElementById('resultCredit').textContent = 'N/A';
    document.getElementById('resultLimit').textContent = 'N/A';
    document.getElementById('resultLastTransaction').textContent = 'N/A';

    // Personal info quick grid
    document.getElementById('resultFullName').textContent = 'N/A';
    document.getElementById('resultAddress').textContent = 'N/A';
    document.getElementById('resultCity').textContent = 'N/A';
    document.getElementById('resultState').textContent = 'N/A';
    document.getElementById('resultZip').textContent = 'N/A';
    document.getElementById('resultPhone').textContent = 'N/A';

    // Add a single notice section
    const notice = document.createElement('div');
    notice.className = 'comprehensive-section card-info-section';
    notice.innerHTML = `
        <h3><i class="fas fa-exclamation-triangle"></i> Notice</h3>
        <div class="card-details-grid">
            <div class="detail-item">
                <span class="detail-label">Status:</span>
                <span class="detail-value">This card is not purchased from here.</span>
            </div>
        </div>
    `;
    resultsContent.appendChild(notice);

    // Update verification status to a warning
    const statusBadge = document.querySelector('.verification-status .status-badge');
    const statusMessage = document.querySelector('.verification-status .status-message');
    if (statusBadge && statusMessage) {
        statusBadge.classList.remove('success');
        statusBadge.classList.add('warning');
        statusBadge.innerHTML = '<i class="fas fa-exclamation-circle"></i><span>Card Not Found Here</span>';
        statusMessage.textContent = 'The entered card does not match our records of purchased cards.';
    }
}

function addComprehensiveCardInfo(cardData) {
    // Create additional sections for comprehensive information
    const resultsContent = document.querySelector('.results-content');
    
    // Remove existing comprehensive sections
    const existingSections = resultsContent.querySelectorAll('.comprehensive-section');
    existingSections.forEach(section => section.remove());

    // Add Card Details Section
    const cardDetailsSection = createInfoSection('Card Details', 'fas fa-credit-card', [
        { label: 'Card Network', value: cardData.cardNetwork },
        { label: 'Card Brand', value: cardData.cardBrand },
        { label: 'Card Level', value: cardData.cardLevel },
        { label: 'Card Category', value: cardData.cardCategory },
        { label: 'Issuing Bank', value: cardData.issuer },
        { label: 'Card Status', value: cardData.cardStatus }
    ]);
    resultsContent.appendChild(cardDetailsSection);

    // Add Financial Details Section
    const financialSection = createInfoSection('Financial Details', 'fas fa-dollar-sign', [
        { label: 'Available Credit', value: cardData.availableCredit },
        { label: 'Last Payment', value: cardData.lastPayment },
        { label: 'Payment Due', value: cardData.paymentDue },
        { label: 'Due Date', value: cardData.dueDate },
        { label: 'Daily Limit', value: cardData.dailyLimit },
        { label: 'Monthly Limit', value: cardData.monthlyLimit }
    ]);
    resultsContent.appendChild(financialSection);

    // Add Security & Features Section
    const securitySection = createInfoSection('Security & Features', 'fas fa-shield-alt', [
        { label: 'Fraud Risk Score', value: cardData.fraudScore },
        { label: 'Credit Score Range', value: cardData.creditScore },
        { label: 'International Usage', value: cardData.internationalUsage },
        { label: 'Contactless Enabled', value: cardData.contactlessEnabled },
        { label: 'Chip Enabled', value: cardData.chipEnabled },
        { label: 'Online Purchases', value: cardData.onlinePurchases }
    ]);
    resultsContent.appendChild(securitySection);

    // Add Account Information Section
    const accountSection = createInfoSection('Account Information', 'fas fa-user-cog', [
        { label: 'Account Open Date', value: cardData.accountOpenDate },
        { label: 'SSN (Last 4)', value: cardData.ssn },
        { label: 'Email', value: cardData.email },
        { label: 'Country', value: cardData.country },
        { label: 'ATM Withdrawals', value: cardData.atmWithdrawals },
        { label: 'Magnetic Stripe', value: cardData.magneticStripe }
    ]);
    resultsContent.appendChild(accountSection);

    // Add Transaction History Section
    const transactionSection = createTransactionHistorySection();
    resultsContent.appendChild(transactionSection);
}

function createInfoSection(title, icon, data) {
    const section = document.createElement('div');
    section.className = 'comprehensive-section card-info-section';
    
    const sectionHTML = `
        <h3><i class="${icon}"></i> ${title}</h3>
        <div class="card-details-grid">
            ${data.map(item => `
                <div class="detail-item">
                    <span class="detail-label">${item.label}:</span>
                    <span class="detail-value">${item.value}</span>
                </div>
            `).join('')}
        </div>
    `;
    
    section.innerHTML = sectionHTML;
    return section;
}

function createTransactionHistorySection() {
    const section = document.createElement('div');
    section.className = 'comprehensive-section card-info-section';
    
    const recentTransactions = randomTransactions.slice(0, 5);
    
    const sectionHTML = `
        <h3><i class="fas fa-history"></i> Recent Transaction History</h3>
        <div class="transaction-list">
            ${recentTransactions.map(transaction => `
                <div class="transaction-item">
                    <div class="transaction-icon">
                        <i class="fas fa-shopping-cart"></i>
                    </div>
                    <div class="transaction-details">
                        <div class="transaction-merchant">${transaction.merchant}</div>
                        <div class="transaction-category">${transaction.category}</div>
                    </div>
                    <div class="transaction-amount">${transaction.amount}</div>
                    <div class="transaction-date">${transaction.date}</div>
                </div>
            `).join('')}
        </div>
    `;
    
    section.innerHTML = sectionHTML;
    return section;
}

// Dashboard functions
function updateStats() {
    document.getElementById('totalVisitors').textContent = totalVisitors.toLocaleString();
    document.getElementById('totalCards').textContent = totalCards.toLocaleString();
    document.getElementById('successRate').textContent = successRate.toFixed(1) + '%';
    document.getElementById('avgTime').textContent = avgTime.toFixed(1) + 's';
}

function addRecentActivity(cardNumber, isDemoCard) {
    const activityList = document.getElementById('activityList');
    const activityItem = document.createElement('div');
    activityItem.className = 'activity-item';
    
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const cardLastFour = cardNumber.slice(-4);
    const status = isDemoCard ? 'Demo Card Verified' : 'Card Verified';
    const icon = isDemoCard ? 'fa-star' : 'fa-credit-card';
    
    activityItem.innerHTML = `
        <div class="activity-icon">
            <i class="fas ${icon}"></i>
        </div>
        <div class="activity-content">
            <div class="activity-title">${status}</div>
            <div class="activity-time">Card ending in ${cardLastFour} • ${timeString}</div>
        </div>
    `;
    
    activityList.insertBefore(activityItem, activityList.firstChild);
    
    const activities = activityList.children;
    if (activities.length > 10) {
        activityList.removeChild(activities[activities.length - 1]);
    }
}

function loadRecentActivity() {
    const activityList = document.getElementById('activityList');
    const activities = [
        { title: 'Card Verified', card: '1234', time: '2:45 PM', icon: 'fa-credit-card' },
        { title: 'Demo Card Verified', card: '1111', time: '2:30 PM', icon: 'fa-star' },
        { title: 'Card Verified', card: '5678', time: '2:15 PM', icon: 'fa-credit-card' },
        { title: 'Card Verified', card: '9012', time: '2:00 PM', icon: 'fa-credit-card' },
        { title: 'Demo Card Verified', card: '1111', time: '1:45 PM', icon: 'fa-star' }
    ];
    
    activities.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <div class="activity-icon">
                <i class="fas ${activity.icon}"></i>
            </div>
            <div class="activity-content">
                <div class="activity-title">${activity.title}</div>
                <div class="activity-time">Card ending in ${activity.card} • ${activity.time}</div>
            </div>
        `;
        activityList.appendChild(activityItem);
    });
}

// Interactive features
document.addEventListener('DOMContentLoaded', function() {
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
});

// Easter egg
let clickCount = 0;
document.querySelector('.nav-logo').addEventListener('click', function() {
    clickCount++;
    if (clickCount === 5) {
        alert('🎉 You found the secret! This is a demo application for educational purposes only. 🎉');
        clickCount = 0;
    }
});
