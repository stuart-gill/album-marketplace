//this manages the application's relationship with Firebase

import { Injectable } from "@angular/core";
import { Album } from "./album.model";
import {
  AngularFireDatabase,
  FirebaseListObservable
} from "angularfire2/database";

@Injectable()
export class AlbumService {
  albums: FirebaseListObservable<any[]>;

  constructor(private database: AngularFireDatabase) {
    this.albums = database.list("albums");
  }

  getAlbums() {
    return this.albums;
  }

  addAlbum(newAlbum: Album) {
    this.albums.push(newAlbum);
  }

  getAlbumById(albumId: string){
    return this.database.object('/albums/' + albumId);
  }


  //this function takes the local version of the Album as an argument-- ie, the live edited one
  //then it finds the corresponding entry in firebase, and updates it
  updateAlbum(localUpdatedAlbum){
    var albumEntryInFirebase = this.getAlbumById(localUpdatedAlbum.$key);
    albumEntryInFirebase.update({title: localUpdatedAlbum.title,
                                artist: localUpdatedAlbum.artist,
                                description: localUpdatedAlbum.description});
  }
}

