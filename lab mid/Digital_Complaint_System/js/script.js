/**
 * ComplaintGuard - Core Logic
 */

// Initialize Local Storage
const STORAGE_KEY = 'cg_complaints';

const initData = () => {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (!existing) {
        const dummyData = [
            {
                id: 'CG-10251',
                name: 'John Doe',
                email: 'john@example.com',
                phone: '123-456-7890',
                category: 'Technical',
                description: 'Website is slow during peak hours.',
                status: 'Pending',
                date: new Date().toISOString()
            },
            {
                id: 'CG-10252',
                name: 'Jane Smith',
                email: 'jane@example.com',
                phone: '987-654-3210',
                category: 'Billing',
                description: 'Charged twice for the subscription.',
                status: 'In Progress',
                date: new Date().toISOString()
            }
        ];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dummyData));
    }
};

// HELPER: Generate Unique ID
const generateID = () => {
    return 'CG-' + Math.floor(10000 + Math.random() * 90000);
};

// HELPER: Get all complaints
const getComplaints = () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

// HELPER: Save complaint
const saveComplaint = (complaint) => {
    const complaints = getComplaints();
    complaints.push(complaint);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(complaints));
};

// HELPER: Update status
const updateStatus = (id, newStatus) => {
    const complaints = getComplaints();
    const index = complaints.findIndex(c => c.id === id);
    if (index !== -1) {
        complaints[index].status = newStatus;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(complaints));
        return true;
    }
    return false;
};

// THEME TOGGLE
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

if (themeToggle) {
    const currentTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', currentTheme);
    updateToggleIcon(currentTheme);

    themeToggle.addEventListener('click', () => {
        const newTheme = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateToggleIcon(newTheme);
    });
}

function updateToggleIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// FORM HANDLING (Complaint Submission)
const complaintForm = document.getElementById('complaintForm');
if (complaintForm) {
    complaintForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(complaintForm);
        const complaint = {
            id: generateID(),
            name: formData.get('fullName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            category: formData.get('category'),
            description: formData.get('description'),
            status: 'Pending',
            date: new Date().toISOString()
        };

        // Basic Validation
        if (!complaint.name || !complaint.email || !complaint.description) {
            showToast('Please fill all required fields.', 'error');
            return;
        }

        saveComplaint(complaint);
        showToast(`Complaint submitted! Your ID is: ${complaint.id}`, 'success');
        complaintForm.reset();
        
        // Optional: Redirect after delay
        setTimeout(() => {
            window.location.href = `track.html?id=${complaint.id}`;
        }, 3000);
    });
}

// TRACKING HANDLING
const trackBtn = document.getElementById('trackBtn');
if (trackBtn) {
    const trackInput = document.getElementById('trackInput');
    const resultDiv = document.getElementById('trackResult');

    const handleTrack = () => {
        const query = trackInput.value.trim().toLowerCase();
        if (!query) return;

        const complaints = getComplaints();
        const found = complaints.filter(c => 
            c.id.toLowerCase() === query || c.email.toLowerCase() === query
        );

        if (found.length > 0) {
            renderResults(found);
        } else {
            resultDiv.innerHTML = `<p class="animate-fade" style="color: var(--danger-color); text-align: center;">No records found for "${query}"</p>`;
        }
    };

    trackBtn.addEventListener('click', handleTrack);
    
    // Auto-search if ID in URL
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get('id');
    if (idParam) {
        trackInput.value = idParam;
        handleTrack();
    }

    function renderResults(results) {
        resultDiv.innerHTML = results.map(c => `
            <div class="card animate-fade" style="padding: 1.5rem; background: var(--card-bg); border-radius: var(--radius); border: 1px solid var(--border-color); margin-bottom: 1rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <span style="font-weight: 800; color: var(--primary-color);">${c.id}</span>
                    <span class="badge badge-${c.status.toLowerCase().replace(' ', '')}">${c.status}</span>
                </div>
                <p><strong>Category:</strong> ${c.category}</p>
                <p><strong>Date:</strong> ${new Date(c.date).toLocaleDateString()}</p>
                <p style="margin-top: 1rem; padding: 1rem; background: var(--bg-color); border-radius: 8px;">${c.description}</p>
            </div>
        `).join('');
    }
}

// ADMIN DASHBOARD HANDLING
const adminTable = document.getElementById('adminTableBody');
if (adminTable) {
    const filterStatus = document.getElementById('filterStatus');
    const filterCategory = document.getElementById('filterCategory');

    const renderAdminTable = () => {
        const complaints = getComplaints();
        const statusVal = filterStatus.value;
        const catVal = filterCategory.value;

        const filtered = complaints.filter(c => {
            const statusMatch = !statusVal || c.status === statusVal;
            const catMatch = !catVal || c.category === catVal;
            return statusMatch && catMatch;
        });

        adminTable.innerHTML = filtered.map(c => `
            <tr>
                <td><strong>${c.id}</strong></td>
                <td>${c.name}<br><small style="color: var(--text-muted)">${c.email}</small></td>
                <td>${c.category}</td>
                <td><span class="badge badge-${c.status.toLowerCase().replace(' ', '')}">${c.status}</span></td>
                <td>
                    <select onchange="updateStatusHandler('${c.id}', this.value)" class="form-control" style="padding: 0.3rem; font-size: 0.8rem;">
                        <option value="Pending" ${c.status === 'Pending' ? 'selected' : ''}>Pending</option>
                        <option value="In Progress" ${c.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                        <option value="Resolved" ${c.status === 'Resolved' ? 'selected' : ''}>Resolved</option>
                    </select>
                </td>
            </tr>
        `).reverse().join('');
    };

    filterStatus.addEventListener('change', renderAdminTable);
    filterCategory.addEventListener('change', renderAdminTable);

    // Global handler for status update
    window.updateStatusHandler = (id, newStatus) => {
        if (updateStatus(id, newStatus)) {
            showToast(`Status updated for ${id}`, 'success');
            renderAdminTable();
        }
    };

    renderAdminTable();
}

// TOAST NOTIFICATIONS
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `animate-fade`;
    toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        padding: 1rem 2rem;
        background: ${type === 'success' ? 'var(--success-color)' : type === 'error' ? 'var(--danger-color)' : 'var(--primary-color)'};
        color: white;
        border-radius: var(--radius);
        box-shadow: var(--shadow-md);
        z-index: 9999;
        font-weight: 600;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
}

// Run Init
initData();
