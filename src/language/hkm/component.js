export default {
  welcome: "សូមស្វាគមន៍",
  directory: {
    debug: "ការ បំបែក ឧបករណ៍",
    monitor: "ការ​ត្រួតពិនិត្យ​ពេលវេលា​ពិត",
    query: "ការសាកសួរអាជីវកម្ម",
    analysis: "ការវិភាគស្ថិតិ",
    data: "ទិន្នន័យ មូលដ្ឋាន",
    system: "ការគ្រប់គ្រងប្រព័ន្ធ",

    tips: "On/Off"
  },
  menu:{
    home: "ផ្ទះ",

    map: "ផែនទីនៃសិក្ខាសាលា",

    olog: "កំណត់ ហេតុ ប្រតិបត្តិការ",
    slog: "កំណត់ ហេតុ កាលវិភាគ",

    machine: "ការត្រួតពិនិត្យការចតម៉ាស៊ីន",
    signal: "ការ ត្រួតពិនិត្យ សញ្ញា AGV",
    mstatus: "សំណួរ ស្ថានភាព ម៉ាស៊ីន",
    astatus: "សំណួរ ស្ថានភាព AGV",
    process: "វត្តមានពេលវេលាពិត",
    qtime: "QTime សម័យពិត",
    mcache: "កន្ត្រក ម៉ាស៊ីន Cache",
    door: "ទ្វារស្វ័យប្រវត្តិ",

    thistory: "ប្រវត្តិ ផ្ទេរ",
    shistory: "ប្រវត្តិ ស្ថានភាព AGV",
    astatistics: "ស្ថិតិ ភាព មិន ប្រក្រតី របស់ AGV",
    lineFixed: "ការជួសជុលបន្ទាត់ក្នុងប្រព័ន្ធ",

    trolleyRate: "អត្រា ដោះស្រាយ Trolley",
    dailyRate: "អត្រា ដោះស្រាយ ដំណើរការ ប្រចាំ ថ្ងៃ",
    monthRate: "អត្រា ដោះស្រាយ ដំណើរការ ប្រចាំ ខែ",

    pointMap: "ផែនទី ចែក ចាយ ចំណុច",
    cacheStation: "ស្ថានីយ៍ ឃ្លាំង ត្រូវ បាន គេ បញ្ជូន ទៅ ឋានានុក្រម",
    machineGroup: "ការ ដាក់ ក្រុម បន្ទាត់ ម៉ាស៊ីន",
    diagram: "ផែនទីចែកចាយស្ថានីយ Docking",

    step: "ជំហាន",
    astep: "តំបន់ជំហាន",
    mplatform: "ម៉ាស៊ីន",
    machineCache: "ម៉ាស៊ីនឆា",
    cacheMachineLayer: "ស្រទាប់ម៉ាស៊ីន Cache",
    cacheLocation: "ទីតាំង Cache",
    distributionArea: "ផែនទី ចែក ចាយ តំបន់ គ្រប់គ្រង ចរាចរណ៍",
    point: "ចំណុច",
    decisionPoint: "ពង្រីកចំណុចសម្រេចចិត្ត",
    standbyPoint: "ពង្រីកចំណុច standby",
    route: "ផ្លូវ",
    offLine: "ផែនទី​ចែកចាយ​ចំណុច​ក្រៅ​បណ្ដាញ",
    agv: "AGV",
    tControl: "ការគ្រប់គ្រងចរាចរណ៍",
    information: "ការ កំណត់ រចនា សម្ព័ន្ធ ព័ត៌មាន ក្នុង ប្រព័ន្ធ",
    outputTarget: "គោលដៅ លទ្ធផល ដំណើរការ",
    cInformation: "ព័ត៌មានការកំណត់រចនាសម្ព័ន្ធ",
    mPermission: "ការ អនុញ្ញាត ម៉ឺនុយ",
    cPassword: "ការកែប្រែពាក្យសម្ងាត់",
    agvQtime:"AGV ក្នុង ពេល ផលិត កម្ម",
    singleStation:"សមត្ថភាពគ្រប់គ្រងម៉ាស៊ីនតែមួយ",
    nextStations:"ម៉ាស៊ីន ជម្រើស បន្ទាប់",
		AgvChange: "ស្ថិតិ ទិសដៅ កែប្រែ ដោយ ដៃ"
  },
  components: {
    /**stationCard.vue start */
    stationCard_C01:"មតិ ម៉ាស៊ីន",
    stationCard_C02:"មតិ AGV",
    stationCard_C03:"បញ្ញើម៉ាស៊ីន",
    stationCard_C04:"ការណែនាំ AGV",
    stationCard_C05:"AGVs នៅ កន្លែង",
    stationCard_C06:"ស្នើសុំផ្ទេរ",
    stationCard_C07:"អនុវត្តការចាកចេញ",
    stationCard_C08:"ចប់ ការ ផ្ទេរ",
    stationCard_C09:"កំណត់ ហេតុ អន្តរកម្ម សញ្ញា",
    /**stationCard.vue end */

    /**agvInfoDetail.vue start */
    agvInfoDetail_C01: "អគ្គិសនី",
    agvInfoDetail_C02: "ការ ប្រហារ ជីវិត តាម បញ្ជា",
    agvInfoDetail_C03: "ការ ប្រហារ ជីវិត កំហុស",
    agvInfoDetail_C04: "ការ ប្រហារ ជីវិត ធម្មតា",
    agvInfoDetail_C05: "បាន​ថែទាំ​",
    agvInfoDetail_C06: "ស្ថានភាពរថយន្ត",
    agvInfoDetail_C07: "ពេលវេលា",
    agvInfoDetail_C08: "ស្ថានភាព ធាតុ",
    agvInfoDetail_C09: "ការ ចិញ្ចឹម",
    agvInfoDetail_C10: "ការ ផ្លំ",
    agvInfoDetail_C11: "ទទេ",
    agvInfoDetail_C12: "មេឃ ពេញ",
    agvInfoDetail_C13: "ទទេ ឡើង ចុះ ក្រោម",
    agvInfoDetail_C14: "ឡើង ពេញ ហើយ ពេញ",
    agvInfoDetail_C15: "Trolley (AGV-{id}) ព័ត៌មាន",
    agvInfoDetail_C16: "ស្ថានភាព ថ្ម",
    agvInfoDetail_C17: "លេខ ផ្លូវ",
    /**agvInfoDetail.vue end */
    changeLanguageFail: "ការ ប្ដូរ ភាសា ផ្ទៃ ខាង ក្រោយ បាន បរាជ័យ សូម សាកល្បង ម្ដង ទៀត នៅ ពេល ក្រោយ",
  }
 
}