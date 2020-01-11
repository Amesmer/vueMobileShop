import Vue from 'vue'

import { Button } from 'vant'
import { Tab, Tabs } from 'vant';
import { Uploader } from 'vant';
import { Image } from 'vant';
import { Lazyload } from 'vant';
import { Loading } from 'vant';
import { ImagePreview } from 'vant';
import { Field } from 'vant';
import { CellGroup } from 'vant';
import { Notify } from 'vant';

Vue.use(Notify);


Vue.use(Field);
Vue.use(CellGroup);

Vue.use(ImagePreview);

// options 为可选参数，无则不传
Vue.use(Lazyload);
Vue.use(Loading);

Vue.use(Image);

Vue.use(Uploader);

Vue.use(Tab).use(Tabs);

Vue.use(Button)
