import { api, LightningElement, track } from "lwc";

export default class CustomCombobox extends LightningElement {
  @api name = "";
  @api label = "label";
  @api variant = "";

  @track c_options = [];
  @track c_value = [];
  @api width = "500px";
  //   @api width = "350px";
  @api height = "auto";
  //   @api height = "400px";
  @track
  IsListBoxVisible = false;
  @api
  title = "Title";
  @api
  itemList = [];
  @track
  itemListData = [];
  @track
  selectedItems = "All";

  get componentStyle() {
    return `width: ${this.width}; height: ${this.height};`;
  }

  @api
  get options() {
    return this.c_options;
  }
  set options(value) {
    this.setAttribute("options", value);
    this.c_options = value;
    this.setup();
  }

  @api
  get value() {
    return this.c_value;
  }
  set value(value) {
    this.setAttribute("value", value);
    this.c_value = value;
    this.setup();
  }

  connectedCallback() {
    this.setup();
  }

  setup() {
    console.log(this.c_options);
    let val = [];
    this.c_options.forEach((el, index) => {
      val.push({
        index: index,
        title: el.label,
        isSelected: this.c_value.find((element) => element === el.value)
          ? true
          : false
      });
      // return 0;
    });
    this.itemListData = val.length > 0 ? JSON.parse(JSON.stringify(val)) : [];
  }

  handleSelectBoxClick() {
    this.IsListBoxVisible = !this.IsListBoxVisible;
  }

  handleItemClick(e) {
    // console.log(e.currentTarget.dataset.id);
    let index = e.currentTarget.dataset.id;
    this.itemListData[index] = {
      ...this.itemListData[index],
      isSelected: !this.itemListData[index].isSelected
    };

    let changeValue = [];
    this.itemListData.forEach((el, indexN) => {
      if (el.isSelected) {
        changeValue.push(this.c_options[indexN].value);
      }
    });
    const custEvent = new CustomEvent("change", {
      detail: { value: JSON.parse(JSON.stringify(changeValue)) }
    });
    this.dispatchEvent(custEvent);
  }
  handleCancelButtonClick() {
    this.IsListBoxVisible = !this.IsListBoxVisible;
    const custEvent = new CustomEvent("cancelclick", {
      detail: "cancel"
    });
    this.dispatchEvent(custEvent);
  }
  handleApplyButtonClick() {
    let dataValue = "";
    this.itemListData.map((item) => {
      if (item.isSelected) {
        dataValue = dataValue + (dataValue.length > 0 ? ", " : "") + item.title;
      }
      return 0;
    });
    this.selectedItems = dataValue.length > 0 ? dataValue : "All";
    const custEvent = new CustomEvent("applyclick", {
      detail: JSON.parse(JSON.stringify(this.itemListData))
    });
    this.dispatchEvent(custEvent);
  }
}
