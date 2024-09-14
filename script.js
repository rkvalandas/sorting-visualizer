const arrayContainer = document.getElementById('arrayContainer');
const algorithmSelect = document.getElementById('algorithm');
const speedInput = document.getElementById('speed');
const sortButton = document.getElementById('sortButton');
const generateArrayButton = document.getElementById('generateArrayButton');
const arrayBox = document.getElementById('arrayBox');
const sizeInput = document.getElementById('size');

let array = [];
let delay = 100;

sizeInput.addEventListener("change", function() {
    generateArray();
});

function generateArray(size = sizeInput.value) {
    array = [];
    arrayContainer.innerHTML = '';
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }
    renderArray();
}

function renderArray(activeIndices = []) {
    arrayContainer.innerHTML = '';
    arrayBox.innerHTML = '';
    array.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value}%`;
        const arrBar = document.createElement('div');
        arrBar.classList.add('arrBar');
        if (activeIndices.includes(index)) {
                bar.classList.add('active-bar');
                arrBar.classList.add('active-bar');
        }
        const arrLabel = document.createElement('span');
        arrLabel.textContent = value;
        arrBar.appendChild(arrLabel);
        arrayBox.appendChild(arrBar);
        arrayContainer.appendChild(bar);
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort() {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            renderArray([j, j + 1]);
            await sleep(delay);
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                renderArray([j, j + 1]);
                await sleep(delay);
            }
        }
    }
    renderArray();
}

async function insertionSort() {
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j = j - 1;
            renderArray([j + 1, i]);
            await sleep(delay);
        }
        array[j + 1] = key;
        renderArray([j + 1, i]);
        await sleep(delay);
    }
    renderArray();
}

async function selectionSort() {
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            renderArray([i,j]);
            await sleep(delay);
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }

        if (minIndex !== i) {
            let temp = array[i];
            array[i] = array[minIndex];
            array[minIndex] = temp;
            renderArray([i, minIndex]);
            await sleep(delay);
        }
    }
    renderArray();
}

async function quickSort(start = 0, end = array.length - 1) {
    if (start >= end) {
        return;
    }
    let index = await partition(start, end);
    await quickSort(start, index - 1);
    await quickSort(index + 1, end);
    renderArray();
}

async function partition(start, end) {
    let pivotIndex = start;
    let pivotValue = array[end];
    for (let i = start; i < end; i++) {
        renderArray([i, pivotIndex, end]);
        if (array[i] < pivotValue) {
            [array[i], array[pivotIndex]] = [array[pivotIndex], array[i]];
            pivotIndex++;
            renderArray([i, pivotIndex, end]);
            await sleep(delay);
        }
    }
    [array[pivotIndex], array[end]] = [array[end], array[pivotIndex]];
    renderArray([pivotIndex, end]);
    await sleep(delay);
    return pivotIndex;
}

async function mergeSort(start = 0, end = array.length - 1) {
    if (start >= end) {
        return;
    }
    const mid = Math.floor((start + end) / 2);
    await mergeSort(start, mid);
    await mergeSort(mid + 1, end);
    await merge(start, mid, end);
    renderArray();
}

async function merge(start, mid, end) {
    const left = array.slice(start, mid + 1);
    const right = array.slice(mid + 1, end + 1);
    let i = 0, j = 0, k = start;
    while (i < left.length && j < right.length) {
        renderArray([start + i, mid + 1 + j]);
        await sleep(delay);
        if (left[i] < right[j]) {
            array[k++] = left[i++];
        } else {
            array[k++] = right[j++];
        }
        renderArray([k - 1]);
        await sleep(delay);
    }
    while (i < left.length) {
        array[k++] = left[i++];
        renderArray([k - 1]);
        await sleep(delay);
    }
    while (j < right.length) {
        array[k++] = right[j++];
        renderArray([k - 1]);
        await sleep(delay);
    }
}

sortButton.addEventListener('click', async () => {
    sortButton.disabled = true;
    generateArrayButton.disabled = true;
    const algorithm = algorithmSelect.value;
    delay = 500 - speedInput.value * 4; // Adjust delay to control speed
    if (algorithm === 'bubble') await bubbleSort();
    else if (algorithm === 'insertion') await insertionSort();
    else if (algorithm === 'quick') await quickSort();
    else if (algorithm === 'merge') await mergeSort();
    else if (algorithm === 'selection') await selectionSort();
    sortButton.disabled = false;
    generateArrayButton.disabled = false;
});

generateArrayButton.addEventListener('click', () => generateArray());

window.onload = () => generateArray();
