// Brand Kits interactivity

document.addEventListener('DOMContentLoaded', function () {
    // Checkbox selection logic
    const kitItems = document.querySelectorAll('.brand-kit-item');
    const checkboxes = document.querySelectorAll('.custom-checkbox');
    const filters = document.querySelectorAll('.brand-kit-filter');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('click', function (e) {
            e.stopPropagation();
            kitItems.forEach(item => item.classList.remove('selected'));
            checkboxes.forEach(cb => cb.classList.remove('checked'));
            const parent = this.closest('.brand-kit-item');
            parent.classList.add('selected');
            this.classList.add('checked');
        });
    });

    // Also allow clicking the card to select
    kitItems.forEach(item => {
        item.addEventListener('click', function (e) {
            kitItems.forEach(i => i.classList.remove('selected'));
            checkboxes.forEach(cb => cb.classList.remove('checked'));
            this.classList.add('selected');
            this.querySelector('.custom-checkbox').classList.add('checked');
        });
    });

    // Filter icon logic (beside checkbox)
    filters.forEach(filter => {
        filter.addEventListener('click', function (e) {
            e.stopPropagation();
            filters.forEach(f => f.classList.remove('filtered'));
            kitItems.forEach(item => item.classList.remove('filtered'));
            this.classList.toggle('filtered');
            const parent = this.closest('.brand-kit-item');
            parent.classList.toggle('filtered');
        });
    });
}); 