let BASE_URL = ''
const TIME_OUT = 10000

if (process.env.NODE_EVN === 'development') {
  BASE_URL = 'http://123.207.32.32:8000/'
} else if (process.env.NODE_EVN === 'production') {
  BASE_URL = 'http://123.207.32.32:8000/'
} else {
  BASE_URL = 'http://123.207.32.32:8000/'
}

export { BASE_URL, TIME_OUT }
