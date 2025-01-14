function isAnagram(str1, str2) {
  const formatString = (str) =>
    str.replace(/[^\w]/g, "").toLowerCase().split("").sort().join("");

  return formatString(str1) === formatString(str2);
}

console.log(isAnagram("spar", "rasp"));
console.log(isAnagram("hello", "world"));
console.log(isAnagram("Listen", "Silent"));
console.log(isAnagram("The eyes", "They see"));
