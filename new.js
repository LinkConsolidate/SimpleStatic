function postForm() {
    const errorDiv = document.getElementById('form-errors');
    errorDiv.innerHTML = '';

    const name = document.getElementById('item-name').value.trim();
    const category = document.getElementById('item-category').value;
    const date = document.getElementById('item-date').value;
    
    const errors = [];

    if (!name) {
        errors.push("Name is required.");
    }

    if (!category) {
        errors.push("Category is required.");
    }

    if (!date) {
        errors.push("Date is required.");
    }

    const selectedDate = new Date(date);
    const today = new Date();

    if (selectedDate > today) {
        errors.push("Date cannot be in the future.");
    }

    // Do not continue when any errors are present.
    if (errors.length > 0) {
        errors.forEach(error => {
            const errorMessage = document.createElement('p');
            errorMessage.textContent = error;
            errorDiv.appendChild(errorMessage);
        });
        return;
    }

    const newItem = {
        name: name,
        category: category,
        date: date,
        image: "default.png"
    };

    addCollectionItem(newItem);

    
    document.getElementById('add-item-form').reset();
}