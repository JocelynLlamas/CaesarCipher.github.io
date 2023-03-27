const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const originalInput = document.getElementById('original-input');
const cipher = document.getElementById('cipher');
const result = document.getElementById('result');
const range = document.getElementById('range');

const shifMessage = () => {
    const wordArray = [...originalInput.value.toUpperCase()];
    printChar(0, wordArray);
}

const printChar = (currentLetterIndex, wordArray) => {

    if (wordArray.length === currentLetterIndex) return;

    originalInput.value = originalInput.value.substring(1);
    const spanChar = document.createElement('span');
    result.appendChild(spanChar);

    animateChar(spanChar)
        .then(() => {
            const charWithoutCode = wordArray[currentLetterIndex];
            spanChar.innerHTML = alphabet.includes(charWithoutCode) ?
                alphabet[(alphabet.indexOf(charWithoutCode) + parseInt(range.value)) % alphabet.length] :
                charWithoutCode

            printChar(currentLetterIndex + 1, wordArray);
        })
}

const animateChar = spanChar => {
    let letterChanges = 0;
    return new Promise(resolve => {
        const interval = setInterval(() => {
            spanChar.innerHTML = alphabet[Math.floor(Math.random() * alphabet.length)];
            letterChanges++;

            if (letterChanges === 3) {
                clearInterval(interval);
                resolve();
            }
        }, 50);
    })
}


const submit = e => {
    e.preventDefault();
    result.innerHTML = '';
    shifMessage();
}

cipher.onsubmit = submit;