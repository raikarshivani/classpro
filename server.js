var express=require('express');
var hbs=require('hbs');//handle bar allows access of data sent to the client on the html page {{title}} 
var path=require('path');
var bodyParser = require('body-parser');
//user model
var usersController=require('./controllers/users');//for userdefined js files
var app=express(); //creates express server

app.set('views',path.join(__dirname,'views'));
app.set('view engine','html');
app.engine('html',hbs.__express);
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
        {
        extended:false
        }));

app.use(express.static('public'));//allows access to public folder's files by just specifying the route in the browser

//routes
app.get('/', function (request,response){
    var user=usersController.getUser(request.params.id);
    response.render('index',{
        title:"Home",
        users:usersController.getUsers});
});

app.get('/users/:id', function (request,response){
    var user=usersController.getUser(request.params.id);
    response.render('profile',{   //allows to send data to client
        title:"User Profile",    
        user:user});
});
app.get('/login', function (request,response){

    response.render('Login',{
        title:"Login"});
});
app.get('/about', function (request,response){

    response.render('about',{
        title:"About"});
});

app.get('/signup', function (request,response){

    response.render('SignUp',{
        title:"SignUp"});
});

app.post('/login',usersController.postLogin);

app.listen(3000);//listens at port 3000 on the server