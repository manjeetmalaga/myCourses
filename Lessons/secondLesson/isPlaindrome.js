function isPalinDrome(string) {
    const reverse = string.split('').reverse().join('');    
    const isPalinDrome = (string === reverse);
    const result = isPalinDrome ? `${string} is a Palindrome` : `${string} is not a Palindrome`;
    return result;
};

exports.isPalinDrome = isPalinDrome;