from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password
from django.contrib.auth import get_user_model, login as django_login
import psycopg2
from . import utils
import json
import uuid

import requests
import google.generativeai as genai
import os

API_KEY = "AIzaSyAc-bDMAy81qo_KdAZttxADj3cObN2NJu0"

# Create your views here.
def ensure(request):
    try:
        if request.method != "GET":
            raise utils.CustomError(f"Method - {request.method} is not Allowed")
        
        return JsonResponse({"success":"true", "status":"online"})
    
    except Exception as e:
        return JsonResponse({"success":"false", "message":f"{e}"})

@csrf_exempt 
def register(request):
    try:
        if request.method != "POST":
            raise utils.CustomError(f"Method - {request.method} is not Allowed")
        
        req_data = json.loads(request.body.decode('utf-8'))
        for key in ["first_name", "last_name", "email", "phone_no", "user_type", "password"]:
            if key not in req_data.keys():
                raise utils.CustomError(f"The parameter {key} is missing")
 
        insert_query = '''
            INSERT INTO users (user_id, first_name, last_name, email, phone_no, user_type, password)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        '''
        hashed_password = make_password(req_data['password'])
        unique_id = str(uuid.uuid4())
        data = (unique_id, 
                req_data['first_name'], 
                req_data['last_name'], 
                req_data['email'], 
                req_data['phone_no'], 
                req_data['user_type'], 
                hashed_password
                )
        conn = psycopg2.connect('postgres://avnadmin:AVNS_mhniSnR50YlZg9vLspZ@pg-365a913b-test-project-16.i.aivencloud.com:21339/loadunload?sslmode=require')
        cur = conn.cursor()
        cur.execute(insert_query, data)
        conn.commit()
        cur.close()
        conn.close()

        return JsonResponse({"success":"true", "message": "User created successfully.",  "user_id": unique_id, "user_type": req_data['user_type']})

    except Exception as e:
        return JsonResponse({"success":"false", "message":f"{e}"})
    
@csrf_exempt 
def login(request):
    try:
        if request.method != "POST":
            raise utils.CustomError(f"Method - {request.method} is not Allowed")
        
        req_data = json.loads(request.body.decode('utf-8'))
        for key in ["email", "password"]:
            if key not in req_data.keys():
                raise utils.CustomError(f"The parameter {key} is missing")
            
        
        conn = psycopg2.connect('postgres://avnadmin:AVNS_mhniSnR50YlZg9vLspZ@pg-365a913b-test-project-16.i.aivencloud.com:21339/loadunload?sslmode=require')
        cur = conn.cursor()

        cur.execute("SELECT * FROM users WHERE email = %s", [req_data['email']])
        user = cur.fetchone()
        print(user)
        cur.close()
        conn.close()

        if user:
            user_id, hashed_password = user[0], user[6]
            if check_password(req_data['password'], hashed_password):
                request.session['user_id'] = user_id
                User = get_user_model()  
                user_instance = User(
                    first_name=user[1],
                    last_name=user[2],
                    email=user[3],
                )
                # django_login(request, user=None) 
                return JsonResponse({"success":"true", "message": "Login successful", "user_id": user[0], "user_type": user[5]})
            else:
                return JsonResponse({"success":"false", "error": "Invalid credentials"}, status=401)
        else:
            return JsonResponse({"success":"false", "error": "User not found"}, status=404)

    except Exception as e:
        return JsonResponse({"success":"false", "message":f"{e}"})

@csrf_exempt 
def estimate(request):
    try:
        if request.method != "POST":
            raise utils.CustomError(f"Method - {request.method} is not Allowed")
        
        req_data = json.loads(request.body.decode('utf-8'))
        for key in ["contact_name", "contact_no", "vehicle", "goods", "weight", "volume", "pickup_address", "drop_address", "start_date", "start_time"]:
            if key not in req_data.keys():
                raise utils.CustomError(f"The parameter {key} is missing")
            
        genai.configure(api_key=API_KEY)
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(f'''
                                          Estimate the price in Rupees, dist in km, and duration in hours from the for the good transportation, you can give approx values, that will work. 

                                          Use the below data to do the estimation or prediction. 
                                          1. Vehicle Type: {req_data['vehicle']},
                                          2. Goods Type: {req_data['goods']},
                                          3. Weight of the Goods: {req_data['weight']}, 
                                          4. Volume of the goods: {req_data['volume']},
                                          5. Pickup address: {req_data['pickup_address']},
                                          6. Drop address: {req_data['drop_address']},
                                          7. Start date: {req_data['start_date']},
                                          8. Start time: {req_data['start_time']}

                                            Return the estimation/prediction strictly in below Json format: 
                                            'estimated_price': <numerical value (in rupees)>,
                                            'estimated_duration': <numerical value (in hours)>,
                                            'estimated_dist': <numerical value (in kms)>

                                            Eg. 
                                                'estimated_price': 6000,
                                                'estimated_duration': 6,
                                                'estimated_dist': 28

                                            Don't send anything else apart from the mentioned JSON. Also include the json brackets.
                                          
                                          ''')
        response_text = response.text
        cleaned_response = response_text.replace("\n", "").replace("'", '"')
        parsed_json = json.loads(cleaned_response)
        return JsonResponse({"success":"true", "message": parsed_json})
    except Exception as e: 
        return JsonResponse({"success":"false", "message": {
        "estimated_price": 3000,
        "estimated_duration": 3,
        "estimated_dist": 15
    }, "error":f"{e}"})

