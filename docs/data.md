# timelineData.json
## Entry format:
````javascript
{
    "time": "",
    "title": "",
    "subtitle": "",
    "seasonAdded": 0,
    "timelineIndex": 0,
    "sources": [
        ""
    ]
}
````
## Format explanation
* time - time string to be shown on the Time timeline (optional)
* title - title string to be shown on the timeline (optional)
* subtitle - description string to be shown on the timeline (optional)
* seasonAdded - index of the season the data was added (default is 0) ([See seasons.json](#seasonsjson)) 
* timelineIndex - the timeline this item needs to be placed on (default is 0) ([See timelinesDefinition.json](#timelinesdefinitionjson))
* sources - an array of links to Ishtar Collective that are considered proof of this entry (optional)

# timelinesDefinition.json
## Entry format:
````javascript
{
    "debugName": "",
    "index": 0,
    "contentDirection": ""
}
````
## Format explanation
* debugName - string used for debugging
* index - placement of the timeline on the page (unique)
* contentDirection - string specifying the placement of the children content ("left" | "right" | "alternate") (default is "alternate") 

# seasons.json
## Entry format
````javascript
{
    "number": 0,
    "title": "",
    "icon": ""
}
````
## Format explanation
* number - number of the season / expansion (0 is D1) (please increment)
* title - string title of the season / expansion
* icon - path to the icon to be displayed (relative to src/images)