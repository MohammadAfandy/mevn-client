const path = require('path')

module.exports = {
	outputDir: path.resolve(__dirname, '../server/public'),
	devServer: {
		proxy: {
			'/api/node': {
				target: 'http://localhost:5000',
				pathRewrite: {
					'/node': ''
				}
			},
			'/api/go': {
        target: 'http://localhost:9000',
        pathRewrite: {
					'/go': ''
				}
			}
		}
	}
}