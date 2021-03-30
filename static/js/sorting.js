/*
* Back end for sorting.html
* Handles:
*   - visualization of different sorting algorithms
 */

let canvas = document.getElementById("chart");
let bubble = document.getElementById("bubble");
let selection = document.getElementById("selection");
let insertion = document.getElementById("insertion");
let nums = [];
let number;
let temp;
let minIdx, tempS;
let current, j;
window.stop = false;

for (let i = 0; i < 50; i++)
{
    nums.push(i+1);
}
let colors = [];
for (let i = 0; i < 50; i++)
{
    colors.push("rgba(200, 200, 200, 1)");
}
let numbers = new Chart(canvas, {
    type: "bar",
    data: {
        labels: nums,
        datasets: [{
            label: "Number",
            data: nums,
            backgroundColor: colors,
        }],
    },
    options: {
        legend: {
            display: false
        }
    }
});

function update(nums, duration=0) {
    canvas = document.getElementById("chart");
    canvas.remove();
    canvas = document.createElement("canvas");
    canvas.id = "chart";
    document.getElementById("container").append(canvas);
    numbers = new Chart(canvas, {
        type: "bar",
        data: {
            labels: nums,
            datasets: [{
                label: "Number",
                data: nums,
                backgroundColor: colors,
            }],
        },
        options: {
            animation: {
                duration: duration
            },
            legend: {
                display: false
            }
        }
    });
}

function shuffle() {
    nums = [];
    while (nums.length !== 50) {
        number = Math.round(Math.random() * 50);
        if (!nums.includes(number)) {
            nums.push(number);
        }
    }
    update(nums, 750);
}

async function bubbleSort() {
    bubble.innerHTML = "Stop";
    bubble.onclick = Stop;
    for (let i = 50-1; i >= 0; i--) {
        for (let j = 1; j<=i; j++) {
            if (nums[j-1] > nums[j]) {
                temp = nums[j-1];
                nums[j-1] = nums[j];
                nums[j] = temp;
                update(nums);
                await new Promise(r => setTimeout(r, 10));
            }
            if (window.stop) {
                break;
            }
        }
        if (window.stop) {
            break;
        }
    }
    bubble.innerHTML = "Bubble Sort";
    bubble.onclick = bubbleSort;
    window.stop = false;
}

async function selectionSort(){
    selection.innerHTML = "Stop";
    selection.onclick = Stop;
    for (let i = 0; i < 50; i++){
        minIdx = i;
        for (let j = i + 1; j < 50; j++){
            if (nums[j] < nums[minIdx]){
                minIdx = j;
            }
            if (window.stop) {
                break;
            }
        }
        tempS = nums[i];
        nums[i] = nums[minIdx];
        nums[minIdx] = tempS;
        update(nums);
        await new Promise(r => setTimeout(r, 10));
        if (window.stop) {
            break;
        }
    }
    selection.innerHTML = "Selection Sort";
    selection.onclick = selectionSort;
    window.stop = false;
}

async function insertionSort() {
    insertion.innerHTML = "Stop";
    insertion.onclick = Stop;
    for (let i = 1; i < 50; i++) {
        // Choosing the first element in our unsorted subarray
        current = nums[i];
        // The last element of our sorted subarray
        j = i-1;
        while ((j > -1) && (current < nums[j])) {
            nums[j+1] = nums[j];
            j--;
            if (window.stop) {
                break;
            }
            update(nums);
            await new Promise(r => setTimeout(r, 10));
        }
        nums[j+1] = current;
        if (window.stop) {
            break;
        }
        update(nums);
        await new Promise(r => setTimeout(r, 10));
    }
    insertion.innerHTML = "Insertion Sort";
    insertion.onclick = insertionSort;
}

function Stop() {
    window.stop = true;
}
