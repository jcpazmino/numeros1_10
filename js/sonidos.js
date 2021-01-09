function control_AudioCancion(){ 
    Audio_cancion.play();
    Audio_cancion.addEventListener('timeupdate',function(){
        currentTimeSg_cancion = Audio_cancion.currentTime;
    },false);
}
//****** sonidos */
var path_sonidos= "./sonidos/";
var Audio_cancion = document.createElement('audio');
Audio_cancion.src = path_sonidos+'cancion.mp3';
Audio_cancion.type = 'audio/mpeg';
var currentTimeSg_cancion;


var Audio_numeros = document.createElement('audio');
Audio_numeros.type = 'audio/mpeg';  
  
function sonidos(sonido){
    Audio_numeros.src = path_sonidos+sonido+".mp3";
    Audio_numeros.play();
}
