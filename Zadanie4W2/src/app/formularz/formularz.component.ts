import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaService } from '../lista.service';
import { FormsModule, NgForm } from '@angular/forms';
import { UslugaBody } from '../../models/usluga-body';

@Component({
  selector: 'app-formularz',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './formularz.component.html',
  styleUrl: './formularz.component.css'
})
export class FormularzComponent {
  public uslugaBody: UslugaBody = {
    wykonawca: '',
    rodzaj: '',
    rok: 2025,
    nazwa: ''
  };

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly listaService = inject(ListaService);
  private readonly router = inject(Router);
  private id?: number = undefined;

  constructor() {
    const urlID = this.activatedRoute.snapshot.paramMap.get('id');
    if(urlID != null) {
      this.id = +urlID;
      this.listaService.getByID(this.id).subscribe(res => {
        this.uslugaBody.wykonawca = res.wykonawca;
        this.uslugaBody.rodzaj = res.rodzaj;
        this.uslugaBody.rok = res.rok;
        this.uslugaBody.nazwa = res.nazwa;
      });
    }
  }

  onSubmit(form: NgForm): void {
    if(this.id != null) {
      this.listaService.put(this.id, this.uslugaBody).subscribe({
        next: () => this.router.navigateByUrl(''),
        error: (err) => console.error("wystąpił problem z edycją: ", err)
      })
    } else {
      this.listaService.post(this.uslugaBody).subscribe({
        next: () => this.router.navigateByUrl(''),
        error: (err) => console.error("wystąpił problem z dodawaniem: ", err)
      })
    }
  }

  onAnuluj(): void {
    this.router.navigateByUrl('');
  }
}
