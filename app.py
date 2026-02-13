from flask import Flask, render_template, request, jsonify, redirect
import math

app = Flask(__name__)

def to_cm(value, unit):
    conversion = {
        "mm": 0.1,
        "cm": 1,
        "m": 100,
        "in": 2.54,
        "ft": 30.48
    }
    return value * conversion[unit]

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/calculator")
def calculator():
    return render_template("calculator.html")

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/contact", methods=["GET", "POST"])
def contact():
    if request.method == "POST":
        name = request.form["name"]
        email = request.form["email"]
        message = request.form["message"]
        print("New Contact:", name, email, message)
        return redirect("/contact")
    return render_template("contact.html")

@app.route("/calculate", methods=["POST"])
def calculate():
    data = request.json

    wall_length = to_cm(float(data["wall_length"]), data["wall_unit"])
    wall_height = to_cm(float(data["wall_height"]), data["wall_unit"])

    brick_length = to_cm(float(data["brick_length"]), data["brick_unit"])
    brick_height = to_cm(float(data["brick_height"]), data["brick_unit"])
    brick_width = to_cm(float(data["brick_width"]), data["brick_unit"])

    thickness = int(data["thickness"])
    price = float(data["price"])

    mortar = 1

    eff_length = brick_length + mortar
    eff_height = brick_height + mortar
    eff_width = brick_width + mortar

    wall_thickness = eff_width * thickness

    wall_volume = wall_length * wall_height * wall_thickness
    brick_volume = eff_length * eff_height * eff_width

    total_bricks = round(wall_volume / brick_volume)
    total_cost = total_bricks * price

    return jsonify({
        "bricks": total_bricks,
        "cost": total_cost,
        "eff_length": eff_length,
        "eff_height": eff_height,
        "eff_width": eff_width,
        "wall_thickness": wall_thickness,
        "wall_volume": wall_volume,
        "brick_volume": brick_volume
    })

if __name__ == "__main__":
    app.run
