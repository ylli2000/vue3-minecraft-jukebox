String.prototype.toUpperCaseWords = function () {
  //use valueOf() to get the primitive value of a String object
  const str = this.valueOf()
  return (str + '').replace(/^([a-z])|\s+([a-z])/g, ($1) => $1.toUpperCase())
}
