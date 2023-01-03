import './sections/alternate-main-product';
import './sections/alternate-header';

import {load} from '@shopify/theme-sections';

import Burger from './components/burger';
import Counter from './components/counter';

document.addEventListener('DOMContentLoaded', () => {
  load('*');

  new Burger().init();
  new Counter().init();
});
