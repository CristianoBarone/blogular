import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route:ActivatedRoute, private app:AppComponent) { }

  ngOnInit(): void {
      this.app.axios.get(this.app.APIUrl+'/get/articles', this.app.axiosConfig).then((response:any) => {
        if (response.status == 200) {
          document.getElementById('container')?.insertAdjacentHTML("afterend", `
                <style>
                 .read {
                    width: 90%;
                    background-color: white;
                    color: black;
                    padding: 2.5%;
                    border-radius: 25px;
                    text-align: justify;
                  }

                  a {
                    text-decoration: none;
                    color: black;
                  }
                </style>
            `);
          for (let i = 0; i < response.data.length; i++) {
            let article = response.data[i]
            document.getElementById('container')?.insertAdjacentHTML("beforeend", `
                <a href="/read/${article.id}"> <div class="read"> <h1>${article.title}</h1> <hr /> <h4>${article.abstract}</h4> </div>  </a> <br /> <br />
            `);
          }
          document.getElementById("title")!.innerText = response.data.title
          document.getElementById("content")!.insertAdjacentHTML("afterend", response.data.content)
          return;
        } 
      }).catch((err: any) => {

        return;
        
      })
  }

}
