import { Component, Renderer2, ViewChild } from '@angular/core';
import { TextAreaComponent } from '@progress/kendo-angular-inputs';

@Component({
  selector: 'my-app',
  styleUrls: ['styles.css'],
  template: `
        <div class="contact-form">
            <div *ngFor="let msg of messages" class="k-panel">
                <kendo-avatar [imageSrc]=msg.image></kendo-avatar>
                <div class="client-section">
                    <div class="client-name-message">
                        <span class="k-text-primary k-font-weight-bold">{{msg.name}}</span>
                        <div class="k-text-base">{{msg.message}}?</div>
                    </div>
                    <span class="k-font-weight-bold">1h</span>
                </div>
            </div>
            <div class="k-panel">
                <kendo-avatar [imageSrc]="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRetsi7nGedl7ewdpq1J1eJ_FPDIAnOQFZfEZDw6Le-YfgiQoA-JMTDQx9jlEh-8e1DKAY&usqp=CAU"></kendo-avatar>
                <kendo-textarea [style.width.px]="700" resizable="auto" [(ngModel)]="textAreaValue">
                    <kendo-textarea-suffix class="custom-suffix">
                        <button aria-label="Photo" kendoButton fillMode="clear" icon="photo"></button>
                        <button aria-label="Camera" kendoButton fillMode="clear" icon="camera"></button>
                        <span class="k-flex-1"></span>
                        <button
                            aria-label="Clear"
                            kendoButton
                            fillMode="clear"
                            icon="close-circle"
                            (click)="clearValue()"
                            class="button-opacity"
                        ></button>
                        <kendo-input-separator class="k-text-base"></kendo-input-separator>
                        <button aria-label="Send" kendoButton fillMode="clear" class="send-button" (click)="sendMessage(textAreaValue)">Send</button>
                    </kendo-textarea-suffix>
                </kendo-textarea>
            </div>
        </div>
    `,
})
export class AppComponent {
  @ViewChild(TextAreaComponent) public textarea: TextAreaComponent;

  public firstContactImage =
    'https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg';
  public secondContactImage =
    'https://demos.telerik.com/kendo-ui/content/web/Customers/GOURL.jpg';
  public textAreaValue =
    'Hi James, thanks for contacting our support team. Please, use our ticket system with the specific problem you have and we will get back to you with a solution.';
  public messages = [
    {
      name: 'James',
      image: this.secondContactImage,
      message:
        'Hi, I need some assistance with the installer, who should I turn to?',
    },
  ];

  public people = [
    {
      name: 'Chelsea',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/1200px-Chelsea_FC.svg.png',
    },
    {
      name: 'Quinn',
      image:
        'https://cdn.vox-cdn.com/thumbor/pHBJL8ahQkxp_a8oUINOlDQ62Pk=/0x0:1560x780/1200x800/filters:focal(693x266:941x514)/cdn.vox-cdn.com/uploads/chorus_image/image/57846439/harley.0.0.jpg',
    },
  ];
  constructor(public renderer: Renderer2) {}

  public clearValue(): void {
    this.textAreaValue = '';
  }

  ngAfterViewInit(): void {
    this.renderer.setAttribute(
      this.textarea.input.nativeElement,
      'aria-label',
      'Label'
    );
  }

  sendMessage(msg) {
    let person = this.people[Math.floor(Math.random() * 2)];
    this.messages.push({
      name: person.name,
      image: person.image,
      message: msg,
    });
  }
}
