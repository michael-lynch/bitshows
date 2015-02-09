#Bitshows

A simple, lightweight jQuery plugin to retrieve an artist's event listings on <strong>B</strong>ands<strong>I</strong>n<strong>T</strong>own.

<a href="http://michael-lynch.github.io/bitshows/" target="_blank" title="See a demo of this plugin">See a demo</a>

##Instructions

Include jQuery and the plugin in the head or footer of your page.

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    
    <script src="/js/plugins/bitshows.js"></script>
    
Initialize the plugin using the class, ID or element you're targeting. 

	$('.bitshows').bitshows();
	
####Options

<ol>

<li>
api_version: string (default: '2.0')
<br />A string that defines the BandsInTown API version to use.
</li>

<li>
api_app_id: string (default: 'plugin')
<br />A random string that defines the application.
</li>

<li>
artist: string (default: null)
<br />A string that defines the artist.
</li>

<li>
range: string (date: "upcoming")
<br />A string that defines the range of dates for the events ("all", "upcoming", "dd/mm/yyyy").
</li>

<li>
date_format: string (default: null)
<br />A string that overrides the default date format for the events ("dd/mm/yyyy", "mm/dd/yyyy").
</li>

<li>
tickets: boolean (default: true)
<br />A boolean that indicates whether or not a link to buy tickets to the events should be displayed.
</li>

<li>
loader: boolean (default: true)
<br />A boolean that indicates whether or not a loader should be displayed.
</li>

<li>
success: function()
<br />A callback function that runs after the plugin, if the plugin is successful.
</li>

<li>
error: function()
<br />A callback function that runs after the plugin, if the plugin failed.
</li>

</ol>

#####Example:

		$(function() {
			
			$('.bitshows').bitshows({
				success: function() {
					console.log('The plugin was successful!');
				},
				error: function() {
					console.log('The plugin encountered an error.');
				}
			});
				
		});