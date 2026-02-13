// Focus management for Enter key
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input, select');
    
    inputs.forEach((input, index) => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (index + 1 < inputs.length) {
                    inputs[index + 1].focus();
                } else {
                    calculate();
                }
            }
        });
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

    document.getElementById("bricks").innerText = result.bricks.toLocaleString();
    document.getElementById("cost").innerText = "₹ " + result.cost.toLocaleString();

    document.getElementById("steps").innerHTML = `
📐 HOW IT CALCULATED:

📦 Effective Brick Size (with mortar):
   Length: ${result.eff_length.toFixed(2)} cm
   Height: ${result.eff_height.toFixed(2)} cm
   Width: ${result.eff_width.toFixed(2)} cm
   Brick Volume: ${result.brick_volume.toFixed(2)} cm³

🏗️ Wall Dimensions:
   Length: ${result.wall_length} cm
   Height: ${result.wall_height} cm
   Thickness: ${result.wall_thickness.toFixed(2)} cm

📊 Total Wall Volume: ${result.wall_volume.toFixed(2)} cm³

✅ Formula: Wall Volume ÷ Brick Volume = Total Bricks
   ${result.wall_volume.toFixed(2)} ÷ ${result.brick_volume.toFixed(2)} = ${result.bricks} bricks
    `;
});

}
