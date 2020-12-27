import {Component, EventEmitter, Input, Output } from '@angular/core'


@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponent {
    @Input() message: string;
    @Output() onCloseAlert = new EventEmitter<void>();

    onClose() {
        this.onCloseAlert.emit();
    }
}