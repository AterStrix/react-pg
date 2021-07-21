import { useForm } from 'react-hook-form';
import { TextField } from '@material-ui/core';

import { ReactHookFormController } from '@nx-playground/react-hook-form';
import './react-pg-feature-game-add.module.scss';

interface Game {
  name: string;
  image: string;
  description: string;
  price: number;
  rating: number;
  test: { rest: boolean };
}

export interface ReactPgFeatureGameAddProps {
  onSubmit: (...args: unknown[]) => unknown,
}

export function ReactPgFeatureGameAdd(props: ReactPgFeatureGameAddProps) {
  const { register, handleSubmit, control, trigger, formState, getValues } = useForm<Game>({
    mode: 'all',
    defaultValues: {
      name: '',
      image: '',
      description: '',
      price: undefined,
      rating: undefined,
      test: { rest: false },
    },
  });

  const onSubmit = (data: Game) => {
    console.log(control);
    props.onSubmit(data);
  };

  return (
    <div>
      <h1>Add user form</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <ReactHookFormController name="name" control={control} field={TextField} fieldParams={{ placeholder: 'Name' }} />
        {/* <TextField { ...register('name') } /> */}
        <input type="text" placeholder="Image" { ...register('image') } />
        <input type="text" placeholder="Description" { ...register('description') } />
        <input type="text" placeholder="Price" { ...register('price', { required: 'Test', valueAsNumber: true }) } />
        <input type="text" placeholder="Rating" { ...register('rating', { valueAsNumber: true }) } />
        <input {...{ type: 'checkbox' }} { ...register('test.rest', { validate: x => x || 'Touch this' }) } />
        <button>Save</button>
      </form>
      <div>{console.log(formState.errors)}</div>
    </div>
  );
}

export default ReactPgFeatureGameAdd;
