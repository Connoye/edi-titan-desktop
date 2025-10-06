// electron-frontend/src/renderer/app.js
class EDIApp {
    constructor() {
        this.currentSection = 'dashboard';
        this.init();
    }
    
    init() {
        this.setupNavigation();
        this.loadAppInfo();
        this.checkBackendConnection();
    }
    
    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const section = item.dataset.section;
                this.showSection(section);
                
                // Update active states
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
            });
        });
    }
    
    showSection(sectionName) {
        // Hide all sections
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => section.classList.remove('active'));
        
        // Show selected section
        const targetSection = document.getElementById(sectionName);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionName;
        }
    }
    
    async loadAppInfo() {
        try {
            if (window.electronAPI) {
                const version = await window.electronAPI.getAppVersion();
                const platform = await window.electronAPI.getPlatform();
                
                console.log(`App Version: ${version}, Platform: ${platform}`);
            }
        } catch (error) {
            console.error('Error loading app info:', error);
        }
    }
    
    async checkBackendConnection() {
        try {
            const response = await fetch('http://localhost:8080/health');
            if (response.ok) {
                console.log('Backend connection: OK');
            } else {
                console.warn('Backend connection: Failed');
            }
        } catch (error) {
            console.error('Backend connection: Error', error);
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new EDIApp();
});