class TimeSlots {
  static selector = '.p-Class:not(.p-ClassArchived)'

  constructor(element) {
    this.fixContent(element)
  }

  fixStrings = (weekdayAsString) => {
    // TH, TU, SA, SU
    if (weekdayAsString[0] === 't' || weekdayAsString[0] === 's') {
      return `${weekdayAsString[0]}${weekdayAsString[1]}`
    }
    // M, W, F
    return weekdayAsString[0]
  }

  buildStringFromWeekdayData = (element) => {
    const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'custom']
    const weekdayData = {}
    const rowData = []

    // gathering items by similar time ranges
    weekdays.forEach((dayData) => {
      if (element.dataset[dayData]) {
        if (!weekdayData[element.dataset[dayData]]) {
          weekdayData[element.dataset[dayData]] = [this.fixStrings(dayData)]
        } else {
          weekdayData[element.dataset[dayData]].push(this.fixStrings(dayData))
        }
      }
    })

    // helper func to reduce into single string (e.g. "M+W 10am-12pm")
    Object.keys(weekdayData).map((day) => {
      if (weekdayData[day]) rowData.push(`${weekdayData[day].join('+')} ${day}`)
      return day
    }, {})

    return rowData
  }

  fixContent = (element) => {
    const cardContent = element.querySelector('[data-class-time]')
    if (element.dataset.custom) {
      // custom string
      cardContent.innerHTML = element.dataset.custom
    } else {
      // M+TU+W+TH+F
      const rowData = this.buildStringFromWeekdayData(element)
      cardContent.innerHTML = rowData.join('<br>')
    }
  }

  static init() {
    return Array.from(document.querySelectorAll(this.selector)).map(element => new this(element))
  }
}

export default TimeSlots
