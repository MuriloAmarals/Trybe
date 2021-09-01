const fatorial = number => {
    let total = 1;
    for (let i = 2; i <= number; i += 1) {
        total *= i;
    }
    return total;
}

console.log(fatorial(4));
