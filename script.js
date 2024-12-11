document.getElementById('quantity').addEventListener('input', function () {
    const repeatGroup = document.getElementById('repeatGroup');
    repeatGroup.style.display = this.value > 1 ? 'block' : 'none';
});

document.getElementById('numberForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const minNumber = parseInt(document.getElementById('minNumber').value);
    const maxNumber = parseInt(document.getElementById('maxNumber').value);
    const quantity = parseInt(document.getElementById('quantity').value);
    const allowRepeats = document.getElementById('allowRepeats').checked;

    if (minNumber >= maxNumber || quantity <= 0) {
        swal({
            title: "ERROR",
            text: "Ingrese valores válidos",
            icon: "error",
        });
        return;
    }

    let numbers = [];

    if (allowRepeats) {
        for (let i = 0; i < quantity; i++) {
            numbers.push(generateRandomNumber(minNumber, maxNumber));
        }
    } else {
        if (quantity > (maxNumber - minNumber + 1)) {
            alert('No hay suficientes números únicos en el rango');
            return;
        }

        while (numbers.length < quantity) {
            const randomNumber = generateRandomNumber(minNumber, maxNumber);
            if (!numbers.includes(randomNumber)) {
                numbers.push(randomNumber);
            }
        }
    }

    displayResult(numbers);
});

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function displayResult(numbers) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    let row = '';
    numbers.forEach((number, index) => {
        row += `<span class="number">${number}</span>`;

        if ((index + 1) % 5 === 0) {
            resultDiv.innerHTML += row + '<br>';
            row = '';
        }
    });

    if (row !== '') {
        resultDiv.innerHTML += row;
    }
}
