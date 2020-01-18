import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import io from 'socket.io-client';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild("game", { static: false })
  private gameCanvas: ElementRef;

  private context: any;
  private socket: any;
  private ServerUrl = "http://localhost:3000";
  public ngOnInit() {
    this.socket = io("http://localhost:3000");
  }

  public ngAfterViewInit() {

    this.context = this.gameCanvas.nativeElement.getContext("2d");
    this.socket.on("position", position => {
      this.context.clearRect(
        0,
        0,
        this.gameCanvas.nativeElement.width,
        this.gameCanvas.nativeElement.height);
      this.context.fillStyle = this.getRandomColor();

      this.context.fillRect(position.x, position.y, 20, 20);
    });

  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  public move(direction: any) {
    this.socket.emit("move", direction);
  }
}
