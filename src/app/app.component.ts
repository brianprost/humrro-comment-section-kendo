import { Component, Renderer2, ViewChild } from '@angular/core';
import { TextAreaComponent } from '@progress/kendo-angular-inputs';
import { NotificationService } from '@progress/kendo-angular-notification';

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
                        <div class="k-text-base">{{msg.message}}</div>
                    </div>
                    <span class="k-font-weight-bold">1h</span>
                </div>
            </div>
            <div class="k-panel">
                <kendo-avatar [imageSrc]=""></kendo-avatar>
                <kendo-textarea [style.width.px]="700" resizable="auto" [(ngModel)]="textAreaValue">
                    <kendo-textarea-suffix class="custom-suffix">
                        <button aria-label="Photo" kendoButton fillMode="clear" icon="photo"></button>
                        <button aria-label="Camera" kendoButton fillMode="clear" icon="camera"></button>
                        <kendo-dropdownlist [data]="itemStates" style="width: 150px;" [(ngModel)]="itemStatus">Item state</kendo-dropdownlist>
                        <span class="k-flex-1"></span>
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

  public commenterIndex = 0;
  public firstContactImage =
    'https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg';
  public secondContactImage =
    'https://demos.telerik.com/kendo-ui/content/web/Customers/GOURL.jpg';
  public textAreaValue =
    'Hi James, thanks for contacting our support team. Please, use our ticket system with the specific problem you have and we will get back to you with a solution.';
  public itemStatus = 'Open';
  public messages = [
    {
      name: 'James',
      image: this.secondContactImage,
      message: 'Hi, I just finished my first item. How does it look?',
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

  public itemStates = [
    'Open',
    'Looks good',
    'Pure shit, revise',
    'This item is a fireable offense.',
  ];
  constructor(
    public renderer: Renderer2,
    private notificationService: NotificationService
  ) {}

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
    // let person = this.people[Math.floor(Math.random() * 2)];
    let person = this.people[this.commenterIndex];
    this.messages.push({
      name: person.name,
      image: person.image,
      message: msg,
    });
    this.commenterIndex++;
    this.show(this.itemStatus);
  }

  public show(itemStatus: string): void {
    this.notificationService.show({
      content: `Item status set to ${itemStatus}!`,
      cssClass: 'button-notification',
      animation: { type: 'slide', duration: 400 },
      position: { horizontal: 'center', vertical: 'bottom' },
      type: { style: 'success', icon: true },
      closable: true,
    });
  }
}
