Module.register("MMM-RedditKarma", {
	defaults: {
		reddit_user: "spez", //CEO of reddit
		use_snoovatar: true, //use snoovatar as icon
		reload: 30, //number, in minutes, for which to reload karma
		use_color: true, //show colorized upvote icon
		//show_header: true, //show the username as a header
		header_with_u: true //show the header with the /u/ formating
	},
	
	getStyles: function () {
		return ["font-awesome.css","MMM-RedditKarma.css"];
	},
	
	getHeader: function() {
		if (this.config.header_with_u == true) {
			return "/u/" + this.config.reddit_user;
		} else {
			return this.config.reddit_user;
		}			
	}, 

	start: function () {
			Log.info("Starting module: " + this.name);
			this.loaded = false;
			var comment_karma = '';
			var post_karma = '';
			var font_size = 'medium';
			var use_snoovatar = ''
			this.getData();

			var self = this;

		// Schedule updates
			setInterval(function () {
				self.getData();
				self.updateDom();
			},
		this.config.reload * 60 * 1000 );
	},

	getDom: function() {
			use_snoovatar = this.config.use_snoovatar
			var table = document.createElement("table")
			table.className = "medium"
	
			//create post row
			var postrow = document.createElement("tr")
			table.appendChild(postrow)
				
				//use snoovatar
				if (use_snoovatar == true) {
					var sno_cell = document.createElement("td")
					sno_cell.innerHTML = '<img src="' + snoovatar + '" alt="avatar" width="70" height="70" style="vertical-align: text-top">'				
					sno_cell.setAttribute("rowspan", "0")
					postrow.appendChild(sno_cell);
				} 

				//create icon cell
				var posticon = document.createElement("td")
				posticon.className = "align-center"
				posticon.innerHTML = '<i class ="fa fa-solid fa-arrow-up">'
				if (this.config.use_color == true) {
					posticon.className += " orange";
				}
				postrow.appendChild(posticon)

				//create karma cell
				var postkarmacell = document.createElement("td")
				postkarmacell.innerHTML = post_karma
				postkarmacell.className = "align-left bright"
				postrow.appendChild(postkarmacell)

			//create comment row
			var commentrow = document.createElement("tr")
			table.appendChild(commentrow)

				//create icon cell
				var commenticon = document.createElement("td")
				commenticon.className = "align-center"
				commenticon.innerHTML = '<i class ="fa fa-solid fa-comments white">'
				/*if (this.config.use_color == true) {
					commenticon.className += " orange";
				}*/
				commentrow.appendChild(commenticon)

				//create karma cell
				var commentkarmacell = document.createElement("td")
				commentkarmacell.innerHTML = comment_karma
				commentkarmacell.className = "align-left bright"
				commentrow.appendChild(commentkarmacell)

			//table.innerHTML = "post: " + post_karma + " comment: " + comment_karma
			return table
	},

  	getData: function() {
		
		built_URL = "https://www.reddit.com/user/" + this.config.reddit_user + "/about.json"
		comment_karma = ''
		post_karma = ''		


		fetch(built_URL)
			.then(response => {
				return response.json();
			})
			.then(karma => {
				post_karma = karma.data.link_karma
				//console.log(post_karma)
				comment_karma = karma.data.comment_karma
				//console.log(comment_karma)
				snoovatar = karma.data.snoovatar_img
				this.updateDom();
			})
	},
})