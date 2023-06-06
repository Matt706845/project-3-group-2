# Import the necessary modules
from flask import Flask, jsonify
import psycopg2

# Create a Flask application
app = Flask(__name__)

# Define the route to fetch all restaurants
@app.route('/restaurants', methods=['GET'])
def get_restaurants():
    try:
        # Establish a connection to the database
        connection = psycopg2.connect(
            host='localhost',
            port=5432,
            database='restaurant_data',
            user='postgres',
            password='1234'
        )
        
        # Create a cursor object to execute SQL queries
        cursor = connection.cursor()

        # Execute the SQL query to fetch all restaurants
        cursor.execute("SELECT * FROM restaurants")

        # Fetch all rows from the result set
        restaurants = cursor.fetchall()
        print (restaurants)
        # Close the cursor and connection
        cursor.close()
        connection.close()

        # Convert the restaurants to a list of dictionaries
        restaurants_list = []
        for restaurant in restaurants:
            restaurant_dict = {
                'name': restaurant[0],
                'street_address': restaurant[1],
                'google_map': restaurant[2],
                'review_count': restaurant[3],
                'phone': restaurant[4],
                'website': restaurant[5],
                'restaurant_type': restaurant[6],
                'average_rating': restaurant[7],
                'food_review': restaurant[8],
                'service_review': restaurant[9],
                'ambience_review': restaurant[10],
                'value_review': restaurant[11],
                'price_range': restaurant[12],
                'description': restaurant[13],
                'restaurant_main_type': restaurant[14],
                'latitude': restaurant[15],
                'longitude': restaurant[16],
                'postal_code': restaurant[17]
            }
            restaurants_list.append(restaurant_dict)

        # Return the restaurants as JSON response
        return jsonify(restaurants_list)

    except (Exception, psycopg2.Error) as error:
        return jsonify({'error': str(error)})

# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True)
