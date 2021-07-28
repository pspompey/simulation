import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-settlement-feed',
  templateUrl: './settlement-feed.component.html',
  styleUrls: ['./settlement-feed.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SettlementFeedComponent implements OnInit {

  T:number = 0;           // Tiempo de simulación
  TF:number = 172800;     // Tiempo final de la simulación
  M:number = 0;           // Contador de Tiempo Auxiliar, indica la hora
  DAY:number = 1;         // Contador de Tiempo Auxiliar, indica el día L-M-X-J-V
  RPP:number = 0;         // Registros que están a la espera de procesamiento
  MYL:number = 0;         // Mayor lag en la cola de movimientos 
  MNL:number = 999999999; // Menor lag en la cola de movimientos
  RPM:number = 5000;      // Request Por Minuto
  CI:number = 1;          // Cantidad de Instancias Disponibles
  EG:boolean = true;      // Estado del Generador
  STA:number = 0;         // Sumatoria Tiempo Apagado del Generador
  ITA:number = 0;         // Intervalo de Tiempo Apagado del Generador
  TMP:number = 0;         // Tiempo máximo que el generador estuvo pausado
  THL:number = 600000000; // Threshold high lag 
  TLL:number = 300000000; // Threshold low lag
  PTP:number = 0;         // Porcentaje de tiempo que los generadores estuvieron pausados
  mu:number = 7158.9;     // Parámetro mu de Gumbel Min
  sigma:number = 1035.7;  // Parámetro sigma de Gumbel Min
  beta:number = 8142.1;   // Parámetro beta de Burr
  alpha:number = 8.505;   // Parámetro alpha de Burr
  k:number = 3.7347;      // Parámetro k de Burr
  betaW:number = 1810.3;  // Parámetro beta de Weibull
  alphaW:number = 1.3831; // Parámetro alpha de Weibull
  omegaW:number = 832.84; // Parámetro omega de Weibull

  isSimulated:boolean = false;
  data: Set<number> = new Set<number>();
  public chartDatasets: Array<any> = [];
  constructor() { }

  ngOnInit(): void {
    this.init();
  }

  init(){
    this.T = 0;           
    this.TF = 172800;      
    this.M = 0;
    this.DAY = 1;                    
    this.RPP = 0;         
    this.MYL = 0;          
    this.MNL = 999999999; 
    this.EG = true;     
    this.STA = 0;         
    this.ITA = 0;         
    this.TMP = 0;  
    this.PTP = 0;
    this.isSimulated = false;
    this.chartDatasets = [];
    this.data.clear();
  }

  simulation(instancias: any, thl: any, tll: any){

    this.CI = Number.parseInt(instancias);
    this.THL = Number.parseInt(thl);
    this.TLL = Number.parseInt(tll);
    this.init();

    do{
      this.T++;
      this.M++;

      let x = Math.random();
      if(this.DAY == 4 && this.M > 540){
        this.RPP += Math.trunc(Math.pow(Math.pow(1-x, -1/this.k)-1,1/this.alpha)*this.beta);
      }else{
        if(this.M > 540){
          this.RPP += Math.trunc(-Math.log(-Math.log(x))*this.sigma + this.mu);
        }else{
          this.RPP += Math.trunc(Math.pow(-Math.log(1-x), 1/this.alphaW)*this.betaW + this.omegaW);
        }
      }
    
      if(this.RPP > this.MYL){
        this.MYL = this.RPP;
      }

      if(this.RPP < this.MNL){
        this.MNL = this.RPP;
      }

      if(this.RPP > this.CI*this.RPM){
        this.RPP -= this.CI*this.RPM;
        if(this.RPP > this.THL && this.EG){
          this.EG = false;
          this.ITA = this.T;
        }else{
          this.onEG();
        }
      }else{
        this.RPP = 0;
        this.onEG();
      }

      this.data.add(this.RPP);

      if(this.M == 1440){
        this.M = 0;
        this.DAY = this.DAY == 5 ? 1: this.DAY+1;
      }

    }while(this.T < this.TF)

    if(!this.EG){
      this.STA += this.T - this.ITA;
      this.TMP = this.T - this.ITA;
    }

    this.PTP = Number.parseFloat((this.STA*100/this.T).toFixed(2));
    this.chartDatasets.push({data: this.data, label: 'Hola'})
    this.isSimulated = true;
  }


  onEG() {
    if (this.RPP < this.TLL && !this.EG) {
      this.EG = true;
      this.STA += this.T - this.ITA;
      if (this.T - this.ITA > this.TMP) {
        this.TMP = this.T - this.ITA;
      }
    }
  }

}
