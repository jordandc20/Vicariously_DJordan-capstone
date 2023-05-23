#!/usr/bin/env python3

# Standard library imports
import random

# Remote library imports
from faker import Faker
from datetime import datetime

# Local imports
from app import app
from models import db, User, City, Location,CityNote,LocationNote

if __name__ == '__main__':
    faker = Faker()

    with app.app_context():
        print("Starting seed...")
        
        LocationNote.query.delete()
        CityNote.query.delete()
        Location.query.delete()
        City.query.delete()
        User.query.delete()


        ############# * USERS * #############
    
        styles = ['Thrill-seeker', 'Foodie', 'Relaxer', 'Experiencer','Party Animal','Shopper']
        for i in range(5):
            email_address = faker.email()
            travel_style_rand=random.choice(styles)
            username_rand=faker.text(max_nb_chars=19).replace(" ", "").lower()
            user = User(
                email = email_address,
                username = username_rand,
                travel_style = travel_style_rand
            )
            db.session.add(user)
            db.session.commit()
            styles.remove(travel_style_rand)
        user_ids = [user.id for user in User.query.all()]
        
        ############# * CITIES * #############
        
        ireland = City(
            city_name = 'Killarney',
            country =  'Ireland',
            user_id =  user_ids[0]
        )
        db.session.add(ireland)
        db.session.commit()
        
        seoul = City(
            city_name = 'Seoul',
            country =  'South Korea',
            user_id =  user_ids[0]
        )
        db.session.add(seoul)
        db.session.commit()

        seoul2 = City(
            city_name = 'Seoul',
            country =  'South Korea',
            user_id =  user_ids[1]
        )
        db.session.add(seoul2)
        db.session.commit()
        
        city_ids = [city.id for city in City.query.all()]
        
        ############# * CITY NOTES * #############
            
        Killarney1 = CityNote(
            note_body =  'great hub for tours to ring of kerry and dingle peninsula',
            city_id = city_ids[0]
        )
        db.session.add(Killarney1)
        db.session.commit()
        
        
        seoul1 = CityNote(
            note_body =  'so fast paced',
            city_id = city_ids[1]
        )
        db.session.add(seoul1)
        db.session.commit()
        
        seoul2 = CityNote(
            note_body =  'subway - well connected, but ends at midnight.',
            note_type= 'Transportation',
            city_id = city_ids[1]
        )
        db.session.add(seoul2)
        db.session.commit()
        
        seoul3 = CityNote(
            note_body =  'buses - some run late night, some end early.',
            note_type= 'Transportation',
            city_id = city_ids[1]
        )
        db.session.add(seoul3)
        db.session.commit()
        
        
        ############# * LOCATIONS * #############
        
        haneul = Location(
            location_name = 'Haneul Park (하늘공원)',
            date_visited =  faker.date_between_dates(date_start=datetime(2015,1,1), date_end=datetime(2019,12,31)),
            rating = 4,
            google_map_url = 'https://goo.gl/maps/E6CtsTEMe27p5HXj9',
            website = 'https://parks.seoul.go.kr/parks',
            avg_cost = 0,
            category = 'OutdoorActivity',
            city_id = city_ids[1],
            user_id = user_ids[0]
        )
        db.session.add(haneul)
        db.session.commit()
    
        seoul_forest = Location(
            location_name = 'Seoul Forest Park (서울숲공원)',
            date_visited =  faker.date_between_dates(date_start=datetime(2015,1,1), date_end=datetime(2019,12,31)),
            rating = 4,
            google_map_url = 'https://goo.gl/maps/kDGN5J1qCkgRsMoX8',
            website = 'https://parks.seoul.go.kr/parks/',
            avg_cost = 0,
            category = 'OutdoorActivity',
            city_id = city_ids[1],
            user_id = user_ids[0]
        )
        db.session.add(seoul_forest)
        db.session.commit()


        kimbap = Location(
            location_name = 'Gimbap Cheonguk (김밥천국 서강대점)',
            date_visited =  faker.date_between_dates(date_start=datetime(2015,1,1), date_end=datetime(2019,12,31)),
            rating = 4,
            google_map_url = 'https://goo.gl/maps/NAsvAz4WeD8Hrh3J7',
            website = None,
            avg_cost = 1,
            category = 'FoodDrink',
            city_id = city_ids[1],
            user_id = user_ids[0]
        )
        db.session.add(kimbap)
        db.session.commit()
        
        location_ids = [location.id for location in Location.query.all()]
        
        
        ############# * LOCATION NOTES * #############
            
        seoul_forest1 = LocationNote(
            note_body =  'great for fall foliage. walk all the way to the tip for nice city views and deer ',
            location_id = location_ids[1]
        )
        db.session.add(seoul_forest1)
        db.session.commit()
        
        haneul1 = LocationNote(
            note_body =  'great city views, especially at night',
            location_id = location_ids[0]
        )
        db.session.add(haneul1)
        db.session.commit()
        
        haneul2 = LocationNote(
            note_body =  'can take long stairs up/down or paid trolley.',
            location_id = location_ids[0]
        )
        db.session.add(haneul2)
        db.session.commit()
        
        haneul3 = LocationNote(
            note_body =  'Must see Silver grass in the fall',
            location_id = location_ids[0]
        )
        db.session.add(haneul3)
        db.session.commit()
        
        kimbap1 = LocationNote(
            note_body =  'Food is very affordable, 3,000-6,000 won',
            location_id = location_ids[2]
        )
        db.session.add(kimbap1)
        db.session.commit()
        
        kimbap2 = LocationNote(
            note_body =  'Loved the Cheese Ramen (with egg) and the kimbap rolled in egg',
            location_id = location_ids[2]
        )
        db.session.add(kimbap2)
        db.session.commit()
        
        kimbap3 = LocationNote(
            note_body =  'Not so good: bibimbap',
            location_id = location_ids[2]
        )
        db.session.add(kimbap3)
        db.session.commit()
        