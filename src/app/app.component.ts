import { Component, ElementRef, ViewChild ,OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'CrudLocalStoragewithAngular';

  @ViewChild('myModal') model: ElementRef | undefined;
  studentObj: Student = new Student();
  studendList :Student[] = []

  ngOnInit()
  {
    const localData = localStorage.getItem('Angular17crud');
    if (localData != null)
    {
      this.studendList= JSON.parse(localData)
      }
  }
  openModel()
  {
   
    const model = document.getElementById("myModal");  
    if (model != null) {
      model.style.display = 'block';
      }
  }
  closedModel() {
     this.studentObj= new Student
    if(this.model != null ||this.model !== undefined)
      this.model.nativeElement.style.display = 'none';    
      

  }
  onEdit(item: Student)
  {
    this.studentObj = item;
    this.openModel();
  }

  updateStudent()
  {
    const CurrentRecord = this.studendList.find(m => m.id === this.studentObj.id)
    if(CurrentRecord != undefined){
      CurrentRecord.name = this.studentObj.name;
      CurrentRecord.address = this.studentObj.address;
      CurrentRecord.mobileno = this.studentObj.mobileno;
      CurrentRecord.email = this.studentObj.email;
      CurrentRecord.city = this.studentObj.city;
      CurrentRecord.state = this.studentObj.state;
      CurrentRecord.pincode = this.studentObj.pincode;
    };
    localStorage.setItem('Angular17crud', JSON.stringify(this.studentObj));
     this.closedModel()
  }

  onDelete(item:Student)
  {
    const isDelete = confirm("Are you sure want to delete ")
    if (isDelete)
    {
      const CurrentRecord = this.studendList.findIndex(m => m.id === this.studentObj.id)
      this.studendList.splice(CurrentRecord);
       localStorage.setItem('Angular17crud', JSON.stringify(this.studendList));
      }
  }
  SaveStudent() {
    debugger
    const isLocalPresent = localStorage.getItem("Angular17crud");
    if (isLocalPresent != null)
    { 
      const oldarr = JSON.parse(isLocalPresent);
      this.studentObj.id = oldarr.length + 1;
      oldarr.push(this.studentObj);
      this.studendList = oldarr;
      localStorage.setItem('Angular17crud', JSON.stringify(oldarr));
    }
    else {
      const newarr = [];
      newarr.push(this.studentObj);
      this.studentObj.id = 1;
      this.studendList = newarr;
      localStorage.setItem('Angular17crud', JSON.stringify(newarr));
    }
    this.closedModel()
}

}

export class Student{
  id: number;
  name : string;
  mobileno: string;
  email: string;
  city: string;
  state: string;
  address: string;
  pincode:string

  constructor() {
    this.id = 0;
    this.name = "";
    this.mobileno = "";
    this.email = "";
    this.city = "";
    this.state = "";
    this.address = "";
    this.pincode=""
  }
}