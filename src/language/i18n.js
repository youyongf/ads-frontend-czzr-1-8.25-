import Vue from 'vue';
import VueI18n from 'vue-i18n'; //引入vue-i18n组件
// import store from '../store';
// import messages from './index';
import { getInitLocaleLanguage } from '@/utils';
Vue.use(VueI18n);

const localeLang = getInitLocaleLanguage();


const i18n = new VueI18n({
  fallbackLocale: localeLang,
  // silentFallbackWarn: true,
  globalInjection:true,
  legacy: true, // you must specify 'legacy: false' option
  locale: localeLang,
  messages: {},
});

export default i18n;
