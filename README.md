# signalk-datetime
SignalK Node Server Plugin that maps the output of the Linux `date` command to a Signal K path.

This plugin periodically executes the `date` command (every `Update rate` seconds) and writes the stdout to the user defined Signal K path.  The plugin accepts formatting options (hints below) to allow the user to define exactly how they would like the value to appear (useful for direct display on a dashboard).  Additionally, the format options field can be set to the string `null` to display the default output style that resembles `"Wed 15 Sep 2021 08:17:10 AM PDT"`.  

By default, the plugin outputs local 24-hour time like `13:52:10` to the conventional Signal K path `environment.time` once per second. 
https://signalk.org/specification/1.5.0/doc/vesselsBranch.html#vesselsregexpenvironmenttime  


### Date/Time Formatting Options
https://man7.org/linux/man-pages/man1/date.1.html
```
       FORMAT controls the output.  Interpreted sequences are:

       %%     a literal %

       %a     locale's abbreviated weekday name (e.g., Sun)

       %A     locale's full weekday name (e.g., Sunday)

       %b     locale's abbreviated month name (e.g., Jan)

       %B     locale's full month name (e.g., January)

       %c     locale's date and time (e.g., Thu Mar  3 23:05:25 2005)

       %C     century; like %Y, except omit last two digits (e.g., 20)

       %d     day of month (e.g., 01)

       %D     date; same as %m/%d/%y

       %e     day of month, space padded; same as %_d

       %F     full date; like %+4Y-%m-%d

       %g     last two digits of year of ISO week number (see %G)

       %G     year of ISO week number (see %V); normally useful only
              with %V

       %h     same as %b

       %H     hour (00..23)

       %I     hour (01..12)

       %j     day of year (001..366)

       %k     hour, space padded ( 0..23); same as %_H

       %l     hour, space padded ( 1..12); same as %_I

       %m     month (01..12)

       %M     minute (00..59)

       %n     a newline

       %N     nanoseconds (000000000..999999999)

       %p     locale's equivalent of either AM or PM; blank if not known

       %P     like %p, but lower case

       %q     quarter of year (1..4)

       %r     locale's 12-hour clock time (e.g., 11:11:04 PM)

       %R     24-hour hour and minute; same as %H:%M

       %s     seconds since 1970-01-01 00:00:00 UTC

       %S     second (00..60)

       %t     a tab

       %T     time; same as %H:%M:%S

       %u     day of week (1..7); 1 is Monday

       %U     week number of year, with Sunday as first day of week
              (00..53)

       %V     ISO week number, with Monday as first day of week (01..53)

       %w     day of week (0..6); 0 is Sunday

       %W     week number of year, with Monday as first day of week
              (00..53)

       %x     locale's date representation (e.g., 12/31/99)

       %X     locale's time representation (e.g., 23:13:48)

       %y     last two digits of year (00..99)

       %Y     year

       %z     +hhmm numeric time zone (e.g., -0400)

       %:z    +hh:mm numeric time zone (e.g., -04:00)

       %::z   +hh:mm:ss numeric time zone (e.g., -04:00:00)

       %:::z  numeric time zone with : to necessary precision (e.g.,
              -04, +05:30)

       %Z     alphabetic time zone abbreviation (e.g., EDT)

       By default, date pads numeric fields with zeroes.  The following
       optional flags may follow '%':

       -      (hyphen) do not pad the field

       _      (underscore) pad with spaces

       0      (zero) pad with zeros

       +      pad with zeros, and put '+' before future years with >4
              digits

       ^      use upper case if possible

       #      use opposite case if possible

       After any flags comes an optional field width, as a decimal
       number; then an optional modifier, which is either E to use the
       locale's alternate representations if available, or O to use the
       locale's alternate numeric symbols if available.
```  

