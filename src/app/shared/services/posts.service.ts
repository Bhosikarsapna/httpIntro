import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Ipost, IresPost } from '../interfaces/posts.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { delay, map, Observable, tap } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  postUrl : string = `${environment.baseUrl}/posts.json`
  constructor(
    private _htttpClient : HttpClient,
    private _loaderService : LoaderService
  ) { }


  // ################### CREATE OR POST NEWOBJ WITH POSTMETHOD ###################

  addNewPost(postObj : Ipost):Observable<IresPost>{
    return this._htttpClient.post<IresPost>(this.postUrl, postObj) // url(posturl) and obj in post
  }

  // ################## GET ALL POSTDATA USING GETMETHOD ###################

  getAllPosts():Observable<any>{
    this._loaderService.loadingStatus$
    .next(true)
     return this._htttpClient.get<Array<Ipost>>(this.postUrl) // url(posturl)
                              .pipe(
                                tap(res => {console.log(res)}),
                                delay(1500),
                                map((res : any) => {
                                  let postArr : Array<Ipost> = [];

                                  for (const key in res) {
                                    postArr.push({...res[key], id : key})
                                  }
                                  // console.log(postArr);
                                  
                                  


                                  return postArr
                                
                                }))
  }


// ################### GET SINGLEPOST DATA USING GETMETHOD #################

  getSinglePost(id:string):Observable<Ipost>{
    // let headers = new HttpHeaders()
    //              .set('content-type', 'application/json') // append
    //              .set('authtest', 'JWT TOKEN') // when we use firebase then dont use authorization

                //  .set('Authorization', '  JWT TOKEN')
    let singlePostUrl = `${environment.baseUrl}/posts/${id}.json`
    // return this._htttpClient.get<Ipost>(singlePostUrl, {
    //   headers : headers
    // })   // url(deleteurl)

    return this._htttpClient.get<Ipost>(singlePostUrl)
  }

  // ################### UPDATE DATA USING PATCHMETHOD ################## 

  updatedPostObj(updateObj:Ipost, updateId : string):Observable<Ipost>{
    let updatedUrl = `${environment.baseUrl}/posts/${updateId}.json`
    return this._htttpClient.patch<Ipost>(updatedUrl, updateObj)       // url(updateurl, updatedobj)
  }

  // ################# DELETE POST USING DELETEMETHOD #################

  deletePost(deleteId : string):Observable<null>{
  let deleteUrl = `${environment.baseUrl}/posts${deleteId}.json`
  return this._htttpClient.delete<null>(deleteUrl)                  // url(deleteurl)
  }
}
