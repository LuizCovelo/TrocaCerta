// TrocaCerta - Main Application JavaScript

// Global state management
let currentUser = null;
let currentPage = 'landing';
let userVehicles = [];

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize application
function initializeApp() {
    // Check for existing user session
    const savedUser = localStorage.getItem('trocacerta_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showDashboard();
    }

    // Initialize event listeners
    setupEventListeners();

    // Load sample data for demo
    loadSampleData();
}

// Setup event listeners
function setupEventListeners() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile menu toggle
    window.toggleMobileMenu = () => {
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenu.classList.toggle('hidden');
    };
}

// Navigation functions
function showLanding() {
    hideAllPages();
    document.getElementById('landing-page').classList.remove('hidden');
    currentPage = 'landing';
}

function showLogin() {
    hideAllPages();
    document.getElementById('auth-page').classList.remove('hidden');
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('register-form').classList.add('hidden');
    currentPage = 'login';
}

function showRegister() {
    hideAllPages();
    document.getElementById('auth-page').classList.remove('hidden');
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('register-form').classList.remove('hidden');
    currentPage = 'register';
}

function showDashboard() {
    hideAllPages();
    document.getElementById('dashboard-page').classList.remove('hidden');
    loadDashboardContent();
    currentPage = 'dashboard';
}

function hideAllPages() {
    document.getElementById('landing-page').classList.add('hidden');
    document.getElementById('auth-page').classList.add('hidden');
    document.getElementById('dashboard-page').classList.add('hidden');
}

// Authentication functions
function handleLogin(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');

    // Demo login - in production, this would make an API call
    if (email && password.length >= 6) {
        currentUser = {
            id: 1,
            name: 'Usuário Demo',
            email: email,
            plan: 'free',
            joinDate: new Date().toISOString()
        };

        localStorage.setItem('trocacerta_user', JSON.stringify(currentUser));
        showNotification('Login realizado com sucesso!', 'success');

        setTimeout(() => {
            showDashboard();
        }, 1000);
    } else {
        showNotification('Email ou senha inválidos', 'error');
    }
}

function handleRegister(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    // Demo registration
    if (name && email && password.length >= 6) {
        currentUser = {
            id: Date.now(),
            name: name,
            email: email,
            plan: 'free',
            joinDate: new Date().toISOString()
        };

        localStorage.setItem('trocacerta_user', JSON.stringify(currentUser));
        showNotification('Conta criada com sucesso!', 'success');

        setTimeout(() => {
            showDashboard();
        }, 1000);
    } else {
        showNotification('Preencha todos os campos corretamente', 'error');
    }
}

function handleGoogleLogin() {
    // Demo Google login
    showNotification('Login com Google em desenvolvimento', 'info');
}

function logout() {
    currentUser = null;
    localStorage.removeItem('trocacerta_user');
    showNotification('Logout realizado com sucesso!', 'success');
    showLanding();
}

// Dashboard functions
function loadDashboardContent() {
    const dashboardPage = document.getElementById('dashboard-page');

    dashboardPage.innerHTML = `
        <!-- Dashboard Header -->
        <header class="bg-white shadow-sm">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center py-4">
                    <div class="flex items-center">
                        <i class="fas fa-car text-blue-600 text-2xl mr-3"></i>
                        <h1 class="text-2xl font-bold text-gray-900">TrocaCerta</h1>
                    </div>
                    <div class="flex items-center space-x-4">
                        <span class="text-gray-700">Olá, ${currentUser.name}</span>
                        <div class="relative">
                            <button onclick="toggleUserMenu()" class="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
                                <i class="fas fa-user-circle text-2xl"></i>
                                <i class="fas fa-chevron-down text-sm"></i>
                            </button>
                            <div id="user-menu" class="hidden absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Meu Perfil</a>
                                <a href="#" onclick="showPlanManagement()" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Gerenciar Plano</a>
                                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Configurações</a>
                                <hr class="my-1">
                                <a href="#" onclick="logout()" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sair</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!-- Dashboard Navigation -->
        <nav class="bg-gray-50 border-b">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex space-x-8">
                    <button onclick="showDashboardHome()" class="dashboard-tab-active py-4 px-1 border-b-2 border-blue-500 font-medium text-sm text-blue-600">
                        <i class="fas fa-home mr-2"></i>Painel
                    </button>
                    <button onclick="showVehicles()" class="dashboard-tab py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300">
                        <i class="fas fa-car mr-2"></i>Meus Veículos
                    </button>
                    <button onclick="showMaintenances()" class="dashboard-tab py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300">
                        <i class="fas fa-wrench mr-2"></i>Manutenções
                    </button>
                    <button onclick="showNotifications()" class="dashboard-tab py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300">
                        <i class="fas fa-bell mr-2"></i>Notificações <span class="bg-red-500 text-white text-xs rounded-full px-2 py-1 ml-1">3</span>
                    </button>
                </div>
            </div>
        </nav>

        <!-- Dashboard Content -->
        <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div id="dashboard-content">
                <!-- Content will be loaded here -->
            </div>
        </main>
    `;

    // Load dashboard home by default
    showDashboardHome();
}