https://www.npmjs.com/package/dateformat
Mask options
```
d	Day of the month as digits; no leading zero for single-digit days. 	 
dd	Day of the month as digits; leading zero for single-digit days.  
ddd	Day of the week as a three-letter abbreviation.   
DDD	"Ysd", "Tdy" or "Tmw" if date lies within these three days. Else fall back to ddd.  
dddd	Day of the week as its full name.
DDDD	"Yesterday", "Today" or "Tomorrow" if date lies within these three days. Else fall back to dddd.
m	Month as digits; no leading zero for single-digit months.
mm	Month as digits; leading zero for single-digit months.
mmm	Month as a three-letter abbreviation.
mmmm	Month as its full name.
yy	Year as last two digits; leading zero for years less than 10.
yyyy	Year represented by four digits.
h	Hours; no leading zero for single-digit hours (12-hour clock).
hh	Hours; leading zero for single-digit hours (12-hour clock).
H	Hours; no leading zero for single-digit hours (24-hour clock).
HH	Hours; leading zero for single-digit hours (24-hour clock).
M	Minutes; no leading zero for single-digit minutes.
MM	Minutes; leading zero for single-digit minutes.
N	ISO 8601 numeric representation of the day of the week.
o	GMT/UTC timezone offset, e.g. -0500 or +0230.
p	GMT/UTC timezone offset, e.g. -05:00 or +02:30.
s	Seconds; no leading zero for single-digit seconds.
ss	Seconds; leading zero for single-digit seconds.
S	The date's ordinal suffix (st, nd, rd, or th). Works well with d.
l	Milliseconds; gives 3 digits.
L	Milliseconds; gives 2 digits.
t	Lowercase, single-character time marker string: a or p.
tt	Lowercase, two-character time marker string: am or pm.
T	Uppercase, single-character time marker string: A or P.
TT	Uppercase, two-character time marker string: AM or PM.
W	ISO 8601 week number of the year, e.g. 4, 42
WW	ISO 8601 week number of the year, leading zero for single-digit, e.g. 04, 42
Z	US timezone abbreviation, e.g. EST or MDT. For non-US timezones, the GMT/UTC offset is returned, e.g. GMT-0500
'...', "..."	Literal character sequence. Surrounding quotes are removed.
UTC:	Must be the first four characters of the mask. Converts the date from local time to UTC/GMT/Zulu time before applying the mask. The "UTC:" prefix is removed.
```

Named Formats
```
Name	Mask	Example
default	ddd mmm dd yyyy HH:MM:ss	Sat Jun 09 2007 17:46:21
shortDate	m/d/yy	6/9/07
paddedShortDate	mm/dd/yyyy	06/09/2007
mediumDate	mmm d, yyyy	Jun 9, 2007
longDate	mmmm d, yyyy	June 9, 2007
fullDate	dddd, mmmm d, yyyy	Saturday, June 9, 2007
shortTime	h:MM TT	5:46 PM
mediumTime	h:MM:ss TT	5:46:21 PM
longTime	h:MM:ss TT Z	5:46:21 PM EST
isoDate	yyyy-mm-dd	2007-06-09
isoTime	HH:MM:ss	17:46:21
isoDateTime	yyyy-mm-dd'T'HH:MM:sso	2007-06-09T17:46:21+0700
isoUtcDateTime	UTC:yyyy-mm-dd'T'HH:MM:ss'Z'	2007-06-09T22:46:21Z
```

Javascript Options key examples:  
```
day:
The representation of the day.
Possible values are "numeric", "2-digit".
weekday:
The representation of the weekday.
Possible values are "narrow", "short", "long".
year:
The representation of the year.
Possible values are "numeric", "2-digit".
month:
The representation of the month.
Possible values are "numeric", "2-digit", "narrow", "short", "long".
hour:
The representation of the hour.
Possible values are "numeric", "2-digit".
minute: The representation of the minute.
Possible values are "numeric", "2-digit".
second:
The representation of the second.
Possible values are "numeric", 2-digit".
```

jQuery format
```
Date and time patterns
yy = short year
yyyy = long year
M = month (1-12)
MM = month (01-12)
MMM = month abbreviation (Jan, Feb ... Dec)
MMMM = long month (January, February ... December)
d = day (1 - 31)
dd = day (01 - 31)
ddd = day of the week in words (Monday, Tuesday ... Sunday)
E = short day of the week in words (Mon, Tue ... Sun)
D - Ordinal day (1st, 2nd, 3rd, 21st, 22nd, 23rd, 31st, 4th...)
h = hour in am/pm (0-12)
hh = hour in am/pm (00-12)
H = hour in day (0-23)
HH = hour in day (00-23)
mm = minute
ss = second
SSS = milliseconds
a = AM/PM marker
p = a.m./p.m. marker
```

## Future Ideas and Considerations 
 - If the vessel is equipped with GPS and already has time and date from GNSS positioning system, perhaps we could subscribe to that path and remap the ISO 8601 datetime string value to a new user-definable path with the applied formatting.  
 - Both GNSS positioning system time and Linux `date` can be used together, with the preferred source definable by the user.
