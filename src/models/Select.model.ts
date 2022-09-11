export interface OptionProps {
  value: string;
  label: string;
}

export interface SelectedCurrencyProps {
  from: OptionProps;
  to: OptionProps;
}

export interface SelectModel {
  value: OptionProps;
  options: OptionProps[];
  onChange(currentOption: OptionProps): any;
}
