gettext-utils
=============

A collection of helper functions for processing gettext files.


Requirements
------------

* npm >= 4


Usage
-----

* Install

      yarn add git+https://github.com/WhatAVenture/gettext-utils.git --dev

* Fix language and charset in the header of all PO files in the 'locales' directory:

      po-utils-fix-header [--localesPath] [--inputCharset] [--filenameToLanguageRegex]

  Arguments:

  * localesPath = locales: The directory to look for \*.po files.
  * inputCharset = UTF-8: The encoding of the po files.
  * filenameToLanguageRegex = \\.([^\\.-]+)(.\*): The regex that extracts the language from the filename.
