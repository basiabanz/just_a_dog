import { Component, Input } from "@angular/core";

@Component({
  selector: "dog-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.less"],
})
export class ButtonComponent {
  @Input() public btnTxt: string;
  @Input() public isActive: boolean;
}
