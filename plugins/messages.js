// injecting MESSAGES to vue instance
import Vue from 'vue'

import {
  ERRORS,
  SUCCESS,
  INFO
} from '@/config/messages'

Vue.prototype.$ERRORS = ERRORS
Vue.prototype.$SUCCESS = SUCCESS
Vue.prototype.$INFO = INFO
