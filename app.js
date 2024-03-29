// Array to store characters
let characters = [];

let isEditMode = false;
let editIndex = null;

// Function to add or edit a character
function handleFormSubmit(event) {
    event.preventDefault();

    const characterData = {
        name: document.getElementById('characterName').value,
        hp: document.getElementById('characterHP').value,
        initiative: parseInt(document.getElementById('characterInitiative').value, 10) || 0,
        ac: parseInt(document.getElementById('characterAC').value, 10) || 0,
        fortSave: parseInt(document.getElementById('characterFort').value, 10) || 0,
        refSave: parseInt(document.getElementById('characterRef').value, 10) || 0,
        willSave: parseInt(document.getElementById('characterWill').value, 10) || 0,
        perception: parseInt(document.getElementById('characterPerception').value, 10) || 0,
        stealth: parseInt (document.getElementById('characterStealth').value, 10) || 0
        // Retrieve other fields similarly
    };

    if (isEditMode) {
        // Update existing character
        characters[editIndex] = characterData;
        isEditMode = false; // Make sure to reset the edit mode
        editIndex = null;
    } else {
        // Add new character
        characters.push(characterData);
    }

// Update UI and reset form
    updateCharacterList();
    resetForm();
}
// Function to update the combat tracker
// Assuming characters is an array of character objects with initiative values
let currentRound = 1;
let currentInitiative = 99;
function updateCombatTracker() {
    // Sort characters by initiative in descending order
    characters.sort((a, b) => b.initiative - a.initiative);

    // Check if the characters array is empty to avoid errors
    if (characters.length === 0) {
        console.log("No characters to display.");
        return; // Exit the function early
    }

    // Find the index of the character whose turn is next
    let currentCharacterIndex = characters.findIndex(char => char.initiative < currentInitiative);
    if (currentCharacterIndex === -1) {
        // If no such character, it means a new round should start
        currentCharacterIndex = 0;
        currentRound++;
        currentInitiative = characters[0].initiative; // Reset initiative for new round
        currentCharacterIndex = 0;
    } else {
        // Set current initiative for the next update
        currentInitiative = characters[currentCharacterIndex].initiative;
    }

    // Display the current turn character
    const currentCharacter = characters[currentCharacterIndex];
    document.getElementById('currentTurn').textContent = currentCharacter.name;

    // Display the on deck character (next after current)
    const onDeckIndex = (currentCharacterIndex + 1) % characters.length;
    const onDeckCharacter = characters[onDeckIndex];
    document.getElementById('onDeck').textContent = onDeckCharacter.name;

    // Display the round number
    document.getElementById('currentRound').textContent = currentRound;

    // Update the list of other characters
    const otherCharactersList = document.getElementById('charactersList');
    characters.forEach((char, index) => {
        if (index !== currentCharacterIndex && index !== onDeckIndex) {
            // Create and append character card for other characters
            const charElement = document.createElement('div');
            charElement.textContent = char.name;
            // Add additional styling or classes as needed
            otherCharactersList.appendChild(charElement);
        }
    });
}

// Initial call to setup the combat tracker
updateCombatTracker();


// Add listener for Next Turn button
document.getElementById('nextTurnButton').addEventListener('click', function() {
    updateCombatTracker();
});

