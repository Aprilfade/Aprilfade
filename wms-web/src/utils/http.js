// src/utils/http.js

import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:8090', // 你的后端API地址
    timeout: 5000, // 请求超时时间
});

// 你还可以在这里添加请求拦截器和响应拦截器
// 例如，添加请求头、处理token等

export default http;