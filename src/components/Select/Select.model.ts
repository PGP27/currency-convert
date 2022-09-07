export interface OptionProps {
  value: string;
  label: string;
}

export interface SelectModel {
  defaultValue: OptionProps;
  options: OptionProps[];
  onChange(currentOption: OptionProps): any;
}
