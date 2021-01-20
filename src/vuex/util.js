export const forEach = (object = {}, fn) => {
    Object.keys(object).forEach((key) => {
        fn(object[key], key);
    });
}