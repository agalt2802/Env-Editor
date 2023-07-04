const format = require("date-format");

exports.replaceTodayIntoTheString = (instr) => {
    try {
      let destinationfile = instr;
      const regexpFormat = /\%[\w\s\-\:]+\%/g;
      const matchedarray = instr.match(regexpFormat);
      let date = new Date();
  
      if (matchedarray != null && matchedarray.length == 1) {
        destinationfile = instr.replace(
          regexpFormat,
          format(matchedarray[0].replaceAll("%", ""), date)
        );
      }
      return destinationfile;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };