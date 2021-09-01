let isDark = false
if (process.browser) {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDark = true
  }
}

const chartColors = ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6']

const backgroundColor = isDark ? '#303030' : '#fff'
const textColor = isDark ? '#fff' : '#000'

export const positiveChartOptions = {
  title: '検査陽性者数',
  titleTextStyle: {
    color: textColor,
  },
  explorer: {
    axis: 'horizontal',
    keepInBounds: true,
    actions: ['dragToPan'],
  },
  colors: chartColors,
  backgroundColor: backgroundColor,
  legend: {
    textStyle: {
      color: textColor,
    },
  },
  series: {
    0: { targetAxisIndex: 0, type: 'line' },
  },
  vAxes: {
    0: {
      title: 'PCR 検査陽性者数(単日)',
      minValue: 0,
      titleTextStyle: {
        color: textColor,
      },
      textColor: textColor,
    },
  },
  hAxis: {
    textColor: textColor,
  },
}

export const testedChartOptions = {
  title: '検査実施件数',
  titleTextStyle: {
    color: textColor,
  },
  explorer: {
    axis: 'horizontal',
    keepInBounds: true,
    actions: ['dragToPan'],
  },
  colors: chartColors,
  backgroundColor: backgroundColor,
  legend: {
    textStyle: {
      color: textColor,
    },
  },
  series: {
    0: { targetAxisIndex: 0, type: 'line' },
  },
  vAxes: {
    0: {
      title: 'PCR 検査実施件数(単日)',
      minValue: 0,
      titleTextStyle: {
        color: textColor,
      },
      textColor: textColor,
    },
  },
  hAxis: {
    textColor: textColor,
  },
}

export const vaccinationChartOptions = {
  title: 'ワクチン接種数累計',
  titleTextStyle: {
    color: textColor,
  },
  explorer: {
    axis: 'horizontal',
    keepInBounds: true,
    actions: ['dragToPan'],
  },
  colors: chartColors,
  backgroundColor: backgroundColor,
  legend: {
    textStyle: {
      color: textColor,
    },
  },
  series: {
    0: { targetAxisIndex: 0, type: 'bars' },
  },
  vAxes: {
    0: {
      title: 'ワクチン接種数累計',
      minValue: 0,
      titleTextStyle: {
        color: textColor,
      },
      textColor: textColor,
    },
  },
  hAxis: {
    textColor: textColor,
  },
}

export const caseChartOptions = {
  title: '入院治療を要する者',
  titleTextStyle: {
    color: textColor,
  },
  explorer: {
    axis: 'horizontal',
    keepInBounds: true,
    actions: ['dragToPan'],
  },
  colors: chartColors,
  backgroundColor: backgroundColor,
  legend: {
    textStyle: {
      color: textColor,
    },
  },
  series: {
    0: { targetAxisIndex: 0, type: 'bars' },
  },
  vAxes: {
    0: {
      title: '入院治療を要する者',
      minValue: 0,
      titleTextStyle: {
        color: textColor,
      },
      textColor: textColor,
    },
  },
  hAxis: {
    textColor: textColor,
  },
}

export const recoveryChartOptions = {
  title: '退院、療養解除となった者',
  titleTextStyle: {
    color: textColor,
  },
  explorer: {
    axis: 'horizontal',
    keepInBounds: true,
    actions: ['dragToPan'],
  },
  colors: chartColors,
  backgroundColor: backgroundColor,
  legend: {
    textStyle: {
      color: textColor,
    },
  },
  series: {
    0: { targetAxisIndex: 0, type: 'bars' },
  },
  vAxes: {
    0: {
      title: '退院、療養解除となった者',
      minValue: 0,
      titleTextStyle: {
        color: textColor,
      },
      textColor: textColor,
    },
  },
  hAxis: {
    textColor: textColor,
  },
}

export const deathChartOptions = {
  title: '死亡者',
  titleTextStyle: {
    color: textColor,
  },
  explorer: {
    axis: 'horizontal',
    keepInBounds: true,
    actions: ['dragToPan'],
  },
  colors: chartColors,
  backgroundColor: backgroundColor,
  legend: {
    textStyle: {
      color: textColor,
    },
  },
  series: {
    0: { targetAxisIndex: 0, type: 'bars' },
  },
  vAxes: {
    0: {
      title: '死亡者',
      minValue: 0,
      titleTextStyle: {
        color: textColor,
      },
      textColor: textColor,
    },
  },
  hAxis: {
    textColor: textColor,
  },
}

export const severeChartOptions = {
  title: '重症者者',
  titleTextStyle: {
    color: textColor,
  },
  explorer: {
    axis: 'horizontal',
    keepInBounds: true,
    actions: ['dragToPan'],
  },
  colors: chartColors,
  backgroundColor: backgroundColor,
  legend: {
    textStyle: {
      color: textColor,
    },
  },
  series: {
    0: { targetAxisIndex: 0, type: 'bars' },
  },
  vAxes: {
    0: {
      title: '重症者',
      minValue: 0,
      titleTextStyle: {
        color: textColor,
      },
      textColor: textColor,
    },
  },
  hAxis: {
    textColor: textColor,
  },
}