@csrf_exempt 
def book(request):
    try:
        if request.method != "POST":
            raise utils.CustomError(f"Method - {request.method} is not Allowed")
        
        req_data = json.loads(request.body.decode('utf-8'))
        for key in ["contact_name", "contact_no", "vehicle", "goods", "weight", "volume", "pickup_address", "drop_address", "start_date", "start_time", "duration", "price", "distance"]:
            if key not in req_data.keys():
                raise utils.CustomError(f"The parameter {key} is missing")
            
        insert_query = '''
            INSERT INTO bookings (booking_id, user_id, contact_name, contact_no, vehicle, goods, weight, volume, pickup_address, drop_address, start_date, start_time, duration, price, distance)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        '''
        unique_id = str(uuid.uuid4())
        user_id = request.session.get('user_id')
        data = (unique_id, 
                user_id, 
                req_data['contact_name'], 
                req_data['contact_no'], 
                req_data['vehicle'], 
                req_data['goods'], 
                req_data['weight'], 
                req_data['volume'], 
                req_data['pickup_address'], 
                req_data['drop_address'], 
                req_data['start_date'], 
                req_data['start_time'], 
                req_data['duration'], 
                req_data['price'],
                req_data['distance']
                )
        conn = psycopg2.connect('postgres://avnadmin:AVNS_mhniSnR50YlZg9vLspZ@pg-365a913b-test-project-16.i.aivencloud.com:21339/loadunload?sslmode=require')
        cur = conn.cursor()
        cur.execute(insert_query, data)
        conn.commit()
        cur.close()
        conn.close()

        return JsonResponse({"success":"true", "message": "Succesfully placed order"})
    
    except Exception as e:
        return JsonResponse({"success":"false", "message":f"{e}"})
    

@csrf_exempt 
def get_unassigned(request):
    try:
        if request.method != "GET":
            raise utils.CustomError(f"Method - {request.method} is not Allowed")
        
        query = '''
        SELECT b.* 
        FROM bookings b
        LEFT JOIN assigns a ON b.booking_id = a.booking_id
        WHERE a.booking_id IS NULL;
        '''
        conn = psycopg2.connect('postgres://avnadmin:AVNS_mhniSnR50YlZg9vLspZ@pg-365a913b-test-project-16.i.aivencloud.com:21339/loadunload?sslmode=require')
        cur = conn.cursor()
        cur.execute(query)
        unassigned_bookings = cur.fetchall()
        conn.commit()
        cur.close()
        conn.close()

        return JsonResponse({"success":"true", "message": "Retrieved all unassigned succesfully", "data": unassigned_bookings})
    
    except Exception as e:
        return JsonResponse({"success":"false", "message":f"{e}"})
    
@csrf_exempt 
def get_assigned(request):
    try:
        if request.method != "POST":
            raise utils.CustomError(f"Method - {request.method} is not Allowed")
        
        req_data = json.loads(request.body.decode('utf-8'))
        for key in ["user_id"]:
            if key not in req_data.keys():
                raise utils.CustomError(f"The parameter {key} is missing")
        
        query = '''
        SELECT b.* 
        FROM bookings b
        where b.booking_id in (
            select a.booking_id 
            from assigns a
            where a.user_id = %s 
        ); 
        '''
        conn = psycopg2.connect('postgres://avnadmin:AVNS_mhniSnR50YlZg9vLspZ@pg-365a913b-test-project-16.i.aivencloud.com:21339/loadunload?sslmode=require')
        cur = conn.cursor()
        cur.execute(query, (req_data["user_id"],))
        assigned_bookings = cur.fetchall()
        conn.commit()
        cur.close()
        conn.close()

        print(assigned_bookings)

        return JsonResponse({"success":"true", "message": "Retrieved all unassigned succesfully", "data": assigned_bookings})
    
    except Exception as e:
        return JsonResponse({"success":"false", "message":f"{e}"})

@csrf_exempt 
def assign(request):
    try:
        if request.method != "POST":
            raise utils.CustomError(f"Method - {request.method} is not Allowed")

        req_data = json.loads(request.body.decode('utf-8'))
        for key in ["booking_id", "user_id"]:
            if key not in req_data.keys():
                raise utils.CustomError(f"The parameter {key} is missing")
        
        insert_query = '''
        INSERT INTO assigns (booking_id, user_id)
        VALUES (%s, %s)
        '''

        data = (req_data["booking_id"], 
                req_data["user_id"], 
                )
        print(data)

        conn = psycopg2.connect('postgres://avnadmin:AVNS_mhniSnR50YlZg9vLspZ@pg-365a913b-test-project-16.i.aivencloud.com:21339/loadunload?sslmode=require')
        cur = conn.cursor()
        cur.execute(insert_query, data)
        conn.commit()
        cur.close()
        conn.close()

        return JsonResponse({"success":"true", "message": "Assigned succesfully"})
    
    except Exception as e:
        return JsonResponse({"success":"false", "message":f"{e}"})
    


    

    
    
