exports.extract = ({ content, startMark, endMark }) => {
  const start = content.indexOf(startMark) + 1;
  const end = content.indexOf(endMark);

  return content
    .slice(start, end)
    .replace(/  +/g, '')
    .split(',');
};
