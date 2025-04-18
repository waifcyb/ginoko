document.addEventListener('DOMContentLoaded', function() {
    // Define the items for each category
    const items = {
        accessories: [
            { name: 'Sunnies', image: 'assets/images/sunnies.png' }
        ],
        outfits: [
            { name: 'Sailor Outfit', image: 'assets/images/sailor.png' }
        ]
    };

    // Set cat base image
    document.querySelector('.cat-base').style.backgroundImage = "url('assets/images/gino.png')";

    // Populate the item grids
    for (const category in items) {
        const grid = document.getElementById(`${category}-grid`);
        
        items[category].forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'item';
            itemElement.dataset.name = item.name;
            itemElement.dataset.category = category;
            
            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.name;
            
            const nameSpan = document.createElement('div');
            nameSpan.className = 'item-name';
            nameSpan.textContent = item.name;
            
            itemElement.appendChild(img);
            itemElement.appendChild(nameSpan);
            grid.appendChild(itemElement);
            
            // Add click event
            itemElement.addEventListener('click', toggleItem);
        });
    }

    // Toggle item visibility when clicked
    function toggleItem(event) {
        const item = event.currentTarget;
        const category = item.dataset.category;
        const name = item.dataset.name;
        
        // Find the accessory element
        const accessory = document.querySelector(`.accessory[data-category="${category}"][data-name="${name}"]`);
        
        if (item.classList.contains('selected')) {
            // Item is currently selected, so hide it
            item.classList.remove('selected');
            accessory.classList.remove('visible');
        } else {
            // Deselect other items in the same category
            document.querySelectorAll(`.item[data-category="${category}"].selected`).forEach(selected => {
                selected.classList.remove('selected');
            });
            
            // Hide other accessories in the same category
            document.querySelectorAll(`.accessory[data-category="${category}"].visible`).forEach(visible => {
                visible.classList.remove('visible');
            });
            
            // Select and show this item
            item.classList.add('selected');
            accessory.classList.add('visible');
        }
    }

    // Reset button functionality
    document.getElementById('reset-button').addEventListener('click', function() {
        // Deselect all items
        document.querySelectorAll('.item.selected').forEach(item => {
            item.classList.remove('selected');
        });
        
        // Hide all accessories
        document.querySelectorAll('.accessory.visible').forEach(accessory => {
            accessory.classList.remove('visible');
        });
    });

    // Add some paper texture animation for subtle movement
    const paperContainer = document.querySelector('.paper-container');
    document.addEventListener('mousemove', function(e) {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        
        paperContainer.style.transform = `rotate(${-1 + x * 0.5}deg) translateY(${y * 5}px)`;
    });
});