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

    characters.forEach(character => {
        // Create a div for each character
        const characterCard = document.createElement('div');
        characterCard.className = 'bg-white p-4 rounded-lg shadow-md';

        // Add character name
        const nameElement = document.createElement('h3');
        nameElement.className = 'text-xl font-bold';
        nameElement.textContent = character.name;
        characterCard.appendChild(nameElement);

        // Add other character details (HP, AC, etc.)
        // Example: HP
        const hpElement = document.createElement('p');
        hpElement.textContent = `HP: ${character.hp}`;
        characterCard.appendChild(hpElement);

        // Add more character details similarly...

        // Append the character card to the characters list
        charactersListElement.appendChild(characterCard);
    });
}

// Event listener for form submission
document.getElementById('characterForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Retrieve form data
    const name = document.getElementById('characterName').value;
    const hp = document.getElementById('characterHP').value;
    // Retrieve other fields similarly

    // Create a character object
    const character = {
        name: name,
        hp: hp,
        // Add other attributes
    };

    // Add character to array and update UI
    addCharacter(character);
});


// Initial call to update UI
updateCharacterList();
