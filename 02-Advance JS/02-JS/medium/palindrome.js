function isPalindrome(str) {
  const normalizeStr = str.toLowerCase();

  const reversedStr = normalizeStr.split("").reverse().join("");

  return normalizeStr === reversedStr;
}

module.exports = isPalindrome;

console.log(isPalindrome("madam"));
console.log(isPalindrome("Nan"));
console.log(isPalindrome("Hello"));
