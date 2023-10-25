export const getTagBg = (num) => {
  if (num % 5 === 0) {
    return "bg-peach";
  } else if (num % 4 === 0) {
    return "bg-[#e88382]";
  } else if (num % 3 === 0) {
    return "bg-[#faae66]";
  } else if (num % 2 === 0) {
    return "bg-[#8badec]";
  } else {
    return "bg-lavender";
  }
}