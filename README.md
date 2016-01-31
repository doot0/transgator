# transgator

Transgator is a tiny (1.4kb minified) translation library that has no dependencies and is pretty easy to use and implement. Browser support should be IE9+ and the usual browsers that don't suck.

## Documentation

#### Translating the content of an element

Add a data-attribute to any element you want to translate with text in it and add a key to it. `data-i18n-key` is the default.

Write your translations in JSON files in the below format and place them all in the same directory. I recommend naming your translation files with a valid [ISO 639-2 language code](http://www.loc.gov/standards/iso639-2/php/code_list.php).

**HTML**
```
<p data-i18n-key="translation_key">This is the default text.</p>
```

**JSON**
```
{
 "translation_key" : "Translated value!"
}
```

You'll end up with:
```
<p data-i18n-key="translation_key">Translated value!</p>
```

#### Translating attributes on an element

Specify your attributes by separating a translation key with a pipe, then the name of the attribute you want to translate. You can specify an infinite number of attributes if you *really* want to.

**HTML**
```
<input data-i18n-key="somekey|value" type="button" value="Translate me!"/>
```

**JSON**
```
{
  "somekey|value" : "Translated value for the attribute 'value' "
}
```

You'll then end up with:
```
<input data-i18n-key="somekey|value" type="button" value="Translated value for the attribute 'value' "/>
```

**Surgeon General's Warning**: If you need to translate an attribute, you **must** specify a root keyname in your data attribute. However, you do not need to specify this key in your JSON translation file.

#### Translating an attribute and an element's content at the same times

Use the exact same method for translating an attribute, but specify a keyname for the translation in your JSON file.

**HTML**
```
<div data-i18n="elementcontent|attribute" attribute="Translate me!">Translate me!</div>
```
**JSON**
```
{
  "elementcontent" : "Translated element content value"
  "elementcontent|attribute": "Translated attribute value"
}
```

This yields:
```
<div data-i18n="elementcontent|attribute" attribute="Translated attribute value">Translated element content value</div>
```

#### Running Transgator

Ideally, you should place your config object and the initial call to Trangator at the end of your document, before the closing body tag. If you do not, you must init Transgator after document ready is fired, or the DOM node <-> translation dictionary that is generated on init may not get fully populated.

- Build a config object to pass into Transgator.
- Specify the directory that your translations are in on your server in a `i18n_dir` key
- Specify the `data-attribute` key that Transgator should inspect in your DOM with the `i18n_key` key

See below for an example config and some basic explanations.

```
var config = {
  i18n_key : "data-i18n", //the data attrib to inspect in your document.
  i18n_dir : "/i18n/" //the directory your translations are stored in.
};

var i18n = new Transgator(config); //Initiates Transgator. You should do this after docready.
```

Keep in mind that you should only init Transgator after document ready, or your translation hashmap could fail to generate.

#### Changing language

There is only one method available, and that is the `lang` method. You can utilise it like so;
```
i18n.lang('en'); //String passed corresponds to your translation file
```

You can call `lang` any number of times you like after the Transgator is initialised. Calling `lang` will also update the HTML `lang` attribute in your markup accordingly.

---

##### Things to consider

Currently, support for dynamically updated DOM doesn't exist. This means the library is not really suited to single page applications etc etc. Pull requests are welcome, but your implementation must be minimal and fast.
