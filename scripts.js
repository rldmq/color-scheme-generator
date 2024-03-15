const seedColorEl = document.getElementById("seed-color")
const modeEl = document.getElementById("scheme-mode")
const countEl = document.getElementById("num-colors")
const apiOutput = document.getElementById("api-output")

// NEEDS DRYER CODE
// would be cool if color selection was randomized on load
let hex = seedColorEl.value.slice(1)
let mode = modeEl.value
let count = countEl.value

// Render default values on startup
fetchColors(hex, mode, count)

// EVENT LISTENERS
document.addEventListener("click", function(e){
    if(e.target.dataset.hex){
        navigator.clipboard.writeText(e.target.dataset.hex)
        
        document.querySelector(".copy-modal").classList.toggle("hidden")

        setTimeout(function(){
            document.querySelector(".copy-modal").classList.toggle("hidden")
        },1000)
    }
})

document.getElementById("color-form").addEventListener("submit", function(e){
    e.preventDefault()

    grabInputValues()

    fetchColors(hex,mode,count)
})

// FUNCTIONS
function grabInputValues(){
    hex = seedColorEl.value.slice(1)
    mode = modeEl.value
    count = countEl.value
}

function fetchColors(hex,mode,count){
    fetch(`https://www.thecolorapi.com/scheme?hex=${hex}&mode=${mode}&count=${count}`)
        .then(res => res.json())
        .then(data => renderColorBoxes(data))
}

function renderColorBoxes(colorApiObj){
    apiOutput.innerHTML = colorApiObj.colors.map(e => `
    <div class="color-box-container">
        <div
            tabindex="0"
            class="color-box"
            data-hex="${e.hex.value}"
            style="background-color: ${e.hex.value}"
        >
        </div>
        <div class="color-info">
            <span class="color-name">${e.name.value}</span>
            <span class="color-hex">${e.hex.value}</span>
        </div>
    </div>
    `).join("")
}