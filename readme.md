# Read-Smore

(cause read-more was already taken 😉)

A customizable, lightweight vanilla JS plugin for truncating content with a Read more / Read less move, whilst preserving the original markup. Able to truncate by max word or character count.

[Docs / Demo](https://stephenscaff.github.io/read-smore/)

<br/>

## Contents

1. [📌 Features](#-features)
2. [🎯 Quickstart](#-quickstart)
3. [🧬 Options](#-options)
4. [🤖 Commands](#-commands)
5. [🕹️ Usage](#-usage)
6. [🎨 Cursor Types](#-cursor-types)
7. [📓 Notes](#-notes)
8. [📅 To Dos](#-to-dos)

<br/>

## 📌 Features

- Super duper lightweight, no dependencies, vanilla js.
- Supports truncating content by max Word or Character count.
- Adds ellipse after truncated content.
- Preserves existing markup (nice).
- Read more / Read less text is customizable.
- Use data attributes to control max words/characters count.
- Block level class name is customizable.
- Read More text can be block level or inline via provided (and super minimal) css
- Hybrid NPM Module, supporting `import` and `require`

<br>

## 🎯 Quickstart

#### 1. Install from NPM

`npm i read-smore`

#### 2. Create markup with defined max words

```
<div
  class="js-read-smore"
  data-read-smore-words="70"
>
  <p>Stuff and words and stuff and words.</p>
  <p>Words and stuff and words and stuff.</p>
  <!-- more HTML content -->
</div>
```

#### 3. Add JS and init

```
import ReadSmore from 'read-smore'

// target all read more elements
const readMores = document.querySelectorAll('.js-read-smore')

// Init
ReadSmore(readMores).init()
```

**Or, by require**

```
const ReadSmore = require("read-smore");
const readMores = document.querySelectorAll(".js-read-smore");
ReadSmore(readMores).init();
```

**Or, by CDN**

To include via CDN, find the latest UMD version at [https://unpkg.com/read-smore](https://unpkg.com/read-smore) and inlcude via script tag, like so:

```
<script src="https://unpkg.com/read-smore@2.0.4/dist/index.umd.js"></script>
```

**Then, initialize**

```
const ReadSmore = window.readSmore

// target all read more elements
const readMoreEls = document.querySelectorAll('.js-read-smore')

// Init
ReadSmore(readMoreEls).init()
```

<br/>

## 🧬 Options

`ReadSmore()` accepts a single options param, which supports the following properties:

| Option           | Type    | Description                                     | Default      |
| ---------------- | ------- | ----------------------------------------------- | ------------ |
| blockClassName   | String  | BEM style block name for injected link template | `read-smore` |
| lessText         | String  | 'Read Less' closer link text                    | `Read more`  |
| moreText         | String  | 'Read More' expander link text                  | `Read less`  |
| wordsCount: 30,  | Number  | Default max words (if no data attribute)        | `30`         |
| charsCount: null | Number  | Default max characters (if no data attribute)   | `null`       |
| isInline         | Boolean | Styles link text inline with content            | `false`      |

<br>

## 🤖 Project Commands

#### Install Project Deps

`npm i`

#### Build

`npm run build`

Builds `src` with `microbundle` to the various common js patterns.

#### Run Dev

`npm run dev`

Dev has microbundle begin watching / building the files, while also running the demo project via Parcel, which imports from the local src directory.

#### Run Demo

`npm run demo:start`

#### Lint

`npm run lint`

<br/>

## 🕹️ Usage

#### Init JS

```
import ReadSmore from 'read-smore'

// target all read more elements with `js-read-smore` class
const readMores = document.querySelectorAll('.js-read-smore')

// Init
ReadSmore(readMores).init()
```

#### Example by max word count

To truncate content by max **word** count, use the data attribute `data-read-smore-words=""` with desired value.

```
<div
  class="js-read-smore"
  data-read-smore-words="70"
>
  <p>Stuff and words and stuff and words.</p>
  <p>Words and stuff and words and stuff.</p>
  <!-- more HTML content -->
</div>
```

#### Example by max character count

To truncate content by max **character** count, use the data attribute `data-read-smore-chars=""` with desired value.

```
<div
  class="js-read-smore"
  data-read-smore-chars="150"
>
  <p>Stuff and words and stuff and words.</p>
  <p>Words and stuff and words and stuff.</p>
  <!-- more HTML content -->
</div>
```

#### Provide Options

ReadSmore supports a few options, such as editing the more/less text. See Options table below for more.

```
import ReadSmore from 'read-smore'

const readMores = document.querySelectorAll('.js-read-smore')

const options = {
  blockClassName: 'read-more',
  moreText: 'Peep more',
  lessText: 'Peep less'
}

// Pass in options param
ReadSmore(readMores, options).init()
```

#### Make Read more link inline

To have the Read More link appear inline with the ellipsed content, as opposed to below it, some very simple styles are included in the package.
Import them in your css:

**CSS File**

```
import 'read-more/index.css';
```

Then use the data attribute `data-read-smore-inline="true"

**JS**

```
<div
  class="js-read-smore"
  data-read-smore-chars="150"
  data-read-smore-inline="true"
>
  <p>Stuff and words and stuff and words.</p>
  <p>Words and stuff and words and stuff.</p>
  <!-- more HTML content -->
</div>
```

Note, will probably remove the required css dep in favor inline styles or a js only solution.

<br/>

## 📓 Notes

- Need to figure out how to handle ReadMore instances with ajaxed/Fetched in content, since the word count on existing instances will be already truncated.
- Thinking the solution is to destroy and rebuild via a click event. Or, at least open all and rebuild on click.

<br/>

## 📅 To Dos

- ~~Overhaul and simplfiy API to be more plugin / module like~~
- ~~Rename everything to 'ReadSmore'~~
- ~~Add docs / demo pages via gh-pages~~
- ~~Bundle as Hybrid NPM Module to support `import` and `require`~~
- Provide callbacks on open/close
- Provide a destroy method
- Provide a solution for content injected after page load
- Remove CSS needed for inline option
- Add some tests
