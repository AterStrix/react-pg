import { render } from '@testing-library/react';

import ReactPgFeatureGameDetail from './react-pg-feature-game-detail';

describe('ReactPgFeatureGameDetail', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactPgFeatureGameDetail />);
    expect(baseElement).toBeTruthy();
  });
});
