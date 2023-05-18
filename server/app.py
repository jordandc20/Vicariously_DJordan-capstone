#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response
from flask_restful import Resource
from datetime import datetime, timedelta
# Local imports
from config import app, db, api
from models import User, City, CityNote, Location, LocationNote


class Home(Resource):
    def get(self):
        return make_response({'message': 'Hello World!'}, 202)


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


class UserById(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        if not user:
            return make_response({'error': 'User not found'}, 404)
        return make_response(user.to_dict(), 200, {"Content-Type": "application/json"})


api.add_resource(UserById, '/users/<int:id>')


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


api.add_resource(Cities, '/cities')


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


api.add_resource(CityNotes, '/citynotes')


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
        print(data['date_visited'] )
        if data['date_visited'] is None:
            date_v =     data['date_visited']
        else:
            date_v =   datetime.strptime(data['date_visited'], "%Y-%m-%dT%H:%M:%S.%fZ")
            print(date_v)
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
                # due_date=datetime.utcnow() + timedelta(days=14)
            )
            db.session.add(new_loc)
            db.session.commit()
        except Exception as errors:
            return make_response({"errors": [errors.__str__()]}, 422)
        # new_loc_dict = {
        #     "user_id": new_loc.user_id,
        #     "due_date": new_loc.due_date,
        #     "book_id": new_loc.book_id,
        #     "id": new_loc.id
        # }

        return make_response(new_loc.to_dict(), 201)
#   const date = new Date(book.due_date);
#             // console.log(date.toLocaleString('en-US'))


api.add_resource(Locations, '/locations')


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


api.add_resource(LocationNotes, '/locationnotes')


if __name__ == '__main__':
    app.run(port=5555, debug=True)
