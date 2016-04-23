# AEM and Sling dev workflow

> …get well, soon!

Adobe is a big company, so they build big things like an [AEM Sightly Brackets Extension](https://github.com/Adobe-Marketing-Cloud/aem-sightly-brackets-extension).

This fork extracts some of the beauty things of that super-duper-long-name-all-in-one project and makes
them available as building blocks to popular tools such as [Grunt](http://gruntjs.com/), [Gulp](http://gulpjs.com/),
or just plain [Node](https://nodejs.org/). It even doesn't spell the words Maven or File Vault ... oh, failed! :-)


## Features

* Vanilla node features ftw! :-)
  * there is a set of common, re-usable libraries in the ``lib`` folder
  * you can use that directly in a 'plain' npm build
* Gulp features are provided by [gulp-aem-sling-dev](https://github.com/dherges/gulp-aem-sling-dev)
* Grunt tasks are provided by [grunt-aem-sling-dev](https://github.com/dherges/grunt-aem-sling-dev)

## Next Up

-> crx content package sync as a node module
-> remove dependencies that are (historic) heritage from the ``sly`` folder


## Documentation

_…remains to be seen…_


## Get Started
If you don't have of your own a project with a content-package to try out, you can try out the the
[Sightly TodoMVC Example](aem-sightly-sample-todomvc) sample application that was built with the
AEM Brackets Extension. Download the ZIP from GitHub, extract the files locally, open the `jcr_root`
folder in Brackets, setup the Project Settings, and upload the whole package to your AEM development
instance by doing an Export Content Package.

After these steps, you should be able to access the `/content/todo.html` URL on your AEM development
instance and you can start doing modifications to the code in Brackets and see how, after doing a
refresh in the web browser, the changes were immediately synchronized to the AEM server.


## Known Issues or Limitations
* Embedded content packages are not supported.


## Credits

…go to the clever Adobe guys, who wrote the initial AEM Sightly Brackets extension:

* [Nicolas Peltier](https://github.com/nicolasATadobe): Initial plug-in with Sightly support (syntax highlighting and auto-completion for expressions and statements), and synchronisation to AEM (automatic and manual import and export).
* [Radu Cotescu](https://github.com/raducotescu): Added project preferences, improved synchronisation to use the Package Manager HTTP Service API, added support for `filter.xml` rules, enhanced UI with sync notifications.
