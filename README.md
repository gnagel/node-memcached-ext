node-memcached-ext
==================

CSV &amp; JSON parsing extension to Node-Memcached


# Get/Set CSV

### Set a non-empty CSV array
```javascript

var memcached = require('memcached_ext');
var client    = new memcached('127.0.0.1:11211');

// Set the CSV
client.set_csv('my_array', ['a', 'b', 'c', 'd'], 0);

// ...

// Get the CSV
client.get_csv('my_array', function(error, array) {
	// array is ['a', 'b', 'c', 'd']
});


```


### Set a empty CSV array
```javascript

var memcached = require('memcached_ext');
var client    = new memcached('127.0.0.1:11211');

// Set the CSV
client.set_csv('my_array', [], 0);

// ...

// Get the CSV
client.get_csv('my_array', function(error, array) {
	// array is []
});


```