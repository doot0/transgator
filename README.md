# transgator
A microscopic, 0-dep, no bullshit i18n lib

1. write your translations in JSON key value pairs
2. specify a config for transgator that consists of a html data-attribute you want elements to be translated on, and a directory your translations are in
3. pass a lang to transgator
4. i suck at explaining things
5. just look at the example or something

notes: you MUST specify your lang on the html attribute or you're a silly person

```

<p data-i18n-key="translation_key">default text</p>

<script>

	var transgator_config = {
		i18n_key : 'data-i18n-key',
		i18n_dir : '/js/i18n/'
	}

	var lang = document.documentElement.getAttribute('lang');
	new Transgator(lang, transgator_config);
	
</script>
```
