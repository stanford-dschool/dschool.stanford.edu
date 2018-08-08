class GoogleData {
  constructor() {}

    bless(object) {
    let key, value;
    const result = new GoogleSpreadsheet()
    for (key in object) {
      value = object[key]
      result[key] = value
    }
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
    const googleUrl = new GoogleUrl(data.feed.id.$t)
    let googleSpreadsheet = this.find({
      jsonUrl: googleUrl.jsonUrl
    })

    if (googleSpreadsheet === null) {
      googleSpreadsheet = new GoogleSpreadsheet()
      googleSpreadsheet.googleUrl(googleUrl)
    }

    googleSpreadsheet.data = this.processData(data.feed.entry)

    googleSpreadsheet.save()
    return googleSpreadsheet
  }

  processData(ref) {
    const results = {}
    for (let index = 0; index < ref.length; index++) {
      const row = ref[index];
      const parsedRow = {}
      for (const [key, value] of Object.entries(row)) {
        if (key.includes('gsx$')) {
          const parsedKey = key.split('gsx$')[1]
          parsedRow[parsedKey] = value.$t
        }
      }
      results[parsedRow.url] = parsedRow
    }
    return results
  }
}

class GoogleUrl {
  constructor(sourceIdentifier) {
    this.sourceIdentifier = sourceIdentifier
    if (this.sourceIdentifier.match(/http(s)*:/)) {
      this.url = this.sourceIdentifier
      try {
        this.key = this.url.match(/key=(.*?)&/)[1]
      } catch (error) {
        this.key = this.url.match(/(cells|list)\/(.*?)\//)[2]
      }
    } else {
      this.key = this.sourceIdentifier
    }
    this.jsonListUrl = "https://spreadsheets.google.com/feeds/list/" + this.key + "/od6/public/values?alt=json"
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
