import * as moment from "moment";

export const dateFormatter = (time: Date) => {
  return moment.utc(time).format("YYYY-MM-DD");
};
