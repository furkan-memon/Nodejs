const fs = require('fs');

fs.unlink("02-fs-module/data.txt", (err) => {
  if (err) {
    // Proper error handling is essential in async callbacks
    console.error('Error deleting file:', err);
    return;
  }
  console.log('File deleted!');
});
