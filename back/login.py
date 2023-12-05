import json

usuarios = []

def menu():
    print("""** Menú ** 
    Sesión sin iniciar
    1. Crear usuario
    2. Iniciar sesión
    3. Salir""")
    opcion = input("Opción>>> ")
    if opcion == "1":
        crear_usuario()
    elif opcion == "2":
        iniciar_sesion()
    elif opcion == "3":
        salir()
    else:
        print("¡¡Opción inválida!!")
        menu()

# Función para crear usuarios y contraseñas        
def crear_usuario():
    usuario = input("Ingrese usuario: ")
    contrasena = input("Ingrese contraseña: ")

    nuevo_usuario = {
        "usuario": usuario,
        "contrasenia": contrasena
    }

    usuarios.append(nuevo_usuario)
    
    guardar_usuarios()
    print("Usuario creado exitosamente")
    input("ENTER para continuar >>> ")
    menu()

# Función para iniciar sesión
def iniciar_sesion():
    usuario = input("Ingrese usuario: ")
    intentos = 3
    while intentos > 0:
        contrasena = input("Ingrese contraseña (3 intentos): ")
        for usuario_json in usuarios:
            if usuario_json["usuario"] == usuario and usuario_json["contrasenia"] == contrasena:
                print("¡Ingreso Exitoso!")
                input("ENTER para continuar >>> ")
                return
        intentos -= 1
        print(f"Usuario o contraseña inválida. Te quedan {intentos} intentos")
       
    menu()

# Función para salir
def salir():
    guardar_usuarios()
    print("Gracias por utilizar nuestra app")

def guardar_usuarios():
    with open("usuarios.json", "w") as archivo:
        json.dump(usuarios, archivo, indent=4)

def cargar_usuarios():
    try:
        with open("usuarios.json", "r") as archivo:
            return json.load(archivo)
    except FileNotFoundError:
        return []

# Cargar los usuarios desde el archivo JSON al inicio
usuarios = cargar_usuarios()

menu()