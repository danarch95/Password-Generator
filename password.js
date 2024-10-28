// PASSWORD GENERATOR

function generatePassword(passwordLenght, includeLower, includeUpper, includeNumber, includeSymbols) {
    const lowerCaseChars = "abcdefghijklmnopqrstuvz";
    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVZ";
    const numberChars = "0123456789";
    const symbolsChars = "!@#$%^&*()";

    let allowedChars = "";
    let password = "";

    // Add the respective characters based on user input
    allowedChars += includeLower ? lowerCaseChars : "";
    allowedChars += includeUpper ? upperCaseChars : "";
    allowedChars += includeNumber ? numberChars : "";
    allowedChars += includeSymbols ? symbolsChars : "";

    if (passwordLenght <= 0) {
        return `Password length must be greater than 0`;
    }
    if (allowedChars.length === 0) {
        return `At least one set of characters needs to be selected`;
    }

    // Generate password
    for (let i = 0; i < passwordLenght; i++) {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        password += allowedChars[randomIndex];
    }

    return password;
}

// Load the particles configuration from the JSON file
particlesJS.load('particles-js', 'config/particlesjs-config.json', function() {
    console.log('Particles.js config loaded');
});

// Function to handle button click and update password display
function generateAndDisplayPassword() {
    const passwordLenght = parseInt(document.getElementById("charNum").value);

    // Enforce character limit (in case someone bypasses the input restrictions)
    const maxLength = 50;
    if (passwordLenght > maxLength) {
        passwordLenght = maxLength;
        document.getElementById("charNum").value = maxLength; // Update the input field to reflect the maximum value
    }
    

    // Get whether each checkbox is checked or not
    const includeLower = document.getElementById("lowercase").checked;
    const includeUpper = document.getElementById("uppercase").checked;
    const includeNumber = document.getElementById("numbers").checked;
    const includeSymbols = document.getElementById("symbols").checked;

    // Generate password based on user preferences
    const password = generatePassword(passwordLenght, includeLower, includeUpper, includeNumber, includeSymbols);
    
    // Display the generated password
    document.getElementById("newPassword").textContent = `Generated password: ${password}`;
}

// Event listeners to regenerate password when inputs change
document.getElementById("charNum").addEventListener("input", generateAndDisplayPassword);
document.getElementById("lowercase").addEventListener("change", generateAndDisplayPassword);
document.getElementById("uppercase").addEventListener("change", generateAndDisplayPassword);
document.getElementById("numbers").addEventListener("change", generateAndDisplayPassword);
document.getElementById("symbols").addEventListener("change", generateAndDisplayPassword);

// Generate the password when the page loads for the first time
generateAndDisplayPassword();