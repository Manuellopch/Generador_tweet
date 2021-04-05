//variables
const ListaTweets = document.getElementById('lista-tweets');
//Event Listeners
eventListeners();
function eventListeners(){
     //cuando se envia al formulario
     document.querySelector('#formulario').addEventListener('submit', agregarFormulario);
     //borrar tweets
     ListaTweets.addEventListener('click', borrarTweet);
     //Cargar de LocalStorage al DOOM
     document.addEventListener('DOMContentLoaded', CargarLocalStorage);
}
//funciones
//agregar formulario

function agregarFormulario(e){
     e.preventDefault();
     //crear boton de eliminar
    const botonBorrar = document.createElement('a')
    botonBorrar.classList = 'boton-borrar'
    botonBorrar.innerText = ' X'
     //leer el valor de textArea
     const tweet = document.getElementById('tweet').value;
     //crear elemento y añadir contenido a la lista
     const li = document.createElement('li');
     li.innerText  = tweet;
     //para mandarlo al doom
     //añade el boton borrar al tweet
     li.appendChild(botonBorrar);
     //añade el tweet a la lista
     ListaTweets.appendChild(li);
     //añadir a local storage
     agregarTweetLocalStorage(tweet);
}
// borrar tweet
function borrarTweet(e){
     e.preventDefault();
     if(e.target.className === 'boton-borrar'){
          e.target.parentElement.remove();
          borrarTweetLocalStorage(e.target.parentElement.innerText);
     }
}
//Cargar datos de LocalStorage
function CargarLocalStorage(){
     let tweets2;
     tweets2 = comprobarContenido();
     tweets2.forEach(function(tweet){
          const botonBorrar = document.createElement('a');
          botonBorrar.classList = 'boton-borrar';
          botonBorrar.innerText = ' X';
          //crear elemento y añadir contenido a la lista
          const li = document.createElement('li');
          li.innerText  = tweet;
          //para mandarlo al doom
          //añade el boton borrar al tweet
          li.appendChild(botonBorrar);
          //añade el tweet a la lista
          ListaTweets.appendChild(li);
     });
}
//añadir local storage
function agregarTweetLocalStorage(tweet){
     let tweets;
     //llama funcion
     tweets = comprobarContenido();
     //Mete elementos al array
     tweets.push(tweet);
     // convierte de string a array para local storage
     localStorage.setItem('tweet',  JSON.stringify(tweets));
}
//comprobar contenido de local storage
function comprobarContenido(){
     let tweets1;
     if(localStorage.getItem('tweet') === null){
          tweets1 = [];
     }else{
          tweets1= JSON.parse(localStorage.getItem('tweet'));
     }
     return tweets1;
}
//eliminar de local storage
function borrarTweetLocalStorage(tweet){
     let tweets3;
     let tweetborrar;
     //ELIMINA LA X DEL TWEET
     tweetborrar = tweet.substring(0, tweet.length - 2);
     tweets3 = comprobarContenido();
     tweets3.forEach(function(tweet, index){
          if(tweetborrar === tweet){
               tweets3.splice(index, 1);
          }
     });
     localStorage.setItem('tweet', JSON.stringify(tweets3));
}
