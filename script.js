let array = [];
const container = document.getElementById('container');

function generateArray() {
    array = [];
    container.innerHTML = '';
    for (let i = 0; i < 50; i++) {
        const value = Math.floor(Math.random() * 500) + 1;
        array.push(value);
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value}px`;
        bar.style.width = '20px';
        container.appendChild(bar);
    }
}

async function bubbleSort() {
    const bars = document.getElementsByClassName('bar');
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                // Swap elements in array
                [array[j], array[j + 1]] = [array[j + 1], array[j]];

                // Swap bar heights
                bars[j].style.height = `${array[j]}px`;
                bars[j + 1].style.height = `${array[j + 1]}px`;

                await new Promise(resolve => setTimeout(resolve, 50));
            }
        }
    }
}

// Generate the array on page load
generateArray();