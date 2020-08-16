##
## server.py
## Initializes the server
##

##imports flask framework needed to initialize the server
from flask import Flask, render_template
app = Flask(__name__, static_folder="../static/dist", template_folder="../static")
@app.route("/")
## renders the HTML file
def index():
    return render_template("index.html")

@app.route("/hello")
def hello():
    return "hello"
## runs the web application
if __name__ == "__main__":
    app.run()
