#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
from flask_restful import Resource
from datetime import datetime
from faker import Faker
import re
# Local imports
from config import app, db, api
from models import User, City, CityNote, Location, LocationNote

faker = Faker()


class Home(Resource):
    def get(self):
        return make_response({'message': 'Vicariously API is running!'}, 202)


api.add_resource(Home, '/')


class Users(Resource):
    def get(self):
        try:
            users = [user.to_dict() for user in User.query.all()]
            if not users:
                return make_response({'error': 'no users exist'}, 404)
            return make_response(
                users,
                200,
                {"Content-Type": "application/json"}
            )
        except Exception as e:
            return make_response({'message': 'Something went wrong!', 'stackTrace': e}, 400)


api.add_resource(Users, '/users')


class UserByUsername(Resource):
    def get(self, username):
        user = User.query.filter_by(username=username).first()
        if not user:
            return make_response({'error': 'User not found'}, 404)
        return make_response(user.to_dict(), 200, {"Content-Type": "application/json"})


api.add_resource(UserByUsername, '/users/<username>')


class UserById(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        if not user:
            return make_response({'error': 'User not found'}, 404)
        return make_response(user.to_dict(), 200, {"Content-Type": "application/json"})

    def patch(self, id):
        data = request.get_json()
        user = User.query.filter_by(id=id).first()
        # user_val = User.query.filter_by(email=data['val_user_email']).first()
        # if user_val.id != data['user_id']:
        #     return make_response({'error': 'permissions mismatch'}, 400)
        if not user:
            return make_response({'error': 'User not found'}, 404)
        try:
            for attr in data:
                setattr(user, attr, data[attr])
            db.session.add(user)
            db.session.commit()
        except Exception as ex:
            return make_response({'error': [ex.__str__()]}, 422)
        return make_response(user.to_dict(), 202)

    def delete(self, id):
        data = request.get_json()
        user_val = User.query.filter_by(email=data['val_user_email']).first()
        if user_val.id != data['user_id']:
            return make_response({'error': 'permissions mismatch'}, 400)

        user = User.query.filter_by(id=id).first()
        if not user:
            return make_response({'error': 'user not found'}, 404)
        db.session.delete(user)
        db.session.commit()
        return make_response(f"deleted ok", 200)


api.add_resource(UserById, '/users/<int:id>')


class Login(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(email=data['email']).first()
        if not user:
            try:
                new_user = User(
                    email=data['email'],
                    username=re.sub(r"[^a-zA-Z0-9]+", "", faker.text(max_nb_chars=19).lower())
                    )
                db.session.add(new_user)
                db.session.commit()
                print(new_user.to_dict())
            except Exception as errors:
                return make_response({"errors": [errors.__str__()]}, 422)
            return make_response(new_user.to_dict(rules=("-cities",)), 201)
        return make_response(user.to_dict(rules=("-cities",)), 200, {"Content-Type": "application/json"})


api.add_resource(Login, '/login')


class Cities(Resource):
    def get(self):
        try:
            cities = [city.to_dict() for city in City.query.all()]
            if not cities:
                return make_response({'error': 'no cities exist'}, 404)
            return make_response(
                cities,
                200,
                {"Content-Type": "application/json"}
            )
        except Exception as e:
            return make_response({'message': 'Something went wrong!', 'stackTrace': e}, 400)

    def post(self):
        data = request.get_json()
        user_val = User.query.filter_by(email=data['val_user_email']).first()
        if user_val.id != data['user_id']:
            return make_response({'error': 'permissions mismatch'}, 400)
        try:
            new_city = City(
                city_name=data['city_name'],
                country=data['country'],
                user_id=data['user_id'],
                city_imgs=data['city_imgs'],
            )
            db.session.add(new_city)
            db.session.commit()
        except Exception as errors:
            return make_response({"errors": [errors.__str__()]}, 422)
        return make_response(new_city.to_dict(), 201)


api.add_resource(Cities, '/cities')


class CityById(Resource):
    def get(self, id):
        print(datetime.now())
        city = City.query.filter_by(id=id).first()
        if not city:
            return make_response({'error': 'City not found'}, 404)
        return make_response(city.to_dict(rules=("-city_imgs",)), 200, {"Content-Type": "application/json"})

    def patch(self, id):
        data = request.get_json()
        user_val = User.query.filter_by(email=data['val_user_email']).first()
        if user_val.id != data['user_id']:
            return make_response({'error': 'permissions mismatch'}, 400)
        city = City.query.filter_by(id=id).first()
        if not city:
            return make_response({'error': 'City not found'}, 404)
        try:
            for attr in data:
                setattr(city, attr, data[attr])
            db.session.add(city)
            db.session.commit()
        except Exception as ex:
            return make_response({'error': [ex.__str__()]}, 422)
        return make_response(city.to_dict(), 202)

    def delete(self, id):
        data = request.get_json()
        user_val = User.query.filter_by(email=data['val_user_email']).first()
        if user_val.id != data['user_id']:
            return make_response({'error': 'permissions mismatch'}, 400)

        city = City.query.filter_by(id=id).first()
        if not city:
            return make_response({'error': 'city not found'}, 404)
        db.session.delete(city)
        db.session.commit()
        return make_response(f"deleted ok", 200)


api.add_resource(CityById, '/cities/<int:id>')


class CityNotes(Resource):
    def get(self):
        try:
            notes = [note.to_dict() for note in CityNote.query.all()]
            if not notes:
                return make_response({'error': 'no notes exist'}, 404)
            return make_response(
                notes,
                200,
                {"Content-Type": "application/json"}
            )
        except Exception as e:
            return make_response({'message': 'Something went wrong!', 'stackTrace': e}, 400)

    def post(self):
        data = request.get_json()
        user_val = User.query.filter_by(email=data['val_user_email']).first()
        if user_val.id != data['user_id']:
            return make_response({'error': 'permissions mismatch'}, 400)
        try:
            newCityNote = CityNote(
                note_body=data['note_body'],
                note_type=data['note_type'],
                city_id=data['city_id'],
            )
            db.session.add(newCityNote)
            db.session.commit()
        except Exception as errors:
            return make_response({"errors": [errors.__str__()]}, 422)
        return make_response(newCityNote.to_dict(), 201)


api.add_resource(CityNotes, '/citynotes')


class CityNotesById(Resource):
    def get(self, id):
        cityNote = CityNote.query.filter_by(id=id).first()
        if not cityNote:
            return make_response({'error': 'City Note not found'}, 404)
        return make_response(cityNote.to_dict(), 200, {"Content-Type": "application/json"})

    def patch(self, id):
        data = request.get_json()
        cityNote = CityNote.query.filter_by(id=id).first()
        user_val = User.query.filter_by(email=data['val_user_email']).first()
        if user_val.id != data['user_id']:
            return make_response({'error': 'permissions mismatch'}, 400)
        if not cityNote:
            return make_response({'error': 'City Note not found'}, 404)
        try:
            for attr in data:
                setattr(cityNote, attr, data[attr])
            db.session.add(cityNote)
            db.session.commit()
        except Exception as ex:
            return make_response({'error': [ex.__str__()]}, 422)
        return make_response(cityNote.to_dict(), 202)

    def delete(self, id):
        data = request.get_json()
        user_val = User.query.filter_by(email=data['val_user_email']).first()
        if user_val.id != data['user_id']:
            return make_response({'error': 'permissions mismatch'}, 400)

        cityNote = CityNote.query.filter_by(id=id).first()
        if not cityNote:
            return make_response({'error': 'City Note not found'}, 404)
        db.session.delete(cityNote)
        db.session.commit()
        return make_response(f"deleted ok", 200)


api.add_resource(CityNotesById, '/citynotes/<int:id>')


class Locations(Resource):
    def get(self):
        try:
            locations = [location.to_dict()
                         for location in Location.query.all()]
            if not locations:
                return make_response({'error': 'no locations exist'}, 404)
            return make_response(
                locations,
                200,
                {"Content-Type": "application/json"}
            )
        except Exception as e:
            return make_response({'message': 'Something went wrong!', 'stackTrace': e}, 400)

    def post(self):
        data = request.get_json()
        user_val = User.query.filter_by(email=data['val_user_email']).first()
        if user_val.id != data['user_id']:
            return make_response({'error': 'permissions mismatch'}, 400)
        if data['date_visited'] is None:
            date_v = data['date_visited']
        else:
            date_v = datetime.strptime(
                data['date_visited'], "%Y-%m-%dT%H:%M:%S.%fZ")
        try:
            new_loc = Location(
                location_name=data['location_name'],
                category=data['category'],
                avg_cost=data['avg_cost'],
                google_map_url=data['google_map_url'],
                website=data['website'],
                date_visited=date_v,
                rating=data['rating'],
                user_id=data['user_id'],
                city_id=data['city_id']
            )
            db.session.add(new_loc)
            db.session.commit()
        except Exception as errors:
            return make_response({"errors": [errors.__str__()]}, 422)
        return make_response(new_loc.to_dict(), 201)


api.add_resource(Locations, '/locations')


class LocationById(Resource):
    def get(self, id):
        location = Location.query.filter_by(id=id).first()
        if not location:
            return make_response({'error': 'Location not found'}, 404)
        return make_response(location.to_dict(), 200, {"Content-Type": "application/json"})

    def patch(self, id):
        data = request.get_json()
        location = Location.query.filter_by(id=id).first()
        user_val = User.query.filter_by(email=data['val_user_email']).first()
        if user_val.id != data['user_id']:
            return make_response({'error': 'permissions mismatch'}, 400)
        if not location:
            return make_response({'error': 'Location not found'}, 404)
        try:
            for attr in data:
                setattr(location, attr, data[attr])
            db.session.add(location)
            db.session.commit()
        except Exception as ex:
            return make_response({'error': [ex.__str__()]}, 422)
        return make_response(location.to_dict(), 202)

    def delete(self, id):
        data = request.get_json()
        user_val = User.query.filter_by(email=data['val_user_email']).first()
        if user_val.id != data['user_id']:
            return make_response({'error': 'permissions mismatch'}, 400)

        location = Location.query.filter_by(id=id).first()
        if not location:
            return make_response({'error': 'location not found'}, 404)
        db.session.delete(location)
        db.session.commit()
        return make_response(f"deleted ok", 200)


api.add_resource(LocationById, '/locations/<int:id>')


class LocationNotes(Resource):
    def get(self):
        try:
            notes = [note.to_dict() for note in LocationNote.query.all()]
            if not notes:
                return make_response({'error': 'no notes exist'}, 404)
            return make_response(
                notes,
                200,
                {"Content-Type": "application/json"}
            )
        except Exception as e:
            return make_response({'message': 'Something went wrong!', 'stackTrace': e}, 400)

    def post(self):
        data = request.get_json()
        user_val = User.query.filter_by(email=data['val_user_email']).first()
        if user_val.id != data['user_id']:
            return make_response({'error': 'permissions mismatch'}, 400)
        try:
            newLocationNote = LocationNote(
                note_body=data['note_body'],
                location_id=data['location_id'],
            )
            db.session.add(newLocationNote)
            db.session.commit()
        except Exception as errors:
            return make_response({"errors": [errors.__str__()]}, 422)
        return make_response(newLocationNote.to_dict(), 201)


api.add_resource(LocationNotes, '/locationnotes')


class LocationNotesById(Resource):
    def get(self, id):
        location_note = LocationNote.query.filter_by(id=id).first()
        if not location_note:
            return make_response({'error': 'Location note not found'}, 404)
        return make_response(location_note.to_dict(), 200, {"Content-Type": "application/json"})

    def patch(self, id):
        data = request.get_json()
        location_note = LocationNote.query.filter_by(id=id).first()
        user_val = User.query.filter_by(email=data['val_user_email']).first()
        if user_val.id != data['user_id']:
            return make_response({'error': 'permissions mismatch'}, 400)
        if not location_note:
            return make_response({'error': 'Location Note not found'}, 404)
        try:
            for attr in data:
                setattr(location_note, attr, data[attr])
            db.session.add(location_note)
            db.session.commit()
        except Exception as ex:
            return make_response({'error': [ex.__str__()]}, 422)
        return make_response(location_note.to_dict(), 202)

    def delete(self, id):
        data = request.get_json()
        user_val = User.query.filter_by(email=data['val_user_email']).first()
        if user_val.id != data['user_id']:
            return make_response({'error': 'permissions mismatch'}, 400)

        location_note = LocationNote.query.filter_by(id=id).first()
        if not location_note:
            return make_response({'error': 'location note not found'}, 404)
        db.session.delete(location_note)
        db.session.commit()
        return make_response(f"deleted ok", 200)


api.add_resource(LocationNotesById, '/locationnotes/<int:id>')

if __name__ == '__main__':
    app.run(port=8000, debug=True)
