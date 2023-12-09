from flask import Flask ,jsonify ,request
from flask_cors import CORS       # del modulo flask_cors importar CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from sqlalchemy.orm import sessionmaker

app=Flask(__name__)  # crear el objeto app de la clase Flask
CORS(app) #modulo cors es para que me permita acceder desde el frontend al backend


# configuro la base de datos, con el nombre el usuario y la clave
app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://Pablo2311:capopablo01@Pablo2311.mysql.pythonanywhere-services.com/Pablo2311$proteccionistas'
# URI de la BBDD                          driver de la BD  user:clave@URLBBDD/nombreBBDD
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False #none
db= SQLAlchemy(app)   #crea el objeto db de la clase SQLAlquemy
ma=Marshmallow(app)   #crea el objeto ma de de la clase Marshmallow


# defino las tablas
class Animales(db.Model):   # la clase Animales hereda de db.Model
    id=db.Column(db.Integer, primary_key=True)   #define los campos de la tabla
    nombre=db.Column(db.String(100))
    raza=db.Column(db.String(100))
    sexo=db.Column(db.String(100))
    edad=db.Column(db.String(100))
    refugio=db.Column(db.String(100))
    contacto=db.Column(db.String(100))
    imagen=db.Column(db.String(400))
    def __init__(self,nombre,raza,sexo,edad,refugio,contacto,imagen):   #crea el  constructor de la clase
        self.nombre=nombre   # no hace falta el id porque lo crea sola mysql por ser auto_incremento
        self.raza=raza
        self.sexo=sexo
        self.edad=edad
        self.refugio=refugio
        self.contacto=contacto
        self.imagen=imagen

class Users(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    nombre=db.Column(db.String(100))
    apellido=db.Column(db.String(100))
    email=db.Column(db.String(255))
    contrasena=db.Column(db.String(100))
    isAdmin=db.Column(db.Boolean)
    def __init__(self,nombre,apellido,email,contrasena,isAdmin):
        self.nombre=nombre
        self.apellido=apellido
        self.email=email
        self.contrasena=contrasena
        self.isAdmin=isAdmin


    #  si hay que crear mas tablas , se hace aqui




with app.app_context():
    Session = sessionmaker(bind=db.engine)
    session = Session()
    db.create_all()  # aqui crea todas las tablas
#  ************************************************************
class AnimalesSchema(ma.Schema):
    class Meta:
        fields=('id','nombre','raza','sexo','edad','refugio','contacto','imagen')

class UsersSchema(ma.Schema):
    class Meta:
        fields=('id','nombre','apellido','email','contrasena','isAdmin')

animal_schema=AnimalesSchema()            # El objeto Animal_schema es para traer un animal
animales_schema=AnimalesSchema(many=True)  # El objeto Animales_schema es para traer multiples registros de animales
user_schema=UsersSchema()            # El objeto Users_schema es para traer un usuario




# crea los endpoint o rutas (json)
isLogged = False
isAdmin = False

@app.route('/register', methods=['POST']) # crea ruta o endpoint
def register():
    try:
        print(request.json)
        nombre = request.json['nombre']
        apellido = request.json['apellido']
        email = request.json['email']
        contrasena = request.json['password']
        isAdmin = request.json.get('isAdmin')

        new_user = Users(nombre, apellido, email, contrasena, isAdmin)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "Registration successful"}), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"message": "Internal Server Error"}), 500

@app.route('/login', methods=['POST'])  # crea ruta o endpoint
def login():
    print(request.json)
    email = request.json['email']
    password = request.json['contrasena']

    user = Users.query.filter_by(email=email).first()

    if user and user.contrasena == password:
        global isLogged
        isLogged = True
        print(isLogged)
        #if user.isAdmin:
        #    global isAdmin
        #    isAdmin = True
        #    print(isAdmin)
        #return user_schema.jsonify(user)
        global isAdmin
        isAdmin = user.isAdmin  # Get the isAdmin status from the user object
        print(isAdmin)

        return jsonify({
            'success': True,
            'user': {
                'id': user.id,
                'nombre': user.nombre,
                'apellido': user.apellido,
                'email': user.email,
                'isAdmin': isAdmin
            }
        }), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401

@app.route('/login/status',methods=['GET'])
def get_status():
    global isLogged
    global isAdmin
    return jsonify({
        'isLogged': isLogged,
        'isAdmin': isAdmin
        }), 200

@app.route('/logout',methods=['GET'])
def logout():
    global isLogged
    isLogged = False
    global isAdmin
    isAdmin = False
    return jsonify({
        'isLogged': isLogged,
        'isAdmin': isAdmin
        }), 200


@app.route('/adopciones',methods=['GET'])
def get_animales():
    all_Animales=Animales.query.all()         # el metodo query.all() lo hereda de db.Model
    result=animales_schema.dump(all_Animales)  # el metodo dump() lo hereda de ma.schema y
                                                 # trae todos los registros de la tabla
    return jsonify(result)                       # retorna un JSON de todos los registros de la tabla




@app.route('/adopciones/<id>',methods=['GET'])
def get_animal(id):
    animal=Animales.query.get(id)
    return animal_schema.jsonify(animal)   # retorna el JSON de un producto recibido como parametro


@app.route('/adopciones/<id>',methods=['DELETE'])
def delete_animal(id):
    animal=Animales.query.get(id)
    db.session.delete(animal)
    db.session.commit()                     # confirma el delete
    return animal_schema.jsonify(animal) # me devuelve un json con el registro eliminado


@app.route('/adopciones', methods=['POST']) # crea ruta o endpoint
def create_animal():
    #print(request.json)  # request.json contiene el json que envio el cliente
    nombre=request.json['nombre']
    raza=request.json['raza']
    sexo=request.json['sexo']
    edad=request.json['edad']
    refugio=request.json['refugio']
    contacto=request.json['contacto']
    imagen=request.json['imagen']
    new_animal=Animales(nombre,raza,sexo,edad,refugio,contacto,imagen)
    db.session.add(new_animal)
    db.session.commit() # confirma el alta
    return animal_schema.jsonify(new_animal)

@app.route('/adopciones/<id>' ,methods=['PUT'])
def update_animal(id):
    animal=Animales.query.get(id)

    animal.nombre=request.json['nombre']
    animal.raza=request.json['raza']
    animal.sexo=request.json['sexo']
    animal.edad=request.json['edad']
    animal.refugio=request.json['refugio']
    animal.contacto=request.json['contacto']
    animal.imagen=request.json['imagen']


    db.session.commit()    # confirma el cambio
    return animal_schema.jsonify(animal)    # y retorna un json con el animal

@app.route('/')
def hello_world():
    return 'Hello from Flask!'

# programa principal *******************************
if __name__=='__main__':  
    app.run(debug=True, port=5000)    # ejecuta el servidor Flask en el puerto 5000