import { Component, inject } from '@angular/core';
import { ListaService } from '../lista.service';
import { Observable } from 'rxjs';
import { Usluga } from '../../models/usluga';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {
  private readonly listaService = inject(ListaService);
  public dane$: Observable<Usluga[]> = this.listaService.get();
  public fraza: string = '';

  odswiez(): void {
    this.dane$ = this.listaService.get();
    this.fraza = ''; 
  }

  usun(id: number): void {
    this.listaService.delete(id).subscribe(() => this.odswiez());
  }

  filtruj(): void {
    const trimmed = this.fraza.trim();
    if (trimmed === '') {
      this.odswiez();
    } else {
      this.dane$ = this.listaService.getFiltrowane(trimmed);
    }
  }
}
