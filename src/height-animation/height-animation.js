// Accordion functionality
function toggleAccordion(header) {
    const content = header.nextElementSibling;
    const icon = header.querySelector('.icon');
    
    header.classList.toggle('active');
    content.classList.toggle('active');
    icon.classList.toggle('rotate');
}

// Dropdown functionality
function toggleDropdown(button) {
    const menu = button.nextElementSibling;
    menu.classList.toggle('active');
    
    // Close dropdown when clicking on an item
    const items = menu.querySelectorAll('.dropdown-item');
    items.forEach(item => {
        item.onclick = function() {
            button.textContent = this.textContent + ' ▼';
            menu.classList.remove('active');
        };
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function closeDropdown(e) {
        if (!button.contains(e.target) && !menu.contains(e.target)) {
            menu.classList.remove('active');
            document.removeEventListener('click', closeDropdown);
        }
    });
}

// Collapsible functionality
function toggleCollapsible(header) {
    const content = header.nextElementSibling;
    const icon = header.querySelector('.icon');
    
    header.classList.toggle('active');
    content.classList.toggle('active');
    icon.classList.toggle('rotate');
}

// Toggle panel functionality
function togglePanel(button) {
    const content = button.nextElementSibling;
    content.classList.toggle('active');
}

// Animated list functionality
let listItemsVisible = false;
function toggleListItems() {
    const items = document.querySelectorAll('.list-item');
    listItemsVisible = !listItemsVisible;
    
    items.forEach((item, index) => {
        setTimeout(() => {
            if (listItemsVisible) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        }, index * 100);
    });
}

// Global controls
function expandAll() {
    // Expand all accordions
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.classList.add('active');
        header.nextElementSibling.classList.add('active');
        header.querySelector('.icon').classList.add('rotate');
    });
    
    // Expand all collapsibles
    document.querySelectorAll('.collapsible-header').forEach(header => {
        header.classList.add('active');
        header.nextElementSibling.classList.add('active');
        header.querySelector('.icon').classList.add('rotate');
    });
    
    // Expand all panels
    document.querySelectorAll('.toggle-content').forEach(content => {
        content.classList.add('active');
    });
    
    // Show all list items
    document.querySelectorAll('.list-item').forEach(item => {
        item.classList.add('active');
    });
}

function collapseAll() {
    // Collapse all accordions
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.classList.remove('active');
        header.nextElementSibling.classList.remove('active');
        header.querySelector('.icon').classList.remove('rotate');
    });
    
    // Collapse all collapsibles
    document.querySelectorAll('.collapsible-header').forEach(header => {
        header.classList.remove('active');
        header.nextElementSibling.classList.remove('active');
        header.querySelector('.icon').classList.remove('rotate');
    });
    
    // Collapse all panels
    document.querySelectorAll('.toggle-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Hide all list items
    document.querySelectorAll('.list-item').forEach(item => {
        item.classList.remove('active');
    });
}

function randomToggle() {
    const allToggleableElements = [
        ...document.querySelectorAll('.accordion-header'),
        ...document.querySelectorAll('.collapsible-header'),
        ...document.querySelectorAll('.toggle-content'),
        ...document.querySelectorAll('.list-item')
    ];
    
    // Toggle random elements
    allToggleableElements.forEach(element => {
        if (Math.random() > 0.5) {
            if (element.classList.contains('accordion-header') || element.classList.contains('collapsible-header')) {
                element.classList.toggle('active');
                element.nextElementSibling.classList.toggle('active');
                const icon = element.querySelector('.icon');
                if (icon) icon.classList.toggle('rotate');
            } else {
                element.classList.toggle('active');
            }
        }
    });
}

// Expose handlers as globals so inline onclick="..." attributes resolve even
// when this file is loaded as an ES module (modules have their own scope).
Object.assign(window, {
    toggleAccordion,
    toggleDropdown,
    toggleCollapsible,
    togglePanel,
    toggleListItems,
    expandAll,
    collapseAll,
    randomToggle,
});

// Initialize with some items visible
document.addEventListener('DOMContentLoaded', function() {
    // Show first accordion item
    const firstAccordion = document.querySelector('.accordion-header');
    if (firstAccordion) {
        firstAccordion.classList.add('active');
        firstAccordion.nextElementSibling.classList.add('active');
        firstAccordion.querySelector('.icon').classList.add('rotate');
    }
});
