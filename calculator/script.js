document.addEventListener('DOMContentLoaded', function () {
    const container = document.createElement('div');
    container.className = 'container';

    const row = document.createElement('div');
    row.className = 'row justify-content-center';
    

    const col = document.createElement('div');
    col.className = 'col-md-5';
    

    const calculator = document.createElement('div');
    calculator.className = 'calculator card mt-5';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    cardBody.style.backgroundColor="grey";

    const display = document.createElement('input');
    display.type = 'text';
    display.id = 'display';
    display.className = 'form-control';
    display.readOnly = true;

    cardBody.appendChild(display);

    const buttons = document.createElement('div');
    buttons.className = 'buttons mt-3';

    const buttonValues = [
        ['C', '<-', '.', '*'],
        ['7', '8', '9', '/'],
        ['4', '5', '6', '-'],
        ['1', '2', '3', '+'],
        ['0','00','=']
    ];

    buttonValues.forEach(rowValues => {
        const row = document.createElement('div');
        row.className = 'row mt-3';
        rowValues.forEach(value => {
            const button = document.createElement('button');
            button.className = value === 'C' ? 'btn  col text-danger' :
                               value === '=' ? 'btn btn-primary col text-white' :
                               isNaN(value) ? 'btn  col text-info' : 'btn  col';
            button.innerText = value;
            button.onclick = () => {
                if (value === 'C') {
                    clearDisplay();
                } else if (value === '=') {
                    calculate();
                } else {
                    appendToDisplay(value);
                }
            };
            row.appendChild(button);
        });
        buttons.appendChild(row);
    });

    cardBody.appendChild(buttons);
    calculator.appendChild(cardBody);
    col.appendChild(calculator);
    row.appendChild(col);
    container.appendChild(row);
    document.body.appendChild(container);

    // Your existing calculator logic
    document.addEventListener('keydown', function (event) {
        if ((event.key >= '0' && event.key <= '9') || ['+', '-', '*', '/', '=', 'Enter', 'Backspace'].includes(event.key)) {
            if (event.key === 'Enter') {
                calculate();
            } else if (event.key === 'Backspace') {
                display.value = display.value.slice(0, -1);
            } else if (event.key !== 'Shift') {
                appendToDisplay(event.key);
            }
        } else {
            alert('Only numbers are allowed');
            event.preventDefault();
        }
    });

    window.appendToDisplay = function (value) {
        display.value += value;
    };

    window.clearDisplay = function () {
        display.value = '';
    };

    window.calculate = function () {
        try {
            display.value = eval(display.value);
        } catch (e) {
            display.value = 'Error';
        }
    };
});
