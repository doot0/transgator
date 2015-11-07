# transgator

Transgator is a tiny translation library that has no dependencies (unless your browser sucks) and is pretty easy to use and implement. Browser support is every modern browser except IE, because I'm resolving requests with promises. You can check out [@taylorhakes's promise polyfill](https://github.com/taylorhakes/promise-polyfill) if you need to.

--
#### Documentation

- Add a data-attribute to any element you want to translate with text in it and add a key to it. `data-i18n-key` is the default.
```
<p data-i18n-key="translation_key">This is the default text.</p>
```

- Write your translations in JSON files in the following format and place them all in the same directory. You should name your JSON translation files with a valid [ISO 639-2 language code](http://www.loc.gov/standards/iso639-2/php/code_list.php) that's associated with your target language. e.g. for Chinese Simplified, you'd name your file `zh.json`.


```
{
 "translation_key" : "Translated value!"
}
```

- Run Transgator as follows.

```
var config = {
  i18n_key : "data-i18n-key", //the html data attribute to translate on. default is `data-i18n-key`
  i18n_dir : "/js/i18n/" //the directory your translations are stored in. default is `./i18n/`
};

var t = new Transgator(config); //creates translation hashmap. You should do this after docready.
t.lang("en"); //define your target translations.
t.lang("zh"); //you can change the target translation any time after init.
```

Transgator will fetch the translations using a Promise and will only render them when the promise resolves. Keep in mind that you should only intialise Transgator after docready, or your translation hashmap could fail to generate.

--

#### Issues
- If you're missing translations between files and you change to another language on the fly, any missing values will not change from what they were previously set to. I'll probably address this in the future if I can find an efficient way to do it.
