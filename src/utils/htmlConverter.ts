import showdown from "showdown";

const htmlConverter = (md: string): string => {
  const converter = new showdown.Converter();
  return converter.makeHtml(md);
};

export default htmlConverter;
