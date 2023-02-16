//全局变量
let BASE_URL = ''
const TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'https://api.vvhan.com/api'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'https://api.vvhan.com/api/moyu'
} else {
  BASE_URL = 'https://api.vvhan.com/api/lolskin'
}

export { BASE_URL, TIME_OUT }
