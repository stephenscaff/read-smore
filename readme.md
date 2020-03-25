# Read-More.js

A little js component / thing for adding a read more / read less feature with pure js.

Highlights:

- Specify word count that's displayed before truncation
- Adds ellipse after truncated content
- Support for multiple instances per page, each with it's own word count
- Preserves existing markup (nice bruv)
- Change Read More / Read Less text via settings object
- Super duper lightweight, no dependencies, vanilla js.
- Read More can me inline with content via css (provided... no biggie)

[Blog Post](http://stephenscaff.com/articles/2018/12/readmore-js/)
[Demo](https://codepen.io/StephenScaff/full/oPbbMx)

## Install (via npm)

`npm i read-more-js`


## Useage

ReadMore just looks for the class `js-read-more`.

Specify the desired words before truncation with the data attribute `data-rm-words`.

A few baseline styles are provided.

###


#### MarkUp
```

<article>
  <div class="read-more js-read-more" data-rm-words="60">
    <p><!-- some content call here --></p>
  </div>
</article>
```

### Import and init from npm
```
import ReadMore from 'read-more-js'

ReadMore.init()
```

### Import and init from your files
```
import ReadMore from './read-more'

ReadMore.init()
```

### Init ES5 approach

Include styles and `src/lib/read-more.es5.js` in your project and:

```
// Maybe check for element first
if (document.querySelector('.js-read-more')) {
  ReadMore.init();
}
```


## Caveats

Need to figure out how to handle ReadMore instances with ajaxed/Fetched in content, since the word count on existing instances will be already truncated.

Thinking the solution is to destroy and rebuild via a click event. Or, at least open all and rebuild on click.


## Packing

`src/lib` includes ES5 and ES6 versions, in addition to baseline styles as scss are included.
`src/package` includes es6 and css that's packaged up with [`microbundle`]() for `npm` distribution.
