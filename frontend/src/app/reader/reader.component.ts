import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']
})
export class ReaderComponent implements OnInit {

  constructor(private route:ActivatedRoute, private app:AppComponent) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=> {
      let id = params['id'];
      this.app.axios.get(this.app.APIUrl+'/get/article/'+ id, this.app.axiosConfig).then((response:any) => {
        if (response.status == 200) {
          document.getElementById("title")!.innerText = response.data.title
          document.getElementById("content")!.insertAdjacentHTML("afterend", response.data.content)
          return;
        } 
      }).catch((err: any) => {

        if (err) {
          document.getElementById("br")!.insertAdjacentHTML("afterend", `
            <h1 style="
              font-size: 9em;
              margin-bottom: 0;
              font-weight: 900;
              color: #555;
              text-align: center;
              font-family: 'Roboto';
            ">
              ;(
            </h1>
            <p style="
              text-align: center;
              color: white;
            ">
                I couldn't find what you were looking for
            </p>
          `)
          document.getElementById("reader")!.remove();
          return;
        }

        return;
      })
    })
  }

}
