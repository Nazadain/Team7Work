import os
from flask import Flask, request, jsonify, render_template, send_from_directory
from routes import *
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db.init_app(app)

app.static_folder = 'client'

template_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), 'client', 'templates'))
app.template_folder = template_dir

@app.route('/')
def index():
    return render_template('index.html')

def serve_static(filename):
    return send_from_directory(app.static_folder, filename)

if __name__ == '__main__':
    app.run(debug=True)
