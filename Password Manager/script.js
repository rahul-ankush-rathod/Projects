// script.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('passwordForm');
    const passwordList = document.getElementById('passwordList');
    const exportBtn = document.getElementById('exportBtn');
    const importBtn = document.getElementById('importBtn');
    const generateBtn = document.getElementById('generatePassword');
    
    // Initialize storage
    let passwords = JSON.parse(localStorage.getItem('passwords') || '[]');
    renderPasswords();

    // Form submit handler
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const website = document.getElementById('website').value.trim();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!website || !username || !password) {
            alert('Please fill in all fields');
            return;
        }

        const encryptedPassword = btoa(password); // Simple base64 encoding for demonstration
        passwords.push({ id: Date.now(), website, username, password: encryptedPassword });
        saveToLocalStorage();
        renderPasswords();
        form.reset();
    });

    // Generate password handler
    generateBtn.addEventListener('click', () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        let password = '';
        for (let i = 0; i < 16; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        document.getElementById('password').value = password;
    });

    // Password strength indicator
    document.getElementById('password').addEventListener('input', function(e) {
        const strength = calculatePasswordStrength(e.target.value);
        const strengthBar = document.getElementById('passwordStrength');
        strengthBar.style.width = `${strength}%`;
        strengthBar.style.backgroundColor = getStrengthColor(strength);
    });

    // Delete password handler
    passwordList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const id = parseInt(e.target.dataset.id);
            passwords = passwords.filter(p => p.id !== id);
            saveToLocalStorage();
            renderPasswords();
        }
    });

    // Toggle password visibility
    passwordList.addEventListener('click', (e) => {
        if (e.target.classList.contains('show-btn')) {
            const passwordSpan = e.target.previousElementSibling;
            const id = parseInt(e.target.dataset.id);
            const password = passwords.find(p => p.id === id).password;
            
            if (passwordSpan.classList.contains('masked')) {
                passwordSpan.textContent = atob(password);
                passwordSpan.classList.remove('masked');
                e.target.textContent = 'Hide';
            } else {
                passwordSpan.textContent = '•'.repeat(10);
                passwordSpan.classList.add('masked');
                e.target.textContent = 'Show';
            }
        }
    });

    // Export handler
    exportBtn.addEventListener('click', () => {
        const data = JSON.stringify(passwords);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'passwords-export.json';
        a.click();
    });

    // Import handler
    importBtn.addEventListener('change', (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                passwords = JSON.parse(event.target.result);
                saveToLocalStorage();
                renderPasswords();
            } catch {
                alert('Error importing passwords');
            }
        };
        reader.readAsText(file);
    });

    function renderPasswords() {
        passwordList.innerHTML = passwords.map(password => `
            <div class="password-item">
                <div>
                    <h3>${password.website}</h3>
                    <p>${password.username}</p>
                </div>
                <div>
                    <span class="masked">••••••••••</span>
                    <button class="show-btn" data-id="${password.id}">Show</button>
                    <button class="delete-btn" data-id="${password.id}">Delete</button>
                </div>
            </div>
        `).join('');
    }

    function saveToLocalStorage() {
        localStorage.setItem('passwords', JSON.stringify(passwords));
    }

    function calculatePasswordStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength += 25;
        if (password.match(/[A-Z]/)) strength += 25;
        if (password.match(/[0-9]/)) strength += 25;
        if (password.match(/[^A-Za-z0-9]/)) strength += 25;
        return Math.min(strength, 100);
    }

    function getStrengthColor(strength) {
        if (strength < 40) return '#ff4444';
        if (strength < 70) return '#ffbb33';
        return '#00C851';
    }
});