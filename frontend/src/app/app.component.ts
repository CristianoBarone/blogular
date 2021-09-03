import { Component } from '@angular/core';
import { AxiosStatic } from 'axios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'blog';

  public axios = require('axios').default;

  public APIUrl = "";

  public axiosConfig = {
    crossdomain: true ,
    headers: {'Access-Control-Allow-Origin': '*', "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS", "Access-Control-Allow-Headers": "*"}
  };
  
}
