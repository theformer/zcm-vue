import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建 axios 实例
const instance = axios.create({
    baseURL: 'http://192.168.1.2:18080',  // 确保 baseURL 是正确的
    timeout: 8000  // 请求超时设置
})

// 请求拦截器
instance.interceptors.request.use(config => {
    // 可在这里添加请求头或其他配置
    console.log('请求配置:', config)  // 查看请求配置
    return config
})

// 响应拦截器
instance.interceptors.response.use(
    res => res.data,  // 直接返回数据
    err => {
        // 统一错误提示
        if (err?.response?.data?.message) {
            ElMessage.error(err.response.data.message)
        } else {
            ElMessage.error('网络错误')
        }
        return Promise.reject(err)
    }
)

// 封装 GET 请求
export const get = (url, params = {}) => {
    return instance({
        method: 'get',
        url,
        params
    }).catch(error => {
        console.error('GET 请求错误:', error)  // 输出详细的错误信息
        throw error
    })
}

// 封装 POST 请求
export const post = (url, data = {}) => {
    return instance({
        method: 'post',
        url,
        data
    }).catch(error => {
        console.error('POST 请求错误:', error)  // 输出详细的错误信息
        throw error
    })
}

export default instance
