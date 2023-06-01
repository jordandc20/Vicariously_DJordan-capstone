from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from config import db
from sqlalchemy import UniqueConstraint, Index, func
###################### USER ######################


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, unique=True, nullable=False)
    username = db.Column(db.String, unique=True, nullable=False)
    travel_style = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    cities = db.relationship("City", backref='user',
                             cascade='all, delete, delete-orphan')
    locations = db.relationship(
        "Location", backref='user', cascade='all, delete, delete-orphan')

    # users=association_proxy('checkout_logs','user')

    serialize_rules = ( "-cities.locations.user","-cities.locations.avg_cost","-cities.locations.category","-cities.locations.date_visited","-cities.locations.google_map_url","-cities.locations.location_name","-cities.locations.location_notes","-cities.locations.rating","-cities.locations.website","-cities.locations.user_id","-cities.locations.city_id","-cities.city_notes.note_body","-cities.city_notes.note_type", "-locations", "-created_at", )


    @validates('email')
    def validate_email(self, key, value):
        if not value:
            raise ValueError('Email must be provided.')
        if '@' not in value or '.' not in value:
            raise ValueError('Invalid email syntax.')
        return value

    @validates('username')
    def validates_username(self, key, value):
        if not value:
            raise ValueError('value must be provided.')
        return value

    @validates('travel_style')
    def validates_travel_style(self, key, value):
        styles = ['Thrill-seeker', 'Foodie', 'Relaxer', 'Experiencer', 'Culture Seeker',
                  'Nature', 'Influencer', 'Party Animal', 'Shopper', 'Luxuriate']
        if value not in styles:
            raise ValueError(f'{value} not an allowed value for travel_style.')
        return value

    def __repr__(self):
        return f'<User {self.id} :: {self.username} | {self.email} | {self.travel_style}>'

###################### CITIES ######################


class City(db.Model, SerializerMixin):
    __tablename__ = 'cities'

    id = db.Column(db.Integer, primary_key=True)
    city_name = db.Column(db.String, nullable=False)
    country = db.Column(db.String, nullable=False)
    city_imgs = db.Column(db.PickleType)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    locations = db.relationship(
        "Location", backref='city', cascade='all, delete, delete-orphan')
    city_notes = db.relationship(
        "CityNote", backref='city', cascade='all, delete, delete-orphan')

    serialize_rules = ("-user", "-locations.city",
                       "-city_notes.city", "-locations.user", "-created_at", "-updated_at",)
    
    @validates('country','user_id','city_name')
    def validates_country(self, key, value):
        users = [user.id for user in User.query.all()]
        if not value:
            raise ValueError(f'{key} must be provided.')
        if key =='user_id':
            if value not in users:
                raise ValueError('user_id does not exist.')
        return value


    def __repr__(self):
        return f'<City {self.id} :: {self.city_name} | {self.country} | user: {self.user_id}>'
    
Index('user_city_country_index', func.lower(City.country),func.lower(City.city_name),City.user_id, unique=True)


###################### CITY NOTES ######################


class CityNote(db.Model, SerializerMixin):
    __tablename__ = 'cityNotes'

    id = db.Column(db.Integer, primary_key=True)
    note_body = db.Column(db.String, nullable=False)
    note_type = db.Column(db.String, nullable=False, default='Other')
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    city_id = db.Column(db.Integer, db.ForeignKey('cities.id'), nullable=False)

    serialize_rules = ("-city.city_notes", "-created_at", "-updated_at","-city_id",)

    @validates('note_body')
    def validates_nullable(self, key, value):
        if not value:
            raise ValueError(f'{key} must be provided.')
        return value

    @validates('city_id')
    def validates_city_id(self, key, value):
        cities = [city.id for city in City.query.all()]
        if not value:
            raise ValueError(f'{key} must be provided.')
        if value not in cities:
            raise ValueError('city_id does not exist.')
        return value

    @validates('note_type')
    def validates_note_type(self, key, value):
        note_types = ['Communication', 'Transportation', 'Other']
        if value not in note_types:
            raise ValueError(f'{value} not an allowed value for note_type.')
        return value

    def __repr__(self):
        return f'<City Note {self.id} :: {self.note_body} | {self.note_type} | city: {self.city_id}>'


###################### LOCATIONS ######################


class Location(db.Model, SerializerMixin):
    __tablename__ = 'locations'

    id = db.Column(db.Integer, primary_key=True)
    location_name = db.Column(db.String, nullable=False)
    date_visited = db.Column(db.DateTime)
    rating = db.Column(db.Integer)
    google_map_url = db.Column(db.String)
    website = db.Column(db.String)
    avg_cost = db.Column(db.Integer)
    category = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    city_id = db.Column(db.Integer, db.ForeignKey('cities.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    location_notes = db.relationship(
        "LocationNote", backref='location', cascade='all, delete, delete-orphan')

    serialize_rules = ("-city",
                       "-user", "-location_notes.location", "-created_at", "-updated_at",)

    @validates('category')
    def validates_category(self, key, value):
        categories = ['Shopping', 'Mart', 'FoodDrink',
                      'IndoorActivity', 'OutdoorActivity', 'Accommodation', 'Other']
        if value not in categories:
            raise ValueError(f'{value} not an allowed value for category.')
        return value

    @validates('location_name')
    def validates_nullable(self, key, value):
        if not value:
            raise ValueError(f'{key} must be provided.')
        return value

    @validates('avg_cost')
    def validates_avg_cost(self, key, value):
        styles = range(4)
        if value and value not in styles:
            raise ValueError(f'{value} not an allowed value for avg_cost.')
        return value

    @validates('rating')
    def validates_rating(self, key, value):
        styles = range(1,6)
        if value and value not in styles:
            raise ValueError(f'{value} not an allowed value for rating.')
        return value

    @validates('user_id')
    def validates_user_id(self, key, value):
        users = [user.id for user in User.query.all()]
        if value not in users:
            raise ValueError('user_id does not exist.')
        return value

    @validates('city_id')
    def validates_city_id(self, key, value):
        cities = [city.id for city in City.query.all()]
        if value not in cities:
            raise ValueError('city_id does not exist.')
        return value

    def __repr__(self):
        return f'<Location {self.id} :: {self.location_name} | city: {self.city_id} | user: {self.user_id}>'


###################### LOCATION NOTES ######################


class LocationNote(db.Model, SerializerMixin):
    __tablename__ = 'locationNotes'

    id = db.Column(db.Integer, primary_key=True)
    note_body = db.Column(db.String, nullable=False)
    # note_type = db.Column(db.String, nullable=False, default='Other')
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    location_id = db.Column(db.Integer, db.ForeignKey(
        'locations.id'), nullable=False)

    serialize_rules = ("-location",
                       "-created_at", "-updated_at","-location_id",)

    @validates('note_body')
    def validates_nullable(self, key, value):
        if not value:
            raise ValueError(f'{key} must be provided.')
        return value

    @validates('location_id')
    def validates_location_id(self, key, value):
        locations = [loc.id for loc in Location.query.all()]
        if value not in locations:
            raise ValueError('location_id does not exist.')
        return value

    def __repr__(self):
        return f'<Location Note {self.id} :: {self.note_body} | Location: {self.location_id} >'
