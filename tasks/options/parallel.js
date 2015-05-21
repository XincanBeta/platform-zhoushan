/**
 * tasks 数组
 *
 */
module.exports = {
  dev: {
    options: {
      stream: true
    },
    tasks: [{
      grunt: true,
      args: ['watch:frontend']
    }]
  }
}
