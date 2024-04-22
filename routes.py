from flask import render_template, request, jsonify, redirect, url_for, flash
from app import app
from models import db

@app.route('/', methods=['GET'])
def process_request():
    address = request.args.get('address')
    comment = request.args.get('comment')
    
    return "Request processed successfully"

from flask import redirect, url_for, flash

@app.route('/login', methods=['GET', 'POST'])
def login_page():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = db.User.query.filter_by(username=username).first()
        if user and user.check_password(password):
            flash('Logged in successfully!', 'success')
            return redirect(url_for('index')) 
        else:
            flash('Invalid username or password', 'error')
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register_page():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        role = request.form['role']
        user = db.User(username=username, email=email, role=role)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()
        flash('Registered successfully!', 'success')
        return redirect(url_for('login')) 
    return render_template('register.html')

@app.route('/orders', methods=['GET'])
def get_orders():
    orders = db.Order.query.all()
    output = []
    for order in orders:
        order_data = {'id': order.id, 'user_id': order.user_id, 'dish_id': order.dish_id, 'address': order.address, 'status': order.status}
        output.append(order_data)
    return jsonify({'orders': output})

@app.route('/orders', methods=['POST'])
def create_order():
    data = request.json
    new_order = db.Order(user_id=data['user_id'], dish_id=data['dish_id'], address=data['address'], status='New')
    db.session.add(new_order)
    db.session.commit()
    return jsonify({'message': 'Order created successfully'}), 201

@app.route('/orders/<int:order_id>', methods=['PUT'])
def update_order(order_id):
    order = db.Order.query.get(order_id)
    if not order:
        return jsonify({'error': 'Order not found'}), 404
    data = request.json
    order.status = data['status']
    db.session.commit()
    return jsonify({'message': 'Order updated successfully'})

@app.route('/dishes', methods=['GET'])
def get_dishes():
    dishes = db.Dish.query.all()
    output = []
    for dish in dishes:
        dish_data = {'id': dish.id, 'name': dish.name, 'price': dish.price}
        output.append(dish_data)
    return jsonify({'dishes': output})

@app.route('/dishes', methods=['POST'])
def create_dish():
    data = request.json
    new_dish = db.Dish(name=data['name'], price=data['price'])
    db.session.add(new_dish)
    db.session.commit()
    return jsonify({'message': 'Dish created successfully'}), 201