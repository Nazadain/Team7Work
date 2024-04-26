import os
from flask import Flask, redirect, request, jsonify, render_template, send_from_directory, url_for, flash
from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)

# ====Создание бд====

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20), nullable=False) 

    def check_password(self, password):
        if password == self.password_hash:
            return 0
        else: 
            return 1

class Order(db.Model):
    __tablename__ = 'order'
    __table_args__ = {'extend_existing': True}  

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    dish_id = db.Column(db.Integer, nullable=False)
    address = db.Column(db.String(255), nullable=False)
    status = db.Column(db.String(50), default='New')  

dish_ingredients = db.Table('dish_ingredients',
    db.Column('dish_id', db.Integer, db.ForeignKey('dish.id'), primary_key=True),
    db.Column('ingredient_id', db.Integer, db.ForeignKey('ingredient.id'), primary_key=True)
)

class Dish(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    type = db.Column(db.String(100), nullable=False)
    descr = db.Column(db.String(200), nullable=False)
    img = db.Column(db.String(300), nullable=False)
    ingredients = db.relationship('Ingredient', secondary=dish_ingredients, lazy='subquery',
        backref=db.backref('dishes', lazy=True))

class Ingredient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

# ====================

app.static_folder = 'client'

template_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), 'client', 'templates'))
app.template_folder = template_dir

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        username = request.form['title']
        password = request.form['pass']
        user = User.query.filter_by(username=username).first()
        if user and user.check_password(password) != 0:
            return
        elif user and user.check_password(password) == 0:
            if user.role == 'user':
                return redirect(url_for('user')) 
            elif user.role == 'manager':
                return redirect(url_for('manager')) 
            
        else:
            print("error")
    return render_template('index.html')

@app.route('/user', methods=['GET', 'POST'])    
def user():
    return render_template('user.html')

@app.route('/manager', methods=['GET', 'POST'])    
def manager():
    return render_template('manager.html')

@app.route('/order', methods=['GET', 'POST'])    
def order():
    return render_template('order.html')

@app.route('/register', methods=['GET', 'POST'])
def register_page():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        role = request.form['role']
        user = User(username=username, password_hash=password, email=email, role=role)
        try:
            db.session.add(user)
            db.session.commit()
            return redirect(url_for('index')) 
        except:
            return render_template('register.html')
    return render_template('register.html')
                
def serve_static(filename):
    return send_from_directory(app.static_folder, filename)

if __name__ == '__main__':
    app.run(debug=True)
