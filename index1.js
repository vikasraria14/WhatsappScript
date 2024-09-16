const wbm = require( 'wbm' );
const readExcel = require( 'read-excel-file/node' );
let users = [];

// readExcel( './public/numbers.xls' ).then( ( rows ) => {
//     console.log("helo", rows)
//     const keys = rows[0];
//     rows.shift();
//     rows.forEach( ( row ) => {
//         let user = {};
//       row.forEach( ( cell, index ) => {
//         user[ keys[index] ] = cell;
//       } );
//       users.push( user );
//     } );

//     sendMessage( users, 'hey {{name}}' );
//   } );

  const sendMessage = ( contacts, message ) => {
    console.log("wertyu", contacts, message)
    wbm.start( { showBrowser: false } )
       .then( async () => {
        await wbm.send( contacts, message );
        // await wbm.end();
    } )
       .catch( err => console.log(err) );
  }

  sendMessage(["+919501681423", "+919719947553"], "hi")