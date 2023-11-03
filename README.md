# Node-Cascaron

## Levantar el proyecto
1. npm i
2. crear .env y copiar los campos del archivo .example.env
3. revisar que mysql este levantado
4. verificar que la base de datos existe

##  Tecnologias Utilizadas
* Node
* Mysql
* Sequelize

# PARA CREAR UN TAG
  * git tag -a v0.0.2 -m "modulo 9 terminado"
  * git push --tags
# PARA QUITAR EL SEGUIMIENTO DEL GIT
  * git rm .env --cached
  * agregar el archivo al gitignore , luego add, and commit


# VARIABLES PARA CONFIGURAR "HEROKU"
  * heroku config  -> lista todas la variables de entorno
  * heroku config:set nombreVariable = "variable"  -> Crear variable
  * heroku config:get  -> listar las variables
  * heroku config:unset  nombreVariale  -> eliminar varibale
