from flask import Flask, redirect, url_for, render_template, request 

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("base.html", content = "")

@app.route("/add_recipe")
def add_recipe():
    return render_template("addrecipe.html", content = "")

recipeDic = {"cheese,dough,basil,tomato sauce" : "pizza", "cheese,basil,tomato sauce" : "spaghetti"}

def findRecipe(ingredient_str):
    if ingredient_str in recipeDic:
        return recipeDic[ingredient_str]
    else:
        return "No Recipe"


@app.route("/pantry", methods=["POST", "GET"])
def login():
    if request.method == "POST":
        ingredients = request.form["food"]
        recipename = findRecipe(ingredients)
        return redirect(url_for("recipe", recipe=recipename))
    else:
        return render_template("pantry.html")

@app.route("/<recipe>")
def recipe(recipe):
    return f"<h1> You can make {recipe}! </h1> <h1> {recipe} Directions </h1> <p> Directions </p> <p>Health Info</p>"


# @app.route("/<usr>")
# def user(usr):
#     return f"<h1> Hi {usr} </h1>"

# @app.route("/admin")
# def admin():
#     return redirect(url_for("home"))

if __name__ == "__main__":
    app.run(debug=true)