// Javascript code for my board game organiser. Doesn't need html tags, apparently.

let request = new XMLHttpRequest()  // Object used to pull data from BGG's API.
let urlBase = 'https://api.geekdo.com/xmlapi2/'  // The base for all BGG XML data. JS has fancy URL objects & methods but I don't think I need them...

let username = 'Savdog'  // Should be able to change this eventually...
request.open('GET', urlBase + 'collection?username='+username+'&excludesubtype=boardgameexpansion')  // Prepare connection to user's collection.
request.responseType = 'document'  // Specifies XML output, but not sure this is entirely necessary.

// Event handling for the following request.send() command.
request.onerror = () => console.log('Error fetching data for ' + username + '. Please refresh your browser to retry.')
request.onload = function() {
  if (request.status != 200) {
    console.log('XMLHttpRequest error: ' + request.status)
  } else {
    console.log('XMLHttpRequest successful!')
    // MAIN STUFF HAPPENS HERE =---------------------------------------------------------------------------------------------------------------
    let xmlColl = request.responseXML  // Contains the collection data in XML format.
  
    totalitems = xmlColl.documentElement.getAttribute('totalitems')
    console.log('Found ' + totalitems + ' board games (excluding expansions).')
  }
}

request.send()




    let xml = request.responseXML
    
    let sMinPlayers = xml.getElementsByTagName('minplayers')[0].getAttribute('value')
    let sMaxPlayers = xml.getElementsByTagName('maxplayers')[0].getAttribute('value')
    let nMinPlayers = Number(sMinPlayers)
    let nMaxPlayers = Number(sMaxPlayers)
    
    let b=0, r=0, nr=0
  	let resultsArray = xml.getElementsByTagName('results')
    for (let resultsNode of resultsArray) {
      sNumPlayers = resultsNode.getAttribute('numplayers')
      nNumPlayers = Number(sNumPlayers)
      if (nMinPlayers <= nNumPlayers && nNumPlayers <= nMaxPlayers) {
        let resultArray = resultsNode.getElementsByTagName('result')
        for (let resultNode of resultArray) {
          let value = resultNode.getAttribute('value')
          let numvotes = resultNode.getAttribute('numvotes')
          if (value === 'Best') {
            b = numvotes
          } else if (value === 'Recommended') {
            r = numvotes
          } else if (value === 'Not Recommended') {
            nr = numvotes
          }
        }
        document.write(sNumPlayers + ' B: ' + b + ' R: ' + r + ' NR: ' + nr + '<br>')
	    }
	  }
