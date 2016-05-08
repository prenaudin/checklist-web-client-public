import React from 'react';
import { shallow } from 'enzyme';

import Icon from 'components/Utils/Icon';

const getComponentSample = () => shallow(<Icon id="share" />);

describe('<Icon />', () => {
  it('renders icon as svg tag', () => {
    const wrapper = getComponentSample();
    expect(wrapper.type()).to.equal('svg');
    expect(wrapper.hasClass('icon')).to.equal(true);
  });

  it('renders a use tag to target svg sprites', () => {
    const wrapper = getComponentSample().childAt(0);
    expect(wrapper.type()).to.equal('use');
    expect(wrapper.is('[xlinkHref]')).to.equal(true);
    expect(wrapper.props().xlinkHref).to.match(/\.svg#icon-share$/);
  });
});
