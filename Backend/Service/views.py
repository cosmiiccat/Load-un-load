from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
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
            INSERT INTO bookings (id, contact_name, contact_no, vehicle, goods, weight, volume, pickup_address, drop_address, start_date, start_time, duration, price, distance)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        '''
        unique_id = str(uuid.uuid4())
        data = (unique_id, 
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
    

    
    
