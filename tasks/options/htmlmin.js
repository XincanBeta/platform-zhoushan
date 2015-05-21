/**
 * grunt-contrib-htmlmin
 *
 *
 * 历史代码：views/{,* /} * .html'
 */
module.exports = {
  dist: {
    options: {
      removeComments: true,
      collapseWhitespace: true,
      conservativeCollapse: true,
      collapseBooleanAttributes: true,
      removeCommentsFromCDATA: true,
      removeOptionalTags: true
    },
    files: [{
      expand: true,
      cwd: '<%= pkg.path.build %>',
      src: ['**/*.html'],
      dest: '<%= pkg.path.build %>'
    }]
  }
}

