import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss']
})
export class ProfileUserComponent {

  searchTerm: string='test term';

  onSearchChange(event: any) {
    this.searchTerm = event.target.value;
  }
}
