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

@app.route("/sound")
def sound():
    return render_template("sound.html")

@app.route("/image")
def image():
    return render_template("image.html")

if __name__ == "__main__":
    app.run(debug=True)
