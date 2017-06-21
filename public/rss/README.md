# RSS EMBED

## Introduction

A relatively simple, yet useful, React / Redux application that displays
a Really Simple Syndication (RSS) feed in a format suitable for
digital signage. Designed to be embedded within an iframe.

## Installation

Prerequisites:

* [Node.js](https://nodejs.org/en/)
* [Yarn](https://yarnpkg.com/en/)

Download and expand into a directory. From within that direction run:

`yarn install`

## Usage

To test the application locally, run the following from the installation
directory.

`yarn start`

**note**: You will see a broken page symbol until you provide a URL to
a valid RSS feed (see documentation below).

To deploy into production, run the following from the installation directory.

`yarn build`

Serve up the contents of the  *dist* folder through a web server.

## Documentation

The application accepts URL parameters for its configuration.

*url* (**required**): The URL of the RSS feed, e.g.,
http://rss.cnn.com/rss/cnn_topstories.rss

*cycling*: The number of seconds to show each item; minimum and default
of 10 seconds.

*polling*: The number of seconds between polling of RSS feed; minimum and
default of 60 seconds.

*size*: The font size in pixels; minimum and default of 10 pixels.

*light*: Set to *true* for the light theme; default is dark theme.

*marquee*: Set to *true* from a horizontal scrolling marquee; default
is centered text.

*pub-dates*: Set to *true* to only show items with a publication date,
sort by publication date, and show their date; default is to show all
items in the order provided by the RSS feed with no date shown.

*max-age*: Only relevant when *pub-dates* is set. Only show items that
are more recent than *max-age* seconds; defaults to infinity.

*parse*: An advanced setting allowing you to parse the item's description
for the matching and relevant content. Value needs to be a valid regular
expression with a single capture.

**note**: Because regular expressions have a lot of special characters, you
will need to URL encode it.

The default is

`^([^<]+)`: Starting at the beginning match up until an angle bracket;
designed to strip off trailing HTML.

A possible value is:

`^([\S\s]*)`: Starting at the beginning match everything.

## Contributing

Submit bug of enhancement requests using the GitHub issues feature.

## Credits

John Tucker <mailto:john@larkintuckerllc.com>

## Contact

General questions and comments can be directed to <mailto:john@larkintuckerllc.com>.

## License

This project is licensed under the MIT License.
