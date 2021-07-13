import { LightningElement, track } from "lwc";

export default class CustomMultiSelectComboBoxDemo extends LightningElement {
  @track value = ["option1"];

  get options() {
    return [
      { label: "Ross Test Name", value: "option1" },
      { label: "Rachel Test Name", value: "option2" },
      { label: "Rachel Test Name1", value: "option3" },
      { label: "Rachel Test Name2", value: "option4" },
      { label: "Rachel Test Name3", value: "option5" }
    ];
  }

  handleChange(e) {
    this.value = e.detail.value;
    console.log(this.value);
  }
  handleApply(e) {
    this.value = e.detail.value;
    console.log(this.value);
  }
  handleCancel(e) {
    this.value = e.detail.value;
    console.log(this.value);
  }
}