function showDashboardHome() {
    updateDashboardTabs('home');

    const content = document.getElementById('dashboard-content');
    content.innerHTML = `
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div class="bg-white overflow-hidden shadow rounded-lg">
                <div class="p-5">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <i class="fas fa-car text-blue-600 text-2xl"></i>
                        </div>
                        <div class="ml-5 w-0 flex-1">
                            <dl>
                                <dt class="text-sm font-medium text-gray-500 truncate">Veículos Cadastrados</dt>
                                <dd class="text-lg font-medium text-gray-900">${userVehicles.length}</dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-white overflow-hidden shadow rounded-lg">
                <div class="p-5">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <i class="fas fa-bell text-yellow-600 text-2xl"></i>
                        </div>
                        <div class="ml-5 w-0 flex-1">
                            <dl>
                                <dt class="text-sm font-medium text-gray-500 truncate">Alertas Pendentes</dt>
                                <dd class="text-lg font-medium text-gray-900">3</dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-white overflow-hidden shadow rounded-lg">
                <div class="p-5">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <i class="fas fa-wrench text-green-600 text-2xl"></i>
                        </div>
                        <div class="ml-5 w-0 flex-1">
                            <dl>
                                <dt class="text-sm font-medium text-gray-500 truncate">Manutenções Feitas</dt>
                                <dd class="text-lg font-medium text-gray-900">12</dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-white overflow-hidden shadow rounded-lg">
                <div class="p-5">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <i class="fas fa-dollar-sign text-purple-600 text-2xl"></i>
                        </div>
                        <div class="ml-5 w-0 flex-1">
                            <dl>
                                <dt class="text-sm font-medium text-gray-500 truncate">Gastos no Mês</dt>
                                <dd class="text-lg font-medium text-gray-900">R$ 450</dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Recent Activity -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Upcoming Maintenances -->
            <div class="bg-white shadow rounded-lg">
                <div class="px-4 py-5 sm:p-6">
                    <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
                        <i class="fas fa-clock mr-2 text-blue-600"></i>
                        Próximas Manutenções
                    </h3>
                    <div class="space-y-4">
                        <div class="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                            <div>
                                <p class="font-medium text-gray-900">Honda Civic - Troca de óleo</p>
                                <p class="text-sm text-gray-600">Vence em 5 dias ou 1.200 km</p>
                            </div>
                            <span class="status-badge status-warning">Urgente</span>
                        </div>

                        <div class="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                            <div>
                                <p class="font-medium text-gray-900">Honda Civic - Filtro de ar</p>
                                <p class="text-sm text-gray-600">Vence em 15 dias</p>
                            </div>
                            <span class="status-badge status-ok">Normal</span>
                        </div>

                        <div class="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                            <div>
                                <p class="font-medium text-gray-900">Honda Civic - Pastilhas de freio</p>
                                <p class="text-sm text-gray-600">Vencida há 2 dias</p>
                            </div>
                            <span class="status-badge status-danger">Atrasada</span>
                        </div>
                    </div>

                    <div class="mt-6">
                        <button onclick="showMaintenances()" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                            Ver Todas as Manutenções
                        </button>
                    </div>
                </div>
            </div>

            <!-- Vehicle Overview -->
            <div class="bg-white shadow rounded-lg">
                <div class="px-4 py-5 sm:p-6">
                    <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
                        <i class="fas fa-car mr-2 text-blue-600"></i>
                        Seus Veículos
                    </h3>

                    ${userVehicles.length === 0 ? `
                        <div class="text-center py-6">
                            <i class="fas fa-car text-gray-300 text-4xl mb-4"></i>
                            <p class="text-gray-500 mb-4">Você ainda não cadastrou nenhum veículo</p>
                            <button onclick="showAddVehicleModal()" class="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                                Cadastrar Primeiro Veículo
                            </button>
                        </div>
                    ` : `
                        <div class="space-y-4">
                            ${userVehicles.map(vehicle => `
                                <div class="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                                    <div class="flex items-center">
                                        <i class="fas fa-car text-blue-600 text-2xl mr-4"></i>
                                        <div>
                                            <p class="font-medium text-gray-900">${vehicle.brand} ${vehicle.model}</p>
                                            <p class="text-sm text-gray-600">${vehicle.year} • ${vehicle.mileage.toLocaleString()} km</p>
                                        </div>
                                    </div>
                                    <div class="flex items-center space-x-2">
                                        <span class="status-badge ${getVehicleStatus(vehicle).class}">${getVehicleStatus(vehicle).text}</span>
                                        <button onclick="viewVehicleDetails(${vehicle.id})" class="text-blue-600 hover:text-blue-800">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>

                        <div class="mt-6">
                            <button onclick="showAddVehicleModal()" class="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
                                <i class="fas fa-plus mr-2"></i>
                                Adicionar Novo Veículo
                            </button>
                        </div>
                    `}
                </div>
            </div>
        </div>

        <!-- Plan Upgrade Banner -->
        ${currentUser.plan === 'free' ? `
            <div class="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg">
                <div class="px-6 py-8 text-center">
                    <h3 class="text-xl font-bold text-white mb-2">
                        Upgrade para o Plano Básico
                    </h3>
                    <p class="text-blue-100 mb-4">
                        Monitore filtros, velas, freios e muito mais por apenas R$ 5,90/mês
                    </p>
                    <button onclick="showPlanManagement()" class="bg-white text-blue-600 py-2 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        Fazer Upgrade Agora
                    </button>
                </div>
            </div>
        ` : ''}
    `;
}

// Utility functions
function scrollToFeatures() {
    document.getElementById('features').scrollIntoView({
        behavior: 'smooth'
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="flex items-center">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

function updateDashboardTabs(activeTab) {
    // Reset all tabs
    document.querySelectorAll('.dashboard-tab, .dashboard-tab-active').forEach(tab => {
        tab.className = 'dashboard-tab py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300';
    });

    // Activate current tab based on the button clicked
    const tabs = document.querySelectorAll('nav button');
    let activeIndex = 0;

    switch(activeTab) {
        case 'home': activeIndex = 0; break;
        case 'vehicles': activeIndex = 1; break;
        case 'maintenances': activeIndex = 2; break;
        case 'notifications': activeIndex = 3; break;
    }

    if (tabs[activeIndex]) {
        tabs[activeIndex].className = 'dashboard-tab-active py-4 px-1 border-b-2 border-blue-500 font-medium text-sm text-blue-600';
    }
}

function toggleUserMenu() {
    const menu = document.getElementById('user-menu');
    menu.classList.toggle('hidden');
}

function getVehicleStatus(vehicle) {
    // Simple status calculation - in production, this would be more sophisticated
    const daysSinceOilChange = Math.floor((Date.now() - new Date(vehicle.lastOilChange).getTime()) / (1000 * 60 * 60 * 24));

    if (daysSinceOilChange > 90) {
        return { class: 'status-danger', text: 'Atenção' };
    } else if (daysSinceOilChange > 60) {
        return { class: 'status-warning', text: 'Em breve' };
    } else {
        return { class: 'status-ok', text: 'OK' };
    }
}

function loadSampleData() {
    // Load sample vehicles for demo
    userVehicles = [
        {
            id: 1,
            brand: 'Honda',
            model: 'Civic',
            year: 2020,
            mileage: 45000,
            lastOilChange: '2024-06-15',
            color: 'Prata',
            plate: 'ABC-1234'
        }
    ];
}

// Placeholder functions for future implementation
function showVehicles() {
    updateDashboardTabs('vehicles');
    showNotification('Funcionalidade em desenvolvimento', 'info');
}

function showMaintenances() {
    updateDashboardTabs('maintenances');
    showNotification('Funcionalidade em desenvolvimento', 'info');
}

function showNotifications() {
    updateDashboardTabs('notifications');
    showNotification('Funcionalidade em desenvolvimento', 'info');
}

function showPlanManagement() {
    showNotification('Gerenciamento de planos em desenvolvimento', 'info');
}

function showAddVehicleModal() {
    showNotification('Modal de adicionar veículo em desenvolvimento', 'info');
}

function viewVehicleDetails(vehicleId) {
    showNotification(`Detalhes do veículo ${vehicleId} em desenvolvimento`, 'info');
}

// Export functions for global access
window.showLanding = showLanding;
window.showLogin = showLogin;
window.showRegister = showRegister;
window.showDashboard = showDashboard;
window.handleLogin = handleLogin;
window.handleRegister = handleRegister;
window.handleGoogleLogin = handleGoogleLogin;
window.logout = logout;
window.scrollToFeatures = scrollToFeatures;
window.showDashboardHome = showDashboardHome;
window.showVehicles = showVehicles;
window.showMaintenances = showMaintenances;
window.showNotifications = showNotifications;
window.showPlanManagement = showPlanManagement;
window.showAddVehicleModal = showAddVehicleModal;
window.viewVehicleDetails = viewVehicleDetails;
window.toggleUserMenu = toggleUserMenu;
