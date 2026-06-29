// Interactive Grid Practice Controls
document.addEventListener('DOMContentLoaded', function() {
    const columnsSlider = document.getElementById('columns');
    const gapSlider = document.getElementById('gap');
    const rowsSlider = document.getElementById('rows');
    const columnsValue = document.getElementById('columns-value');
    const gapValue = document.getElementById('gap-value');
    const rowsValue = document.getElementById('rows-value');
    const practiceGrid = document.getElementById('practice-grid');

    // Update grid properties based on slider values
    function updateGrid() {
        const columns = columnsSlider.value;
        const gap = gapSlider.value;
        const rows = rowsSlider.value;

        // Update display values
        columnsValue.textContent = columns;
        gapValue.textContent = gap;
        rowsValue.textContent = rows;

        // Update grid CSS
        practiceGrid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
        practiceGrid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
        practiceGrid.style.gap = `${gap}px`;
    }

    // Add event listeners to sliders
    columnsSlider.addEventListener('input', updateGrid);
    gapSlider.addEventListener('input', updateGrid);
    rowsSlider.addEventListener('input', updateGrid);

    // Initialize grid with default values
    updateGrid();

    // Add smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
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

    // Add interactive hover effects to grid items
    const gridItems = document.querySelectorAll('.grid-item, .practice-item');
    gridItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Add click-to-copy functionality for code blocks
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach(block => {
        block.style.cursor = 'pointer';
        block.title = 'Click to copy code';
        
        block.addEventListener('click', function() {
            const text = this.textContent;
            navigator.clipboard.writeText(text).then(() => {
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                this.style.backgroundColor = '#28a745';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.backgroundColor = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    });

    // Add dynamic grid item counter
    function updateGridCounter() {
        const items = practiceGrid.querySelectorAll('.practice-item');
        const visibleItems = Array.from(items).filter(item => 
            item.style.display !== 'none'
        ).length;
        
        // You can add a counter display if needed
        console.log(`Grid has ${visibleItems} visible items`);
    }

    // Add keyboard shortcuts for grid manipulation
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    if (rowsSlider.value < rowsSlider.max) {
                        rowsSlider.value = parseInt(rowsSlider.value) + 1;
                        updateGrid();
                    }
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    if (rowsSlider.value > rowsSlider.min) {
                        rowsSlider.value = parseInt(rowsSlider.value) - 1;
                        updateGrid();
                    }
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    if (columnsSlider.value > columnsSlider.min) {
                        columnsSlider.value = parseInt(columnsSlider.value) - 1;
                        updateGrid();
                    }
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    if (columnsSlider.value < columnsSlider.max) {
                        columnsSlider.value = parseInt(columnsSlider.value) + 1;
                        updateGrid();
                    }
                    break;
            }
        }
    });

    // Add grid template generator
    function generateGridTemplate() {
        const columns = columnsSlider.value;
        const rows = rowsSlider.value;
        const gap = gapSlider.value;
        
        const template = `.grid-container {
    display: grid;
    grid-template-columns: repeat(${columns}, 1fr);
    grid-template-rows: repeat(${rows}, 1fr);
    gap: ${gap}px;
}`;
        
        return template;
    }

    // Add console helper for developers
    console.log('🎯 CSS Grid Learning Page Loaded!');
    console.log('💡 Tips:');
    console.log('   - Use the sliders to experiment with grid properties');
    console.log('   - Click on code blocks to copy them');
    console.log('   - Use Ctrl/Cmd + Arrow keys to adjust grid quickly');
    console.log('   - Hover over grid items to see interactive effects');
    
    // Add resize observer for responsive testing
    const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            const { width } = entry.contentRect;
            console.log(`Grid container width: ${width}px`);
        }
    });
    
    resizeObserver.observe(practiceGrid);

    // Add grid animation on load
    setTimeout(() => {
        practiceGrid.style.opacity = '0';
        practiceGrid.style.transform = 'translateY(20px)';
        practiceGrid.style.transition = 'all 0.5s ease-out';
        
        setTimeout(() => {
            practiceGrid.style.opacity = '1';
            practiceGrid.style.transform = 'translateY(0)';
        }, 100);
    }, 500);
});
