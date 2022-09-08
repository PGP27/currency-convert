import { OptionModel } from '~/model/Option.model';

export interface SelectModel {
  defaultValue: OptionModel;
  options: OptionModel[];
  onChange(currentOption: OptionModel): any;
}
