// Move to next field on Enter key
document.addEventListener("DOMContentLoaded", function() {
    const inputFields = ["brick_length", "brick_height", "brick_width", "brick_unit", 
                         "wall_length", "wall_height", "wall_unit", "thickness", "price"];
    
    inputFields.forEach((fieldId, index) => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener("keypress", function(event) {
                if (event.key === "Enter") {
                    event.preventDefault();
                    const nextIndex = index + 1;
                    if (nextIndex < inputFields.length) {
                        document.getElementById(inputFields[nextIndex]).focus();
                    }
                }
            });
        }
    });
});

function calculate() {

let data = {
    brick_length: document.getElementById("brick_length").value,
    brick_height: document.getElementById("brick_height").value,
    brick_width: document.getElementById("brick_width").value,
    brick_unit: document.getElementById("brick_unit").value,
    wall_length: document.getElementById("wall_length").value,
    wall_height: document.getElementById("wall_height").value,
    wall_unit: document.getElementById("wall_unit").value,
    thickness: document.getElementById("thickness").value,
    price: document.getElementById("price").value
};

fetch("/calculate", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
})
.then(res => res.json())
.then(result => {

    document.getElementById("bricks").innerText = result.bricks;
    document.getElementById("cost").innerText = "₹ " + result.cost;

    document.getElementById("steps").innerHTML = `
        <b>Effective Brick Dimensions (with mortar)</b><br>
        Length: ${result.eff_length.toFixed(2)} cm<br>
        Height: ${result.eff_height.toFixed(2)} cm<br>
        Width: ${result.eff_width.toFixed(2)} cm<br><br>

        <b>Wall Thickness:</b> ${result.wall_thickness.toFixed(2)} cm<br>
        <b>Wall Volume:</b> ${result.wall_volume.toFixed(2)} cm³<br>
        <b>Brick Volume:</b> ${result.brick_volume.toFixed(2)} cm³
    `;
});

}
