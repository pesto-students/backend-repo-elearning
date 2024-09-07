export class DateUtils {
    getCurrentDate(): Date {
      return new Date();
    }
  
    addDaysToDate(numberOfDays: number, date?: Date): Date {
      if (!date) {
        date = new Date();
      }
      date.setDate(date.getDate() + Number(numberOfDays));
      return date;
    }
  
    getNonBusinessDaysCount(startDate: Date, endDate: Date): number {
      let count = 0;
      const curDate = new Date(startDate.getTime());
      while (curDate <= endDate) {
        const dayOfWeek = curDate.getDay();
        if (dayOfWeek == 0) count++;
        curDate.setDate(curDate.getDate() + 1);
      }
      return count;
    }
  
    formatDate(date: Date): string {
      return date.toDateString();
    }
  
    /**
     *
     * @param date
     * @param params: { hours, minutes, seconds }
     * @returns
     */
    static addTimeToDate(
      date: Date,
      { days = 0, hours = 0, minutes = 0, seconds = 0 },
    ) {
      return new Date(
        date.getTime() +
          days * 86400000 +
          hours * 3600000 +
          minutes * 60000 +
          seconds * 1000,
      );
    }
  
    static convertDateToRedableString(date: Date | string): string {
      return new Date(date)
        .toISOString()
        .replace("T", " ")
        .replace(/\.\d{3}Z$/, "");
    }
  
    static getISOFormatedDate(date: Date) {
      return date.toISOString();
    }
  
    static getDiffInSec(fromDate: Date, toDate: Date) {
      let firstDate = new Date(fromDate).toLocaleString();
      let secondDate = new Date(toDate).toLocaleString();
  
      let differenceInTime =
        new Date(secondDate).getTime() - new Date(firstDate).getTime();
      let convertInMinute = Math.round(differenceInTime / 1000);
      return convertInMinute;
    }
  
    getDiffInDays(fromDate: Date, toDate: Date) {
      const oneDay = 1000 * 60 * 60 * 24;
      return Math.ceil((toDate.getTime() - fromDate.getTime()) / oneDay);
    }
  
    static subtractDaysFromDate(
      date: Date = new Date(),
      numberOfDays: number,
    ): Date {
      date.setDate(date.getDate() - Number(numberOfDays || 0));
      return date;
    }
  
    /**
     * The function `isDateAfter` compares two Date objects and returns true if the first date is after
     * the second date.
     * @param {Date} firstDate - A Date object representing the first date.
     * @param {Date} secondDate - The `secondDate` parameter is the date that you want to compare against
     * `firstDate` to determine if `firstDate` is after `secondDate`.
     * @returns The function `isDateAfter` returns a boolean value indicating whether the first date is
     * after the second date.
     */
    static isDateAfter(firstDate: Date, secondDate: Date): boolean {
      return new Date(firstDate).getTime() > new Date(secondDate).getTime();
    }
  }
  