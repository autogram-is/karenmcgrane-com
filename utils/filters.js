module.exports = {
  json: function(value) {
    return '<pre><code>' + JSON.stringify(value, undefined, 2) + '</code></pre>'
  }
}
