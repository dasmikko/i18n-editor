# i18n Editor

A super simple editor for [vue-18n by kazupon](https://kazupon.github.io/vue-i18n/)

[It is hosted on github pages](https://rekna.xyz/i18n-editor/ "i18n Editor")

![Screenshot of the editor](./screenshot.png?raw=true "Screenshot")

## Browser support

Sadly it only supports browsers that implement the [FileSystem API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API) fully, and Firefox doesn't do that. 

## What is this?

The goal of the tool is to simplify editing the language files, and not having to hassle with multiple files.

Normally you would have multiple JSON files for each language, like `da.json`, `en.json` and so on.

This can be quite tedious to maintain, especially when you have a lot of entries, or even add a whole new language.

Here is an example of my format for language files:

```
{
  "common": {
    "logoff": {
      "da": "Log af",
      "en": "Logout"
    },
    "saveCurrentView": {
      "da": "Gem nuværende view",
      "en": "Save current view"
    },
    "search": {
      "da": "Søg",
      "en": "Search"
    }
  }
}
```

In my version, each key contains all the languages, making it easier to edit.

[I've made a Gist where I show how to use it in your own Vue.js project.](https://gist.github.com/dasmikko/aa28a4c42312b558a251ab4fc1049f0c)

Don't worry, it's very easy to use my format.

## How to use

### First time use
```
git clone git@github.com:dasmikko/i18n-editor.git
cd i18n-editor
npm install
npm run build
npm run serve
```

### After use
```
npm run serve
```

## How to update

Simply do a `git pull` and run:
```
npm install
npm run build
```

Then you can run the `npm run serve` as usual

## Future
I'm planning on supporting multiple language files, as that is the default way the i18n library does it.
