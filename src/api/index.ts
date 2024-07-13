import http from '@/helpers/http';
import { ChatParams } from '@/types';

const api = {
  postMessage: (message: ChatParams) => {
    return http.post('/v1/generateText', { data: message });
  },
};

export default api;
