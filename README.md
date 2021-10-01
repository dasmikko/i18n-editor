# i18n Editor

A super simple editor for [vue-18n by kazupon](https://kazupon.github.io/vue-i18n/)

[It is hosted on netlify](https://i18n-editor.netlify.app/ "Screenshot")

![Screenshot of the editor](./screenshot.png?raw=true "Screenshot")

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


## Goals

- [ ] Support for "old"-style language files
- [ ] File selection instead of copy and paste


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