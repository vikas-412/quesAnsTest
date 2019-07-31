import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from "./server.service";

@Injectable({
  providedIn: 'root'
})
export class CheckRoleService {

  constructor(private Server: ServerService, private router: Router) { }

  // isAdminVar : boolean = true;

  public isAdmin = async () => {
    let isAdminVar = false;
    await this.Server.checkRole().subscribe((res) => {
      console.log(res);
      let dataIn = JSON.stringify(res);
      let dataOut = JSON.parse(dataIn);
      if (dataOut.role !== "Admin") {
        isAdminVar = false;
        this.router.navigate(['/start']);
        // alert("Only an Admin can access this page");        
      } else {
        isAdminVar = true;
      }
    })
    return isAdminVar;
  }
}
