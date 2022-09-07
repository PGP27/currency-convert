interface SelectProps {
  defaultValue: string;
  options: string[];
}

export type SelectModel = JSX.IntrinsicElements['div'] & SelectProps;
