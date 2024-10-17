
import psycopg2

API_KEY = "AIzaSyAc-bDMAy81qo_KdAZttxADj3cObN2NJu0"
conn = psycopg2.connect('postgres://avnadmin:AVNS_mhniSnR50YlZg9vLspZ@pg-365a913b-test-project-16.i.aivencloud.com:21339/loadunload?sslmode=require')
cur = conn.cursor()

create_table_query = '''
CREATE TABLE logistics (
    contact_name VARCHAR(100),
    contact_no VARCHAR(15),
    vehicle VARCHAR(50),
    goods VARCHAR(100),
    weight DECIMAL(10, 2),
    volume DECIMAL(10, 2),
    pickup_address TEXT,
    drop_address TEXT,
    start_date DATE,
    start_time TIME
);
'''
cur.execute(create_table_query)
conn.commit()