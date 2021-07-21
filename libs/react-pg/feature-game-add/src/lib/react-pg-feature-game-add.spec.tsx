import { render } from '@testing-library/react';

import ReactPgFeatureGameAdd from './react-pg-feature-game-add';

describe('ReactPgFeatureGameAdd', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactPgFeatureGameAdd />);
    expect(baseElement).toBeTruthy();
  });
});
