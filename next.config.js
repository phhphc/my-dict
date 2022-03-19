module.exports = {
  reactStrictMode: true,
  env: {
    MONGODB_URI: "mongodb+srv://mainguyenbinh32:F7MzcweQAdD6tJs@test.zi9ln.mongodb.net/tmp-dict?retryWrites=true&w=majority"
  },
  async rewrites() {
    return [
      {
        source: '/cambridge/:word*',
        destination: 'https://dictionary.cambridge.org/dictionary/english/:word*',
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/ctf',
        destination: 'http://flag:3000/flag',
        permanent: true,
      },
    ]
  },
}