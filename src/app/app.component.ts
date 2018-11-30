import { User } from './user';
import { ApiService } from './api.service';
import { Component } from '@angular/core';
import { htmlAstToRender3Ast } from '@angular/compiler/src/render3/r3_template_transform';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  debugger;
  title = 'angular-report-damages';

  users: User[];

  constructor(private apiService: ApiService) { }

  login(username: string, password: string): void {
    debugger;
    if(!username || !password){
      return;
    }
    this.apiService.getToken({ username, password } as User);
  };
}
