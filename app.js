// Array to store characters
let characters = [];

let isEditMode = false;
let editIndex = null;

// Function to add or edit a character
function handleFormSubmit(event) {
    event.preventDefault();

    const characterData = {
        name: document.getElementById('characterName').value,
        hp: document.getElementById('characterHP').value
        // Retrieve other fields similarly
    };

    if (isEditMode) {
        // Update existing character
        characters[editIndex] = characterData;
        isEditMode = false;
        editIndex = null;
    } else {
        // Add new character
        characters.push(characterData);
    }

    // Update UI and reset form
    updateCharacterList();
    resetForm();
}

// Function to reset form to default state
function resetForm() {
    document.getElementById('characterForm').reset();
    // Reset form's onsubmit to default
    document.getElementById('characterForm').onsubmit = handleFormSubmit;
}

// Function to update character list in the UI
function updateCharacterList() {
    const charactersListElement = document.getElementById('charactersList');
    charactersListElement.innerHTML = ''; // Clear existing list

    characters.forEach((character, index) => {
        // Create a div for each character
        const characterCard = document.createElement('div');
        characterCard.className = 'bg-white p-4 rounded-lg shadow-md';

        // Add character name
        const nameElement = document.createElement('h3');
        nameElement.className = 'text-xl font-bold';
        nameElement.textContent = character.name;
        characterCard.appendChild(nameElement);

        // Add other character details (HP, AC, etc.)
        const hpElement = document.createElement('p');
        hpElement.textContent = `HP: ${character.hp}`;
        characterCard.appendChild(hpElement);

        // Create Edit Button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded';
        editButton.onclick = function() {
            editCharacter(index);
        };
        characterCard.appendChild(editButton);

        // Append the character card to the characters list
        charactersListElement.appendChild(characterCard);
    });
}

// Function to handle character editing
function editCharacter(index) {
    const character = characters[index];

    // Populate the form with character's current data
    document.getElementById('characterName').value = character.name;
    document.getElementById('characterHP').value = character.hp;

    // Set edit mode
    isEditMode = true;
    editIndex = index;
}

// Event listener for form submission
document.getElementById('characterForm').addEventListener('submit', handleFormSubmit);

// Initial call to update UI and reset form
updateCharacterList();
resetForm();
