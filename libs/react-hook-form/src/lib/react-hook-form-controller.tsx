import { JSXElementConstructor, ReactElement, ReactHTMLElement } from 'react';
import { Control, Controller, ControllerProps, RegisterOptions, useController, UseFormGetValues } from 'react-hook-form';
import './react-hook-form-controller.module.scss';

interface Field {
  onChange: unknown;
  onBlur: unknown;
  value: unknown;
  ref?: unknown;
  [key: string]: unknown;
}

type ControllerRules =  Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>

interface ReactHookFormProps {
  name: string;
  control: Control<any>;
  field: any;
  fieldParams?: unknown;
  render?: ControllerProps['render'];
  placeholder?: string;
}

interface ReactHookFormPropsWithValidators extends ReactHookFormProps {
  rules: ControllerRulesWithValidators;
  getValues: UseFormGetValues<never>;
}

interface ReactHookFormPropsWithoutValidators extends ReactHookFormProps {
  rules?: ControllerRules;
  getValues?: UseFormGetValues<never>;
}

export type Validator<T = unknown, U extends keyof T = never> = (value?: T[U], formValue?: T) => string|boolean;

export interface ControllerRulesWithValidators<T extends Record<string, unknown> = Record<string, unknown>, U extends string = ''> extends ControllerRules {
  validators?: Validator<T, U>[];
}

export type ReactHookFormControllerProps = ReactHookFormPropsWithoutValidators | ReactHookFormPropsWithValidators;

export function ReactHookFormController(props: ReactHookFormControllerProps) {
  const { field, fieldState: { error, isTouched, invalid } } = useController({
    name: props.name,
    control: props.control,
    rules: props.rules ?? { required: true },
  });

  let d;

  return (
    <Controller
      control={props.control}
      name={props.name}
      render={props.render || (({ field }) => (<>
        {props.field && (d = <props.field { ...field } { ...props.fieldParams } />)}
        {d}
      </>))}
    />
  );
}

export default ReactHookFormController;
