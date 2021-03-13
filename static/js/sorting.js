var canvas = document.getElementById("chart");
let nums = [];
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
var numbers = new Chart(canvas, {
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
    var canvas = document.getElementById("chart");
    canvas.remove();
    var canvas = document.createElement("canvas");
    canvas.id = "chart";
    document.getElementById("container").append(canvas);
    var numbers = new Chart(canvas, {
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
    for (let i = 0; i < 50; i++)
    {
        nums.push(Math.round(Math.random() * 100));
    }
    update(nums, 750)
}

async function bubbleSort() {
    let button = document.getElementById("bubble");
    button.innerHTML = "Stop";
    button.onclick = Stop;
    let len = nums.length;
    let temp;
    for (let i = len-1; i>=0; i--) {
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
    button.innerHTML = "Bubble Sort";
    button.onclick = bubbleSort;
    window.stop = false;
}

async function selectionSort(){
    let button = document.getElementById("selection");
    button.innerHTML = "Stop";
    button.onclick = Stop;
    var minIdx, temp, 
    len = nums.length;
    for (var i = 0; i < len; i++){
        minIdx = i;
        for (var  j = i+1; j<len; j++){
            if (nums[j] < nums[minIdx]){
                minIdx = j;
            }
            if (window.stop) {
                break;
            }
        }
        temp = nums[i];
        nums[i] = nums[minIdx];
        nums[minIdx] = temp;
        update(nums);
        await new Promise(r => setTimeout(r, 10));
        if (window.stop) {
            break;
        }
    }
    button.innerHTML = "Selection Sort";
    button.onclick = selectionSort;
    window.stop = false;
}

async function insertionSort() {
    let button = document.getElementById("insertion");
    button.innerHTML = "Stop";
    button.onclick = Stop;
    let n = nums.length;
    for (let i = 1; i < n; i++) {
        // Choosing the first element in our unsorted subarray
        let current = nums[i];
        // The last element of our sorted subarray
        let j = i-1; 
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
    button.innerHTML = "Insertion Sort";
    button.onclick = insertionSort;
}

function Stop() {
    window.stop = true;
}
