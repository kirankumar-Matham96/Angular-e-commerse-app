import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, RouterModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  user: any = {
    name: '',
    email: '',
    phone: '',
    city: '',
  };

  ngOnInit() {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
  }

  saveProfile() {
    localStorage.setItem('user', JSON.stringify(this.user));

    alert('Profile saved successfully!');
  }
}
