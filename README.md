# MMM-RedditKarma
A simple MagicMirror² module to display user karma from Reddit.com. It can also show your snoovatar if the user is a reddit gold subscriber.
![Example of module](./MMM-RedditKarma%20example.png)

## Installation

In your terminal, go to your MagicMirror's Module folder:

```bash
cd ~/MagicMirror/modules
```
Clone this repository:
```bash
git clone https://github.com/rcberg3/MMM-RedditKarma.git
```
Configure the module in your config.js file.

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
```js
modules: [
    {
        module: 'MMM-RedditKarma',
        position: 'bottom_left', // This can be any of the regions.
        config: {
            	reddit_user: "spez",
		use_snoovatar: true, 
		reload: 30, 
		use_color: true,
        	header_with_u: true
        }
    }
]
```

## Configuration options

Option|Description
------|-----------
`reddit_user`|The reddit user for which you would like to show karma data.<br/>**Default** = `spez`
`use_snoovatar`|Show a users snoovatar in the first cell.<br/>**Default** = `true`
`reload`|The frequency, in minutes, of which the module should reload data.<br/>**Default** = `30`<br/>**Expected Value type:** `int`
`use_color`|Use a orange colored upvote icon. <br/>**Default** = `true`
`header_with_u`|Show the module header using the reddit /u/ formatting. **Default** = `true`
