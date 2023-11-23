import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Criado por: Matias Ribeiro <b><a href="https://github.com/matiasribeiro" target="_blank">github</a></b> 2022
    </span>
    <div class="socials">
      <a href="https://github.com/matiasribeiro" target="_blank" class="ion ion-social-github"></a>
      <a href="https://linkedin.com/in/matiasribeiro" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {
}
