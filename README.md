# Tynkki

ranssi.paivola.fi clone using [AngularJS 1.4](https://angularjs.org/), the SASS version of [the Bootstrap CSS framework](http://getbootstrap.com/css/) and [angular-ui-router](https://github.com/angular-ui/ui-router). Dependencies are managed with npm and the application is built and served to the browser using Node.js + Gulp + Express.

## Installation

First, you should have Node.js installed. Node is used in Tynkki to build the stylesheets for the application, and to serve it to the browser. Install the latest Node.js release from [the Node.js homepage](https://nodejs.org/en/), or from the package manager if you have Linux.

You should also have Git installed. Again, use the package manager in Linux, or get it from [the home page](https://git-scm.com/).

Both the git command line tools and node must be in PATH. In other platforms this is usually the case automatically, in Windows you might need to add the directory with `node.exe` and `npm.cmd` manually in Advanced system settings -> Environment variables.

Then, open a terminal (in Windows, Git Bash), and type:

    git clone https://github.com/ollisal/tynkki.git
    cd tynkki
    npm install -g gulp # if you don't have gulp already installed globally
    npm install
    gulp

Leave the terminal open, with gulp running. Now you should be able to access the application at [http://localhost:2806/](http://localhost:2806/).

## Structure

The application code resides in the `app` subdirectory with the following structure:

  - `app/index.html`: Entry point to the application, loads the Javascript code, the CSS stylesheet and has the global layout HTML.
  - `app/js`: Javascript code
  - `app/templates`: Angular template HTML for views and directives
  - `app/scss`: Stylesheet sources, preprocessed with [Sass](http://sass-lang.com/) to generate the CSS stylesheet used by the browser.
  - `app/scss/_bootstrap-variables.scss`: Settings for adjusting the look'n'feel of Bootstrap
  - `app/build`: Where the build system builds the resulting CSS stylesheet. Do not edit directly!

The `server` subdirectory has a minimalistic server implementation that serves the application to the browser at
[http://localhost:2806/](http://localhost:2806/) and implements the `posts` REST API (more details below).

The file `Gulpfile.js` contains the build system for the application. The default task, which can be run
by executing `gulp` anywhere in the project folder, builds the application's CSS stylesheet from the SCSS sources
and serves the application's files to the browser via the `server`. The stylesheet is rebuilt whenever
the SCSS source files are changed.

The `npm` package manager reads project dependencies from the `package.json` file and installs them when you type `npm install`.
Typically, one doesn't edit this file directly, but uses the `npm install --save <dep>` and `npm uninstall --save <dep>` commands
to install/uninstall dependency libraries and update the `package.json` file accordingly.

## `posts` REST API description ##

The server implements a minimal REST API for storing and retrieving posts for the lifetime of the server process. There are two
types of posts: a fixed set of persistent posts for the schedule, people etc sections linked from the navigation, and the normal
posts which can be created and deleted at will. All posts are accessed via the same API but persistent posts have some restrictions.
*No database is used, so changes are lost when the server is stopped or restarted!*

The available API methods are:

  * `GET /api/posts/`: loads minimal version of existing posts, without pizza list content. Persistent posts are not returned!
  * `POST /api/posts/`: creates a new non-persistent post. See below for correct post structure.
  * `GET /api/posts/:postId`: retrieves full version of an existing post, either persistent or non-persistent, with pizza list content included.
  * `PUT /api/posts/:postId`: saves a new version of a single post
  * `DELETE /api/posts/:postId`: deletes a single post. Persistent posts can't be deleted!

Posts are given as JSON objects like:

    {
      "subject": "Kuivausrummun alapuolella oleva pyykinpesukone rikki",
      "creator": "Timo porkkana",
      "text": "Kuului kova ääni ja savu haisi. Älkää siis toistaiseksi käyttäkö sitä. Talonmies tarkistaa tilanteen huomenna.",
      "id": "kuivausrummun-alapuolella-oleva-pyykinpesukone-rikki",
      "createdOn": "Sat Jan 09 2016 18:37:11 GMT+0200 (FLE Standard Time)"
    }

## Author/contact

Olli Salli

\#angular-bootstrap@paivola.slack.com
