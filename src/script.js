const states = document.querySelectorAll(".state"); 
const dots = document.querySelectorAll(".dot"); 
const left_btn = document.getElementById("left-btn"); 
const right_btn = document.getElementById("right-btn"); 

const go_wel_btn = document.getElementById("go-welcome"); 

const last_index = states.length - 1; 
let current_index = 0; 

function render() 
{
    states.forEach((state, i) => 
    {
        const is_active = i === current_index; 
        state.classList.toggle("active", is_active);
        state.inert = !is_active; 
    });

    left_btn.disabled = current_index === 0; 
    right_btn.disabled = current_index === last_index; 

    dots.forEach((dot, i) => { dot.classList.toggle("active", i === current_index)}); 
}

function go_next() 
{
    if (current_index < last_index) 
    {
        current_index++; 
        render(); 
    }
}

function go_prev() 
{
    if (current_index > 0) 
    {
        current_index--; 
        render(); 
    }
}

left_btn.addEventListener("click", go_prev);
right_btn.addEventListener("click", go_next);

go_wel_btn.addEventListener("click", () => 
{
    current_index = 1; 
    render();
});

render(); 
