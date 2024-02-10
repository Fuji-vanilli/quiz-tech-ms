import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
  ngOnInit(): void {
    this.loadSidebar();
  }

  loadSidebar() {
    const humburger= document.querySelector("#toggle-btn");

    humburger?.addEventListener("click", function() {
      document.querySelector("#sidebar")?.classList.toggle("expand")
    });
  }

}
