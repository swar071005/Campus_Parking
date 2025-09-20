from flask import Flask, request, jsonify, render_template

app = Flask(__name__, static_folder='.', static_url_path='')

# Sample testimonials for trust.html
testimonials = [
    {"author": "Alice", "message": "The parking system is seamless and reliable!"},
    {"author": "Bob", "message": "Easy booking and great security."}
]

# Sample services for service.html
services = [
    {"name": "Slot Booking", "description": "Book parking slots easily."},
    {"name": "Cancellation", "description": "Cancel your parking slots anytime."}
]

@app.route('/')
def home():
    return app.send_static_file('index.html')

@app.route('/trust')
def trust():
    return app.send_static_file('trust.html')

@app.route('/service')
def service():
    return app.send_static_file('service.html')

@app.route('/contact')
def contact():
    return app.send_static_file('contact.html')

@app.route('/about')
def about():
    return app.send_static_file('about.html')

@app.route('/api/testimonials')
def get_testimonials():
    return jsonify(testimonials)

@app.route('/api/services')
def get_services():
    return jsonify(services)

@app.route('/api/book_slot', methods=['POST'])
def book_slot():
    data = request.json
    user_id = data.get('user_id')
    slot_id = data.get('slot_id')
    # Here you would add DB logic to save booking
    return jsonify({"message": f"User {user_id} booked slot {slot_id} successfully."})

@app.route('/api/contact', methods=['POST'])
def contact_form():
    name = request.json.get('name')
    email = request.json.get('email')
    message = request.json.get('message')
    # You can add logic to save or email this information
    return jsonify({"message": "Thank you for contacting us, we will respond shortly."})

if __name__ == '__main__':
    app.run(debug=True)
