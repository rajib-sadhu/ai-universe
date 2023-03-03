const array = ["11/1/2022", "2/1/2023", "12/1/2021", "9/1/2021", "3/1/2021"];

const date = [];

for( const d of array ){
    const data = new Date(d);
    const milliseconds = data.getTime(); 
    // console.log(milliseconds);
    date.push(milliseconds)
}



// arr.sort();

// console.log(arr)


// 2022-10-31T18:30:00.000Z
// 2023-01-31T18:30:00.000Z
// 2021-11-30T18:30:00.000Z
// 2021-08-31T18:30:00.000Z
// 2021-02-28T18:30:00.000Z


const arr1 = [ 'rajiv', 'antar', 'jhankar' ];

const value = arr1.map(val => val);

console.log(  value.join(' <bal> '))