// Function to update character list in the UI
function updateCharacterList() {
    // Sort characters by initiative
    characters.sort((a, b) => b.initiative - a.initiative);

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

        const acElement = document.createElement('p');
        acElement.textContent = `AC: ${character.ac}`;
        characterCard.appendChild(acElement);

        const fortElement = document.createElement('p');
        fortElement.textContent = `Fort: ${formatModifier(character.fortSave)}`;
        characterCard.appendChild(fortElement);

        const refElement = document.createElement('p');
        refElement.textContent = `Ref: ${formatModifier(character.refSave)}`;
        characterCard.appendChild(refElement);

        const willElement = document.createElement('p');
        willElement.textContent = `Will: ${formatModifier(character.willSave)}`;
        characterCard.appendChild(willElement);

        const perceptionElement = document.createElement('p');
        perceptionElement.textContent = `Perception: ${formatModifier(character.perception)}`;
        characterCard.appendChild(perceptionElement);

        const initiativeElement = document.createElement('p');
        initiativeElement.textContent = `Initiative: ${character.initiative}`;
        characterCard.appendChild(initiativeElement);

        const stealthElement = document.createElement('p');
        stealthElement.textContent = `Stealth: ${character.stealth}`;
        characterCard.appendChild(stealthElement);

        // Create Edit Button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded';
        editButton.onclick = function() {
            editCharacter(index);
        };
        characterCard.appendChild(editButton);

         // Create Delete Button
         const deleteButton = document.createElement('button');
         deleteButton.textContent = 'Delete';
         deleteButton.className = 'bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2';
         deleteButton.onclick = function() {
             deleteCharacter(index);
         };
         characterCard.appendChild(deleteButton);

        // Append the character card to the characters list
        charactersListElement.appendChild(characterCard);
    });
}
// Function to handle modifier display
function formatModifier(value) {
    return value >= 0 ? `+${value}` : `${value}`;
}
// Function to handle character editing
function editCharacter(index) {
    console.log("Entering edit mode for index:", index);
    const character = characters[index];

    // Populate the form with character's current data
    document.getElementById('characterName').value = character.name;
    document.getElementById('characterHP').value = character.hp;

    // Set edit mode
    isEditMode = true;
    editIndex = index;
    // Update status message
    const statusMessage = document.getElementById('formStatusMessage');
    statusMessage.textContent = `Editing '${character.name}' (Index: ${index})`;
    statusMessage.className = 'text-red-500'; // Add styling for visibility
    
}
// Function to delete a character
function deleteCharacter(index) {
    // Remove character from array
    characters.splice(index, 1);

    // Update UI
    updateCharacterList();
}
// Function to reset form
function resetForm() {
    // Clear the form inputs
    document.getElementById('characterForm').reset();

    // Clear any global state related to editing
    isEditMode = false;
    editIndex = null;

    // Clear the status message
    const statusMessage = document.getElementById('formStatusMessage');
    statusMessage.textContent = '';

    // Optionally, clear any visual cues for the currently selected character
    // If you have some UI element that highlights the character being edited, reset that as well
}
// Attach event listener to the form for submission
const formElement = document.getElementById('characterForm');
formElement.addEventListener('submit', handleFormSubmit);

// Function to export data to CSV
function exportToCSV() {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Name,HP,Initiative,AC,Fort Save,Ref Save,Will Save,Perception\n";

    characters.forEach(character => {
        csvContent += `${character.name},${character.hp},${character.initiative},${character.ac},${character.fortSave},${character.refSave},${character.willSave},${character.perception}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "pathfinder_characters.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Function to import from CSV
function importFromCSV(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    
    reader.onload = function(event) {
        const text = event.target.result;
        const data = text.split(/\r\n|\n/);
        data.shift(); // Remove header row
        document.getElementById('csvFileInput').value = '';

        characters = data
            .filter(row => row.trim()) // Filter out empty rows
            .map(row => {
                const [name, hp, initiative, ac, fortSave, refSave, willSave, perception] = row.split(',');
                return {
                    name: name || "Unnamed", // Default name if empty
                    hp: parseInt(hp, 10) || 0,
                    initiative: parseInt(initiative, 10) || 0,
                    ac: parseInt(ac, 10) || 0,
                    fortSave: parseInt(fortSave, 10) || 0,
                    refSave: parseInt(refSave, 10) || 0,
                    willSave: parseInt(willSave, 10) || 0,
                    perception: parseInt(perception, 10) || 0
                };
            });

        updateCharacterList();
    };

    reader.readAsText(file);
}


// Initial call to update UI
updateCharacterList();
