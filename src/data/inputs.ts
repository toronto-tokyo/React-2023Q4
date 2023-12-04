interface IInputData {
  id: string;
  type: string;
  name: string;
  placeholder?: string;
  labelTitle: string;
  value?: string;
}

export const INPUTS: IInputData[] = [
  {
    id: '1',
    type: 'text',
    name: 'name',
    placeholder: 'Name',
    labelTitle: 'Name',
  },
  {
    id: '2',
    type: 'number',
    name: 'age',
    placeholder: 'Age',
    labelTitle: 'Age',
  },
  {
    id: '3',
    type: 'email',
    name: 'email',
    placeholder: 'email@post.com',
    labelTitle: 'Email',
  },
  {
    id: '4',
    type: 'password',
    name: 'password',
    placeholder: 'Password',
    labelTitle: 'Password',
  },
  {
    id: '5',
    type: 'password',
    name: 'password',
    placeholder: 'Confirm password',
    labelTitle: 'Confirm password',
  },
];
