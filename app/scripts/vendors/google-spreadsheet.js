class GoogleData {
  constructor() {}

  bless(object) {
    let key, value;
    const result = new GoogleSpreadsheet()
    for (key in object) {
      value = object[key]
      result[key] = value
    }

    console.log("BLESS UP", result)

    return result
  }

  find(params) {
    let itemObject, value;
    try {
      for (let item in localStorage) {
        if (item.match(/^GoogleSpreadsheet\./)) {
          itemObject = JSON.parse(localStorage[item]);
          for (let key in params) {
            value = params[key];
            if (itemObject[key] === value) {
              return this.bless(itemObject)
            }
          }
        }
      }
    } catch (error) {
      for (let index = 0, len = localStorage.length; index < len; index++) {
        let item = localStorage[index];
        if (item.match(/^GoogleSpreadsheet\./)) {
          itemObject = JSON.parse(localStorage[item])
          for (let key in params) {
            value = params[key]
            if (itemObject[key] === value) {
              return this.bless(itemObject)
            }
          }
        }
      }
    }

    return null;
  };

  callbackCells(data) {
    console.log("callbackCells data", data);
    // const googleUrl = new GoogleUrl(data.feed.id.$t)
    const googleUrl = new GoogleUrl("https://sheets.googleapis.com/v4/spreadsheets/AIzaSyDAytD_wRnF_zC4_ARJUNf3t2p0-vxHog0/values/Sheet1?alt=json&key=AIzaSyDAytD_wRnF_zC4_ARJUNf3t2p0-vxHog0");

    let googleSpreadsheet = this.find({
      jsonUrl: googleUrl.jsonUrl
    })

    if (googleSpreadsheet === null) {
      googleSpreadsheet = new GoogleSpreadsheet()
      googleSpreadsheet.googleUrl(googleUrl)
    }

    googleSpreadsheet.data = this.processData(data.values)

    googleSpreadsheet.save()
    return googleSpreadsheet
  }

  processData(ref) {
    const results = {}
    console.log("ref: ", ref);
    console.log("ref.len: ", ref.length);
    const keys = ref[0];

    for (let index = 2; index < ref.length; index++) {
      const row = ref[index];
      const parsedRow = {}

      row.forEach(function(cellValue, index) {
        if (cellValue) {
          const parsedKey = keys[index].replace("_","").trim().toLowerCase();
          parsedRow[parsedKey] = cellValue;
        }
      })
      
      results[parsedRow.url] = parsedRow
    }

    return results
  }
}

class GoogleUrl {
  constructor(sourceIdentifier) {
    this.htmlIdentifier = sourceIdentifier
    if (this.htmlIdentifier.match(/http(s)*:/)) {
      this.url = this.htmlIdentifier
      try {
        this.key = this.url.match(/key=(.*?)&/)[1]
      } catch (error) {
        this.key = this.url.match(/(spreadsheets)\/(.*?)\//)[2]
      }
    } else {
      this.key = this.htmlIdentifier
    }

    const apiKey = "AIzaSyDAytD_wRnF_zC4_ARJUNf3t2p0-vxHog0"

    this.jsonListUrl = "https://sheets.googleapis.com/v4/spreadsheets/" + this.key + "/values/Sheet1?alt=json&key=" + apiKey;
    this.jsonUrl = this.jsonListUrl
  }
}

class GoogleSpreadsheet {
  constructor() {}

  load(callback) {
    window.googleData = new GoogleData()
    let intervalId, jsonUrl, safetyCounter, waitUntilLoaded

    const url = this.googleUrl.jsonListUrl + "&callback=window.googleData.callbackCells"
    const script = document.createElement('script')
    script.src = url
    document.body.appendChild(script)
    jsonUrl = this.jsonUrl
    safetyCounter = 0

    intervalId = setInterval(() => {
      let result;
      result = window.googleData.find({
        jsonUrl: jsonUrl
      })

      console.log("result", result)
      console.log("safetyCounter", safetyCounter)

      if (safetyCounter++ > 20 || ((result != null) && (result.data != null))) {
        clearInterval(intervalId)
        return callback(result)
      }
    }, 200)

    if (typeof result != "undefined" && result !== null) {
      return result
    }
  }

  url(url) {
    return this.googleUrl(new GoogleUrl(url))
  }

  googleUrl(googleUrl) {
    if (typeof googleUrl === "string") {
      throw "Invalid url, expecting object not string"
    }
    this.url = googleUrl.url
    this.key = googleUrl.key
    this.jsonUrl = googleUrl.jsonUrl
    return this.googleUrl = googleUrl
  }

  save() {
    return localStorage["GoogleSpreadsheet." + this.type] = JSON.stringify(this)
  }
}

module.exports.GoogleSpreadsheet = GoogleSpreadsheet;
