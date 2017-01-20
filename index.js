var express=require('express');

var app=express();
var handlebars=require('express3-handlebars').create({defaultLayout:'main'});
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars')
app.set('port',process.env.PORT||3000);
app.use(express.static(__dirname+'/public'));
app.disable('x-powered-by');
var forturnes=["Conquer your fears or they will conquer you.",
				"Rivers nedd springs.",
				"Do not fear what you don't know.",
				"You will have a pleasnat surprise.",
				"Whenever possible,keep it simple.",
];

app.get('/',function (req,res) {
	res.render('home');
})

app.get('/about',function (req,res) {
	var randomFortune=forturnes[Math.floor(Math.random()*forturnes.length)];
	res.render('about',{fortune:randomFortune});
})

//404
app.use(function (req,res) {
	res.status(404);
	res.render('404');
});

//500
app.use(function (err,req,res,next) {
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'),function () {
	console.log('Express started on http://localhost:'+app.get('port')+'; press Ctrl-C to terminate');
});