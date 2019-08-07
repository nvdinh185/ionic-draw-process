import { Component, Input } from '@angular/core';

@Component({
  selector: 'draw-process',
  templateUrl: 'draw-process.html'
})
export class DrawProcessComponent {
  @Input() amount: number;
  @Input() process: number;

  amount1;
  process1;

  constructor() { }

  graphColor = {
    statusColor: "#309030",
    backgroundColor: "#E0E0E0",
    progressColor: "#EEEEEE"
  };

  ngOnInit() {
    this.amount1 = this.amount ? this.amount : 0;
    this.process1 = this.process ? this.process : 0;
    this.initUI(this.amount1, this.process1);
  }

  I(id) { return document.getElementById(id); }

  initUI(percent?: number, progress?: number, colors?: {
    statusColor: string,
    backgroundColor: string,
    progressColor: string
  }) {
    if (colors) this.graphColor = colors; //doi mau default
    //Vẽ cung tròn và thanh quá trình
    this.drawMeter(this.I("dlMeter"), percent ? percent : 0, progress ? progress : 0, colors);
    //Viết kết quả (bao nhiêu %)
    this.I("dlText").textContent = (percent ? percent * 100 : 0) + "%";
  }

  drawMeter(c, amount, progress, colors?: {
    statusColor: string,
    backgroundColor: string,
    progressColor: string
  }) {

    var myColors = (colors) ? colors : this.graphColor;

    var ctx = c.getContext("2d");
    var dp = window.devicePixelRatio || 1;
    var cw = c.clientWidth * dp, ch = c.clientHeight * dp;
    var sizScale = ch * 0.0055;
    if (c.width == cw && c.height == ch) {
      ctx.clearRect(0, 0, cw, ch);
    } else {
      c.width = cw;
      c.height = ch;
    }
    ctx.beginPath();
    ctx.strokeStyle = myColors.backgroundColor;
    ctx.lineWidth = 16 * sizScale;
    ctx.arc(c.width / 2, c.height - 58 * sizScale, c.height / 1.8 - ctx.lineWidth, -Math.PI * 1.1, Math.PI * 0.1);
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = myColors.statusColor;
    ctx.lineWidth = 16 * sizScale;
    ctx.arc(c.width / 2, c.height - 58 * sizScale, c.height / 1.8 - ctx.lineWidth, -Math.PI * 1.1, amount * Math.PI * 1.2 - Math.PI * 1.1);
    ctx.stroke();
    if (typeof progress !== "undefined") {
      ctx.fillStyle = myColors.progressColor;
      ctx.fillRect(c.width * 0.3, c.height - 16 * sizScale, c.width * 0.4 * progress, 4 * sizScale);
    }
  }

}
