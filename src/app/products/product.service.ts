import { HttpBackend, HttpClient, HttpErrorResponse } from "@angular/common/http";
import {Injectable} from "@angular/core";
import { Observable, throwError } from "rxjs";
import {IProduct} from "./product";
import {catchError, map, tap} from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl = 'api/products/products.json'
  //the productUrl is just a fake url, used a json file instead to mimic a response from a server to simplify this lesson
  constructor(private http: HttpClient) {

  }
  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
  getProduct(id: number): Observable<IProduct> {
    return this.getProducts()
      .pipe(
        map((products: IProduct[]) => products.find(p => p.productId === id))
    );
  }
  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent){
      // a client side or network error occurred
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // backend returned an unsuccessful response
      // or response body may contain clues as what went wrong
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;

    }
    console.log(err.error.message);
    return throwError(errorMessage);
  }
}
