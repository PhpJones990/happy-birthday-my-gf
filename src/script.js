const states = document.querySelectorAll(".state"); 
const dots = document.querySelectorAll(".dot"); 
const left_btn = document.getElementById("left-btn"); 
const right_btn = document.getElementById("right-btn"); 

const go_wel_btn = document.getElementById("go-welcome"); 

const get_gifts_btn = document.getElementById("get-gifts"); 
const gf_day_btn = document.getElementById("gf-day"); 

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

    if (current_index !== 4) right_btn.disabled = true;
    if (current_index === last_index) left_btn.disabled = true;   

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
    if (current_index == 3) 
    {
        current_index = 1;
        render(); 
        return;
    }

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

get_gifts_btn.addEventListener("click", () => 
{
    current_index = 2;
    render();
});
gf_day_btn.addEventListener("click", () => 
{
    current_index = 3;
    render();
});


var images = [
    "../images/card_images/image001.png",
    "../images/card_images/image002.png",
    "../images/card_images/image003.png",
    "../images/card_images/image004.png",
    "../images/card_images/image005.png",
    "../images/card_images/image006.png",
    "../images/card_images/image007.png",
    "../images/card_images/image008.png",
    "../images/card_images/image009.png",
    "../images/card_images/image010.png",
    "../images/card_images/image011.png",
    "../images/card_images/image012.png"
]; 

let first_card = null; 
let second_card = null; 
let can_flip = true; 
let matches = 0; 

let reward_gifts_btn = document.getElementById("reward_gifts_btn"); 

function start_game() 
{
    let game_board = document.getElementById("game_board"); 
    game_board.innerHTML = ""; 

    let card_images = images.concat(images); 
    
    card_images.sort(() => Math.random() - 0.5); 

    reward_gifts_btn.disabled = true; 

    for (let i = 0; i < card_images.length; i++) 
    {
        let card = document.createElement("div"); 
        card.className = "card"; 
        card.innerHTML = `<div class="card-front"><img src="../images/card_images/cover_img.png"></div>` + 
                         `<div class="card-back"><img src="${card_images[i]}"></div>`; 
        card.onclick = flip_card; 
        card.dataset.image = card_images[i]; 
        game_board.appendChild(card); 
    }

    first_card = null; 
    second_card = null; 
    can_flip = true; 
    matches = 0; 

}

function flip_card() 
{
    if (!can_flip) return; 
    if (this.classList.contains("flipped")) return; 
    if (this.classList.contains("matched")) return; 

    this.classList.add("flipped"); 

    if (first_card == null) 
    {
        first_card = this;
    }
    else 
    {
        second_card = this; 
        can_flip = false; 
        check_match(); 
    }
}

function check_match() 
{
    let match = first_card.dataset.image == second_card.dataset.image; 

    if (match) 
    {
        matches++;
        setTimeout(() => 
        {
            first_card.classList.add("matched"); 
            second_card.classList.add("matched"); 
            reset_cards(); 

            if (matches == 12) 
            {
                end_game(); 
            }
        }, 500); 
    }
    else 
    {
        setTimeout(() => 
        {
            first_card.classList.remove("flipped"); 
            second_card.classList.remove("flipped"); 
            reset_cards(); 
        }, 1000); 
    }
}

function reset_cards() 
{
    first_card = null; 
    second_card = null; 
    can_flip = true; 
}

function end_game() 
{
    reward_gifts_btn.disabled = false; 
}

function new_game() 
{
    start_game(); 
}

let new_game_btn = document.getElementById("new_game_btn"); 
new_game_btn.addEventListener("click", start_game); 

reward_gifts_btn.addEventListener("click", () => 
{
    current_index = last_index; 
    render();
})

start_game(); 


const love_yes_btn = document.getElementById("love-yes"); 
const love_no_btn = document.getElementById("love-no"); 

love_yes_btn.addEventListener("click", () => 
{
    love_no_btn.style.position = "relative"; 
    love_no_btn.style.left = "0px";
    love_no_btn.style.top = "0px";

    current_index = 4; 
    render(); 
});

love_no_btn.addEventListener("mouseover", () => 
{
    const max_x = window.innerWidth - love_no_btn.offsetWidth; 
    const max_y = window.innerHeight - love_no_btn.offsetHeight; 

    const rand_x = Math.floor(Math.random() * max_x); 
    const rand_y = Math.floor(Math.random() * max_y); 

    love_no_btn.style.position = "absolute"; 
    love_no_btn.style.left = rand_x + "px";
    love_no_btn.style.top = rand_y + "px";
});

const reward_card_containers = document.querySelectorAll(".reward-card-container"); 

reward_card_containers.forEach((container) => 
{
    const reward_card = container.querySelector(".reward-card"); 
    container.addEventListener("click", () => 
    {
        reward_card.classList.toggle("flip");
    });
});

const reward_home_nav = document.getElementById("reward-home-nav"); 
const reward_gf_day_nav = document.getElementById("reward-gf-day-nav"); 

reward_home_nav.addEventListener("click", () => 
{
    current_index = 0; 
    render(); 
});

reward_gf_day_nav.addEventListener("click", () => 
{
    current_index = 3;
    render(); 
});

render(); 
