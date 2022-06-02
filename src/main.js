import { createApp } from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
    faVideo,
    faClock,
    faWifiStrong,
    faRepeat,
    faComment,
    faEnvelope,
    faPlay
} from "@fortawesome/free-solid-svg-icons";

library.add(faVideo, faClock, faWifiStrong, faRepeat, faComment, faEnvelope, faPlay);

createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
