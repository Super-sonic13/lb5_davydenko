const table = document.getElementById('table');
let selectedCell = null;

// Функция, которая обрабатывает клик на ячейке
function handleClick(event) {
    const cell = event.target;

    if (selectedCell) {
        selectedCell.classList.remove('red');
    }

    if (selectedCell !== cell) {
        cell.classList.add('red');
        selectedCell = cell;
    } else {
        selectedCell = null;
    }
}

function getDiagonalCells(cellIndex) {
    const cellsToColor = [];
    const row = Math.floor(cellIndex / 6);
    const col = cellIndex % 6;

    // Переменные для определения начальной точки диагонали
    let startRow = row;
    let startCol = col;

    // Находим начальную точку диагонали
    while (startRow > 0 && startCol > 0) {
        startRow--;
        startCol--;
    }

    // Определяем ячейки по диагонали
    for (let i = 0; i < 6; i++) {
        if (startRow + i < 6 && startCol + i < 6) {
            cellsToColor.push(cells[(startRow + i) * 6 + startCol + i]);
        }
    }

    return cellsToColor;
}

function handleDoubleClick(event) {
    const cell = event.target;

    const cellIndex = Array.from(cells).indexOf(cell);
    const cellsToColor = getDiagonalCells(cellIndex);

    for (const cell of cells) {
        cell.classList.remove('blue');
    }

    for (const cellToColor of cellsToColor) {
        cellToColor.classList.add('blue');
    }
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256); // Випадкове значення від 0 до 255 для червоного
    const g = Math.floor(Math.random() * 256); // Випадкове значення від 0 до 255 для зеленого
    const b = Math.floor(Math.random() * 256); // Випадкове значення від 0 до 255 для синього
    return `rgb(${r}, ${g}, ${b})`; // Створення рядка кольору у форматі RGB
}

function handleMouseOver(event) {
    const cell = event.target;
    const randomColor = getRandomColor(); // Отримання випадкового кольору
    cell.style.backgroundColor = randomColor; // Застосування випадкового кольору до клітинки
}

cells.forEach((cell) => {
    cell.addEventListener('click', handleClick);
    cell.addEventListener('dblclick', handleDoubleClick);
    cell.addEventListener('mouseover', handleMouseOver); // Додавання обробника подій для наведення миші
});
