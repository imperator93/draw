//REMINDER! if want to use arrays add this "|| str.char(i) != "]"" inside the if statement condition part

export const GetValidJson = (str: string): string => {
  for (let i = str.length - 1; i > 0; i--) {
    if (str.charAt(i) != "}") {
      str = str.substring(i, -1);
    } else break;
  }
  return str;
};
