#/usr/bin/python3

from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/sorting")
def sorting():
    return render_template("sorting.html")

@app.route("/code")
def code():
    return render_template("code.html")

@app.route("/html")
def html():
    return render_template("html.html")

@app.route("/math")
def math():
    return render_template("math.html")

@app.route("/size")
def size():
    return render_template("size.html")

@app.route("/about")
def about():
    return render_template("about.html")

if __name__ == "__main__":
    app.run(debug=True)
