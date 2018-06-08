myApp.service('SongService', function($http){
    console.log('SongService engaged');
    
    let sv = this;
    sv.songs = [];

    sv.getSongs = function(){
        return $http({
            method: 'GET',
            url: '/song'
        }).then( function(response){
            sv.songs = response.data;
        }).catch( function(err){
            console.log('Error in GET', err); 
        });
    } //end sv.getSongs

    sv.postAlbum = function(artist, track, published){
        return $http({
            method: 'POST',
            url: '/song',
            data: {
                artist: artist,
                track: track,
                published: published,
                rank: 1
            }
        }).then(function(response){
            console.log('back from server with', response);          
        }).catch(function(err){
            console.log('Error in postAlbum', err);   
        });
    }//end sv.postAlbum

    sv.putRank = function(index){

        let songUp = sv.songs[index];
        console.log(songUp.id);
        
        return $http({
            method: 'PUT',
            url: `/song/${songUp.id}`,
            data: {
                rank: songUp.rank + 1
            }
        }).then(function(response){
            console.log('Back from server for PUT with', response);
        }).catch(function(err){
            console.log('Error in putRank', err); 
        });
    }//end sv.putRank

    sv.delete = function( index ){

        let songDelete = sv.songs[index];
        return $http({
            method: 'DELETE',
            url: `/song/${songDelete.id}`
        }).then( function(response){
            console.log('Back from Server DELETE with', response); 
        }).catch( function(err){
            console.log('Error in DELETE', err);        
        });
    }//end delete
});