function Library (props) {
  this.name = props.name;
  this.creator = props.creator;
  this.playlists = [];
}

Library.prototype.addPlaylist = function (playlist){
  this.playlists.push(playlist);
}

function Playlist (props) {
  this.name = props.name;
  this.tracks = [];
}

Playlist.prototype.addTrack = function (newTrack){
  this.tracks.push(newTrack);
}

Playlist.prototype.overallRating = function (){
  var sum = 0;
  for (var i = 0; i < this.tracks.length; i++){
    sum += this.tracks[i].rating;
  }
  var rating = Math.round(sum / this.tracks.length);
  return rating;
}

Playlist.prototype.totalDuration = function () {
  var sum = 0;
  for (var i = 0; i < this.tracks.length; i++){
    sum += this.tracks[i].length;
  };
  return sum;
}

function Track (props) {
  this.title = props.title;
  this.rating = props.rating;
  this.length = props.length;
}

lib1 = new Library({name: "My music library", creator: "Corky"});

playlist1 = new Playlist({name: "Classics"});
playlist2 = new Playlist({name: "Golden Oldies"});
playlist3 = new Playlist({name: "Ultra Angry Death Metal"});
playlist4 = new Playlist({name: "Kids Tunes"});

track1 = new Track({title: "Livin on a Prayer", rating: 1, length: 304});
track2 = new Track({title: "Hello", rating: 5, length: 290});
track3 = new Track({title: "YOLO", rating: 0, length: 314});
track4 = new Track({title: "Chrome", rating: 4, length: 423});
track5 = new Track({title: "Firefox", rating: 0, length: 404});
track6 = new Track({title: "Fiddlesticks", rating: 3, length: 168});
track7 = new Track({title: "Caboodle Noodle", rating: 5, length: 1892});
track8 = new Track({title: "Anaconda", rating:5, length: 80085});

lib1.addPlaylist(playlist1);
lib1.addPlaylist(playlist3);

playlist1.addTrack(track1);
playlist1.addTrack(track2);
playlist1.addTrack(track8);

playlist3.addTrack(track7);
playlist3.addTrack(track6);

playlist4.addTrack(track3);
playlist4.addTrack(track5);

console.log("My library:", lib1);
console.log("Playlist 1:", playlist1);
console.log("Playlist 4:", playlist4);
console.log("Playlist 1's Rating:", playlist1.overallRating());
console.log("Playlist 4's Rating:", playlist4.overallRating());
console.log("Playlist 1's Duration:", playlist1.totalDuration());
console.log("Playlist 2's Duration:", playlist2.totalDuration());
console.log("Playlist 3's Duration:", playlist3.totalDuration());
console.log("Playlist 4's Duration:", playlist4.totalDuration());
