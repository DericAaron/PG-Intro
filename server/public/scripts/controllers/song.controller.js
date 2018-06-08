let myApp = angular.module('myApp', []);

myApp.controller('SongController', function(SongService){
    console.log('SongController Engaged');
    
    let vm = this;
    vm.songs = [];


    vm.clearInput = function(){
        vm.artistIn = '';
        vm.trackIn = '';
        vm.dateIn = '';
    }//end clearInput

    vm.getSongs = function(){
        SongService.getSongs().then(function(){
            vm.songs = SongService.songs;
        }); 
    } //end getSongs

    vm.submit = function(){
        let date = '';
        if(vm.dateIn === ''){
            date = 'unknown';
        }else{
            date = vm.dateIn;
        }

        if(vm.artistIn === '' || vm.trackIn === ''){
            alert('Artist and Track Required');
        }else{
            SongService.postAlbum(vm.artistIn, vm.trackIn, date).then(function(){
                vm.getSongs();
                vm.clearInput();
            });
        }  
    } //end submit

    vm.rankUp = function( index ){
        SongService.putRank( index ).then(function(){
            vm.getSongs();
        });
    }//end rankUp

    vm.delete = function( index ){
        SongService.delete( index ).then(function(){
            vm.getSongs();
        });
    } //end Delete

    vm.getSongs();
});