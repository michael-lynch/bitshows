/*!

Name: 
Dependencies: jQuery
Author: Michael Lynch
Author URL: http://michaelynch.com
Date Created:
Last Updated:
Licensed under the MIT license

*/
;(function($) {

    $.fn.bitshows = function(options) {
    
    	// return if no element was bound
		// so chained events can continue
		if(!this.length) { 
			return this; 
		}

		// define default parameters
        var defaults = {
            api_version: '2.0',
            api_app_id: 'plugin',
            artist: 'Skrillex',
            range: 'upcoming',
            date_format: null,
            tickets: true,
            loader: true,
            success: function() {},
            error: function() {}
        }
        
        // define plugin
        var plugin = this;

        // define settings
        plugin.settings = {}
 
        // merge defaults and options
        plugin.settings = $.extend({}, defaults, options);

        var el = $(this),
        	s = plugin.settings,
        	endPoint = 'http://api.bandsintown.com/artists/'+s.artist+'/events.json?api_version='+s.api_version+'&app_id='+s.api_app_id;
    	
    	if(s.range) {
    		endPoint += '&date='+s.range;
    	}
    	
    	console.log(endPoint);
        	
        function getEvents() {
	        
	        return $.ajax({
        		type: 'GET',
	        	url: endPoint,
	        	dataType: 'jsonp'
        	});
        }
        
        function serializeEvent(e) {
	        
	        var event = '<li data-bandsintown-id="'+e.id+'">'
	        	date = new Date(e.datetime),
	        	days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
	        	months =['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	        	dayNum = date.getDay(),
	        	day = days[dayNum],
	        	dayNum = dayNum + 1,
	        	dayNumZero = (dayNum.toString().length > 1) ? dayNum : '0'+dayNum.toString(),
	        	monthNum = date.getMonth(),
	        	month = months[monthNum],
	        	monthNumZero = (monthNum.toString().length > 1) ? monthNum : '0'+monthNum.toString(),
	        	year = date.getFullYear(),
	        	dateFormattted = '';
	        	
			if(s.date_format === 'dd/mm/yyyy') {
				dateFormattted = dayNumZero + '/' + monthNumZero + '/' + year;
			} else if(s.date_format === 'mm/dd/yyyy') {
				dateFormattted = monthNumZero + '/' + dayNumZero + '/' + year;
			} else {
				dateFormattted = day + ' ' + month + ' ' + dayNum+', '+year;
			}
	        
	        event += '<span class="event__date">'+dateFormattted+'</span>';
	        
	        event += '<span class="event__venue">'+e.venue.name+'</span>';
	        
	        event += '<span class="event__location">'+e.formatted_location+'</span>';

	        event += '<div class="event__links">';
	        
	        if(s.tickets && e.ticket_url) {
	        	event += '<a href="'+e.ticket_url+'" title="Buy Tickets for the show" target="_blank" class="event__tickets">Buy Tickets</a>';
	        }
	        
	        event += '<a href="'+e.facebook_rsvp_url+'" title="RSVP for the show" target="_blank" class="event__rsvp">RSVP</a>';
	        
	        event += '</div>';
	        
	        event += '</li>';
	        
	        return event;
	        
        }
        
        // for each element
        el.each(function() {
        
        	var _this = $(this);
        	
        	if(s.loader) {
	        	_this.append('<div class="loader">Loading...</div>');
        	}
        
        	$.when(getEvents()).done(function(response) {
        	
        		if(response.length) {
        		
	        		_this.empty();
	        		
	        		console.log(response);
	        	
	        		for(var i = 0; i < response.length; i++) {
	        		
	        			var event = serializeEvent(response[i]);
	        			
	        			el.append(event);
		        		
	        		}
	        		
	        		// run success callback function
					s.success.call(this);
					
				} else {
					
					// run error callback function
					s.error.call(this);
				}
	        	
        	}).fail(function() {
        	
        		// run error callback function
				s.error.call(this);
        	
        	});
        
        });
        
    }

})(jQuery);