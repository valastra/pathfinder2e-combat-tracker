// Array to store characters
let characters = [];

// Function to add a character
function addCharacter(character) {
    characters.push(character);
    updateCharacterList();
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

    // Update the form's submit event to handle update
    const form = document.getElementById('characterForm');
    form.onsubmit = function(event) {
        event.preventDefault();

        // Update character with new values from form
        character.name = document.getElementById('characterName').value;
        character.hp = document.getElementById('characterHP').value;

        // Reset form's submit event to default (add new character)
        form.onsubmit = addNewCharacter;

        // Update UI
        updateCharacterList();
    };
}

// Function to add a new character (used in form's onsubmit)
function addNewCharacter(event) {
    event.preventDefault();

    // Retrieve form data
    const name = document.getElementById('characterName').value;
    const hp = document.getElementById('characterHP').value;

    // Create a character object
    const character = {
        name: name,
        hp: hp
    };

    // Add character to array and update UI
    addCharacter(character);
}

// Event listener for form submission
document.getElementById('characterForm').addEventListener('submit', addNewCharacter);

// Initial call to update UI
updateCharacterList();
