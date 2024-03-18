import { Component, OnInit } from '@angular/core';
import { Diagnostico } from '../../Models/diagnosticoDTO';
import { DiagnosticoServiceService } from '../../Service/diagnostico-service.service';

@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.component.html',
  styleUrls: ['./diagnostico.component.css']
})
export class DiagnosticoComponent implements OnInit {
  diagnosticos: Diagnostico[] = [];

  constructor(private diagnosticoService: DiagnosticoServiceService) {}

  ngOnInit(): void {
    this.loadDiagnostico();
  }

  loadDiagnostico(): void {
    this.diagnosticoService.getAll().subscribe(
      diagnosticos => {
        this.diagnosticos = diagnosticos;
        console.log(this.diagnosticos);
      },
      error => {
        console.log('[!]:./diagnositos/GetAll', error);
      }
    );
  }
}
