# datavisfun
_A data visualization exercise using d3.js_

This repository holds the content for a Node.js app and Express app, that serves static content is deployed in heroku: https://gentle-chamber-33673.herokuapp.com/

This app loads data from the following [API endpoint](https://dcc.icgc.org/api/v1/projects/GBM-US/mutations?field=id,mutation,type,chromosome,start,end&size=100&order=desc).
This data returns mutation data for the Glioblastoma multiforme project (GBM-US).

The details of the task to complete can be found [here](https://gist.github.com/alexsb/3728d3ee1c340fbd8b23dd38dfbfe201).

The following is a diagram of the proposed data flow for this project:
![data flow](https://github.com/arocho/datavisfun/public/images/diagram.png "data flow")

At start, an API request is sent, and JSON data is obtained, then the rest of the javascript snippets are queued up and loaded.

There are two individual Javascript snippets for the Type Overview, and for the Chromosome Overview. The Type Overview is displayed as a bar graph, and the Chromosome overview will be displayed as a scatter plot.

All data will be displayed the first time the web application is loaded, and as soon as the scripts load, the bar graph and scatter plot will be visible.

Filters will also be made available, either by an individual list on the side, or selectable via the nodes in the scatter plot.

The filter selections will trigger the creation of a list of criteria that will be processed, along with the displayed data, using a data manipulation framework, such as Lodash. This will efficiently filter the data, and then the data will be fed into the corresponding rendering methods, so that the newly filtered data is displayed.

Just as filters are compiled into a list, they can also be removed. Updates to the graphs will occur whenever the filters are toggled. Note that the filters would be visible to the user so they can keep track of which ones are being applied.

## Optional Comments

#### Colors
- Color coding the nodes in the scatter plot by type as well as the bars in the chart would significantly help keep track of how the two overviews relate to each other. It could also be helpful to darken nodes as they are selected in for filtering..

#### Assessment testing
- For data retrieval and flow, open the browser debugger tools of your choice and look at console logs.

When interactivity is enabled:
- Select scatter plot node, or list filter(s) to see the change of data in both overviews.

- Reload should fetch all data back

- Clear filters and verify that all data is displayed

#### Testing Considerations (for production)
- A simple ping test - Since this is an Express app, it'd be relatively simple to create an endpoint that'd send an 'I'm alive' response.

- Keeping track of the application hosting service. Failure to reach the app does not necessary mean it is a failure in the software.

- If deemed necessary, UI testing is also a possibility with a tool like Selenium, which will open up a browser and scrape the screen for expected values and elements in the DOM.

- Unit testing with a tool like node-tap which is useful for both server-side and client-side Javascript.

- For anything front-end, all testing should be done in multiple browsers.

